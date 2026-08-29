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
      
      // Simple semver compare (only alert if remote > local)
      const parseSemver = (v) => v.split('.').map(n => parseInt(n, 10) || 0);
      const [curMaj, curMin, curPat] = parseSemver(currentVersion);
      const [latMaj, latMin, latPat] = parseSemver(latestVersion);
      
      const isRemoteNewer = 
        latMaj > curMaj || 
        (latMaj === curMaj && latMin > curMin) || 
        (latMaj === curMaj && latMin === curMin && latPat > curPat);
      
      if (isRemoteNewer) {
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
    
    console.log(pc.white(`Found ${pc.bold(pc.green(skills.length))} active skills across 9 domains:\n`));
    
    // Grouping by reading path
    const categories = {
      'Visual Intelligence': [],
      'Product Thinking & Strategy': [],
      'UX (User Experience)': [],
      'UI & Design System': [],
      'Modern Platform Patterns': [],
      'Responsive & Adaptive': [],
      'Growth-Aware Architecture': [],
      'Delivery & Security': [],
      'QA Autonomous & Traceability': []
    };
    
    skills.forEach(s => {
      const pathStr = data.skills[s].skillPath || '';
      if (pathStr.includes('visual-intelligence') || s === 'visual-style-extractor' || s === 'cognitive-load-heatmap-prediction') {
        categories['Visual Intelligence'].push(s);
      } else if (pathStr.includes('product-thinking') || s.startsWith('product-') || s.includes('business-model') || s === 'mvp-scoping' || s.includes('stakeholder')) {
        categories['Product Thinking & Strategy'].push(s);
      } else if (pathStr.includes('/ux/') || s === 'user-flow-mapping' || s === 'information-architecture' || s === 'user-research-synthesis' || s === 'accessibility-review' || s === 'usability-heuristics-check') {
        categories['UX (User Experience)'].push(s);
      } else if (pathStr.includes('/ui/') || s === 'design-tokens' || s === 'typography-system' || s === 'design-system-builder' || s === 'component-style-guide' || s === 'dashboard-layout-patterns' || s === 'visual-hierarchy-review' || s === 'micro-interaction-motion-design') {
        categories['UI & Design System'].push(s);
      } else if (s === 'dark-mode-theming-system' || s === 'error-boundary-resilience-design' || s === 'ai-feature-ux-patterns' || s === 'i18n-localization-strategy') {
        categories['Modern Platform Patterns'].push(s);
      } else if (pathStr.includes('responsive') || s.includes('touch-gesture') || s.includes('adaptive-component') || s.includes('perceived-performance') || s === 'responsive-qa-audit') {
        categories['Responsive & Adaptive'].push(s);
      } else if (pathStr.includes('growth-aware') || s.includes('module-registry') || s.includes('dashboard-scaffolding') || s.includes('route-integrity') || s.includes('growth-impact')) {
        categories['Growth-Aware Architecture'].push(s);
      } else if (pathStr.includes('delivery') || s === 'design-to-code-handoff' || s === 'cross-functional-review' || s === 'security-privacy-review') {
        categories['Delivery & Security'].push(s);
      } else if (pathStr.includes('qa-autonomous') || s.startsWith('prd-') || s.includes('interactive-element') || s.includes('flow-based') || s.includes('visual-responsive') || s.includes('accessibility-runtime') || s.includes('qa-feedback')) {
        categories['QA Autonomous & Traceability'].push(s);
      } else {
        categories['UI & Design System'].push(s);
      }
    });

    for (const [cat, items] of Object.entries(categories)) {
      if (items.length > 0) {
        console.log(pc.bold(pc.cyan(`● ${cat} (${items.length})`)));
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

// --- IMPORT GENERATORS ---
import { buildTokens } from './generators/tokens-builder.js';
import { scaffoldModule } from './generators/module-scaffolder.js';
import { auditRoutes } from './generators/route-auditor.js';
import { generateQATests } from './generators/qa-generator.js';
import { run as runCognitiveEval } from './generators/cognitive-evaluator.js';

// --- COMMAND: TOKENS:BUILD ---
async function runTokensBuild(args) {
  const inputFile = args[1] || 'design-tokens.json';
  const outputDir = args[2] || './styles';
  console.log(pc.cyan('\n⚡ AGENTWAY TOKENS BUILDER\n'));
  try {
    const res = buildTokens(inputFile, outputDir);
    if (res) {
      console.log(pc.green('✔ Design tokens compiled successfully:'));
      console.log(pc.gray(`  ├─ CSS Variables: `) + pc.white(res.css));
      console.log(pc.gray(`  ├─ Tailwind Config: `) + pc.white(res.tailwind));
      console.log(pc.gray(`  └─ TypeScript Types: `) + pc.white(res.dts) + '\n');
    }
  } catch (e) {
    console.error(pc.red('Error compiling tokens:'), e.message);
  }
}

// --- COMMAND: SCAFFOLD:MODULE ---
async function runScaffoldModule(args) {
  const moduleName = args[1];
  const baseDir = args[2] || './src/modules';
  if (!moduleName) {
    console.log(pc.red('\n❌ Error: Please specify a module name.'));
    console.log(pc.yellow('Usage: agentway scaffold:module <module-name> [baseDir]'));
    console.log(pc.gray('Example: agentway scaffold:module billing\n'));
    return;
  }

  console.log(pc.cyan(`\n⚡ AGENTWAY MODULE SCAFFOLDER: ${pc.bold(moduleName)}\n`));
  try {
    const res = scaffoldModule(moduleName, baseDir);
    console.log(pc.green(`✔ Module [${moduleName}] scaffolded with 5-state resilience:`));
    console.log(pc.gray(`  Directory: `) + pc.white(res.moduleDir));
    res.files.forEach(f => console.log(pc.gray(`  ├─ `) + pc.white(f)));
    console.log('');
  } catch (e) {
    console.error(pc.red('Error scaffolding module:'), e.message);
  }
}

// --- COMMAND: AUDIT:ROUTES ---
async function runAuditRoutes(args) {
  const scanDir = args[1] || '.';
  console.log(pc.cyan(`\n🔍 AGENTWAY ROUTE & A11Y AUDITOR\n`));
  console.log(pc.gray(`Scanning directory: ${scanDir}...`));
  try {
    const issues = auditRoutes(scanDir);
    if (issues.length === 0) {
      console.log(pc.green('\n✔ All routes and interactive elements are healthy! Zero dead links found.\n'));
    } else {
      console.log(pc.yellow(`\n⚠ Found ${issues.length} interactive / route issue(s):\n`));
      issues.forEach((iss, i) => {
        const badge = iss.severity === 'HIGH' ? pc.bgRed(pc.white(` ${iss.type} `)) : pc.bgYellow(pc.black(` ${iss.type} `));
        console.log(`${badge} ${pc.bold(iss.file)}:${pc.cyan(iss.line)}`);
        console.log(pc.gray(`  └─ ${iss.message}`));
      });
      console.log('');
    }
  } catch (e) {
    console.error(pc.red('Error auditing routes:'), e.message);
  }
}

// --- COMMAND: GEN:PLAYWRIGHT ---
async function runGenPlaywright(args) {
  const outDir = args[1] || './e2e';
  console.log(pc.cyan('\n⚡ AGENTWAY QA TEST GENERATOR\n'));
  try {
    const res = generateQATests(outDir);
    console.log(pc.green('✔ Playwright multi-viewport & WCAG 2.2 test suite generated:'));
    console.log(pc.gray(`  Directory: `) + pc.white(res.testDir));
    res.files.forEach(f => console.log(pc.gray(`  ├─ `) + pc.white(f)));
    console.log(pc.gray('\nRun tests with: ') + pc.bold(pc.white('npx playwright test\n')));
  } catch (e) {
    console.error(pc.red('Error generating test suites:'), e.message);
  }
}

// --- COMMAND: AUDIT:COGNITIVE ---
async function runAuditCognitive(args) {
  const scanDir = args[1] || '.';
  runCognitiveEval(scanDir);
}

// --- COMMAND: HELP ---
function showHelp() {
  console.log(pc.cyan(ASCII_ART));
  console.log(pc.bold(pc.white('Usage: agentway <command> [options]\n')));
  console.log(pc.white('Core Commands:'));
  console.log(`  ${pc.green('init')}                    Provision skills locally or globally.`);
  console.log(`  ${pc.green('list')}                    View all 42 skills across 9 domains.`);
  console.log(`  ${pc.green('update')}                  Check for registry updates.\n`);
  console.log(pc.white('Expert Automation Tools:'));
  console.log(`  ${pc.green('tokens:build')} [file]      Compile design tokens to CSS Vars, Tailwind & TS.`);
  console.log(`  ${pc.green('scaffold:module')} <name>   Scaffold a modular slice with 5-state resilience.`);
  console.log(`  ${pc.green('audit:routes')} [dir]       Audit codebase for dead links & orphaned buttons.`);
  console.log(`  ${pc.green('audit:cognitive')} [dir]    Audit cognitive friction: Hick's Law, Fitts's Law, CFI score.`);
  console.log(`  ${pc.green('gen:playwright')} [dir]     Generate Playwright WCAG 2.2 multi-viewport tests.\n`);
  console.log(`  ${pc.green('help')}                    Show this help menu.\n`);
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
    case 'tokens:build':
    case 'tokens':
      await runTokensBuild(args);
      break;
    case 'scaffold:module':
    case 'scaffold':
      await runScaffoldModule(args);
      break;
    case 'audit:routes':
      await runAuditRoutes(args);
      break;
    case 'audit:cognitive':
    case 'cognitive':
      await runAuditCognitive(args);
      break;
    case 'gen:playwright':
    case 'gen:qa':
      await runGenPlaywright(args);
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

main();

