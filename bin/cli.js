#!/usr/bin/env node

import { intro, outro, select, confirm, spinner, isCancel, cancel } from '@clack/prompts';
import pc from 'picocolors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.join(__dirname, '..');

// ASCII Art Logo
const ASCII_ART = `
    _       ____  _____  _   _  _____ __        __    _    __  __ 
   / \\     / ___|| ____|| \\ | ||_   _|\\ \\      / /   / \\   \\ \\/ / 
  / _ \\   | |  _ |  _|  |  \\| |  | |   \\ \\ /\\ / /   / _ \\   \\  /  
 / ___ \\  | |_| || |___ | |\\  |  | |    \\ V  V /   / ___ \\  | |   
/_/   \\_\\  \\____||_____||_| \\_|  |_|     \\_/\\_/   /_/   \\_\\ |_|   
                                                        by @uwayxt
`;

// Helper: Check for Updates via NPM Registry
async function checkForUpdate() {
  try {
    const pkgData = await fs.readFile(path.join(PKG_ROOT, 'package.json'), 'utf8');
    const pkg = JSON.parse(pkgData);
    const currentVersion = pkg.version;
    
    // Gunakan native fetch Node.js
    const res = await fetch(`https://registry.npmjs.org/${pkg.name}/latest`);
    if (res.ok) {
      const data = await res.json();
      const latestVersion = data.version;
      
      if (currentVersion !== latestVersion) {
        console.log(pc.yellow(`\n📦 UPDATE AVAILABLE! v${currentVersion} → v${latestVersion}`));
        console.log(pc.cyan(`Please run: `) + pc.bold(pc.white(`npm install -g ${pkg.name}@latest`)));
        console.log(pc.cyan(`Then run:   `) + pc.bold(pc.white(`agentway init`)) + pc.cyan(` to apply the latest skills.\n`));
      }
    }
  } catch (e) {
    // Abaikan jika tidak ada koneksi internet
  }
}

// Helper: Copy Directory
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      continue;
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Helper: Create Symlinks for IDEs
async function createClaudeSymlinks(agentsPath, claudePath) {
  await fs.mkdir(claudePath, { recursive: true });
  const skillFolders = await fs.readdir(path.join(agentsPath, 'skills'), { withFileTypes: true });
  for (const folder of skillFolders) {
    if (folder.isDirectory()) {
      const symlinkName = folder.name;
      const targetPath = path.join('../../.agents/skills', symlinkName);
      const linkPath = path.join(claudePath, symlinkName);
      try {
        await fs.unlink(linkPath).catch(() => {});
        await fs.symlink(targetPath, linkPath);
      } catch (e) {}
    }
  }
}

// --- COMMAND: INIT ---
async function runInit() {
  console.clear();
  console.log(pc.cyan(ASCII_ART));
  intro(pc.bgCyan(pc.black(' AGENTWAY : INITIALIZATION SETUP ')));

  const installType = await select({
    message: 'Where do you want to provision the Agent Skills?',
    options: [
      { value: 'local', label: 'Local Project', hint: 'Installs in current directory. Best for project-specific isolation.' },
      { value: 'global', label: 'Global Setup', hint: 'Installs in home directory. Available across all workspaces.' }
    ]
  });

  if (isCancel(installType)) {
    cancel('Initialization aborted.');
    process.exit(0);
  }

  const execSpinner = spinner();
  execSpinner.start('Provisioning agent skills...');

  try {
    if (installType === 'local') {
      const targetDir = process.cwd();
      const agentsTarget = path.join(targetDir, '.agents');
      const claudeTarget = path.join(targetDir, '.claude', 'skills');
      
      await copyDir(path.join(PKG_ROOT, '.agents'), agentsTarget);
      await createClaudeSymlinks(agentsTarget, claudeTarget);
      await fs.copyFile(path.join(PKG_ROOT, 'skills-lock.json'), path.join(targetDir, 'skills-lock.json'));
      
      execSpinner.stop(pc.green('Skills successfully provisioned locally (.agents/ & .claude/).'));

      const updateGitignore = await confirm({
        message: 'Append agent configurations to your .gitignore?',
        initialValue: true
      });

      if (!isCancel(updateGitignore) && updateGitignore) {
        const gitignorePath = path.join(targetDir, '.gitignore');
        const ignoreContent = '\n# Agentway Configuration\n.agents/\n.claude/\nskills-lock.json\n';
        try {
          await fs.appendFile(gitignorePath, ignoreContent);
          console.log(pc.gray('✔ .gitignore updated automatically.'));
        } catch (e) {
          console.log(pc.yellow('⚠ No .gitignore found. Proceeding without modifications.'));
        }
      }
    } else {
      const homeDir = os.homedir();
      const globalTarget = path.join(homeDir, '.uwayxt-agents');
      
      await fs.mkdir(globalTarget, { recursive: true });
      await copyDir(path.join(PKG_ROOT, '.agents'), path.join(globalTarget, '.agents'));
      await fs.copyFile(path.join(PKG_ROOT, 'skills-lock.json'), path.join(globalTarget, 'skills-lock.json'));
      
      const globalClaudeTarget = path.join(homeDir, '.claude', 'skills');
      await createClaudeSymlinks(path.join(globalTarget, '.agents'), globalClaudeTarget);
      
      execSpinner.stop(pc.green(`Skills successfully provisioned globally at ${globalTarget}.`));
      console.log(pc.cyan('Your IDEs (Claude Code, Antigravity) will automatically detect these skills.'));
    }

    outro(pc.green('✔ Initialization complete! Try running: `agentway list`'));
  } catch (error) {
    execSpinner.stop(pc.red('Critical error during provisioning.'));
    console.error(error);
  }
}

// --- COMMAND: LIST ---
async function runList() {
  console.log(pc.cyan(`\n📋 AGENTWAY SKILL REGISTRY\n`));
  try {
    const lockData = await fs.readFile(path.join(PKG_ROOT, 'skills-lock.json'), 'utf8');
    const data = JSON.parse(lockData);
    const skills = Object.keys(data.skills);
    
    console.log(pc.white(`Found ${pc.bold(pc.green(skills.length))} active skills across 5 categories:\n`));
    
    // Grouping by reading path
    const categories = {
      'Product Thinking': [],
      'UX (User Experience)': [],
      'UI & Design System': [],
      'Delivery': [],
      'Growth-Aware': []
    };
    
    skills.forEach(s => {
      const pathStr = data.skills[s].skillPath;
      if (pathStr.includes('product-thinking')) categories['Product Thinking'].push(s);
      else if (pathStr.includes('/ux/')) categories['UX (User Experience)'].push(s);
      else if (pathStr.includes('/ui/')) categories['UI & Design System'].push(s);
      else if (pathStr.includes('delivery')) categories['Delivery'].push(s);
      else if (pathStr.includes('growth-aware')) categories['Growth-Aware'].push(s);
    });

    for (const [cat, items] of Object.entries(categories)) {
      if (items.length > 0) {
        console.log(pc.bold(pc.cyan(`● ${cat}`)));
        items.forEach(item => console.log(pc.gray(`  ├─ `) + pc.white(item)));
        console.log('');
      }
    }
  } catch (e) {
    console.log(pc.red('Error reading skills registry. Run `agentway init` first.'));
  }
}

// --- COMMAND: UPDATE ---
async function runUpdate() {
  console.log(pc.cyan('\n🔄 AGENTWAY UPDATE UTILITY\n'));
  console.log(pc.white('To update Agentway to the latest version, run the following command:\n'));
  console.log(pc.bold(pc.green('  npm install -g @uwayxt/agent-skills@latest\n')));
  console.log(pc.white('After updating, apply the new skills to your environment by running:\n'));
  console.log(pc.bold(pc.green('  agentway init\n')));
  await checkForUpdate();
}

// --- COMMAND: HELP ---
function showHelp() {
  console.log(pc.cyan(ASCII_ART));
  console.log(pc.bold(pc.white('Usage: agentway <command>\n')));
  console.log(pc.white('Commands:'));
  console.log(`  ${pc.green('init')}    Provision the skills to your local project or globally.`);
  console.log(`  ${pc.green('list')}    View all available Agent Skills in the registry.`);
  console.log(`  ${pc.green('update')}  Check for updates and view update instructions.`);
  console.log(`  ${pc.green('help')}    Show this help menu.\n`);
  console.log(pc.gray('Example: npx @uwayxt/agent-skills init'));
}

// --- ROUTER ---
async function main() {
  await checkForUpdate(); // Always check for update first silently

  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'init':
      await runInit();
      break;
    case 'list':
      await runList();
      break;
    case 'update':
      await runUpdate();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

main();
