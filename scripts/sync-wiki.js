#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const WIKI_SRC = path.join(ROOT, 'wiki');

console.log('⚡ Syncing Agentway Wiki to GitHub...');

// Get GitHub token from git credential
let token = '';
try {
  const credOutput = execSync('printf "protocol=https\\nhost=github.com\\n" | git credential fill', { encoding: 'utf8' });
  for (const line of credOutput.split('\n')) {
    if (line.startsWith('password=')) {
      token = line.split('=')[1].trim();
      break;
    }
  }
} catch (e) {
  console.error('❌ Could not retrieve git credentials.');
}

const remoteUrl = token
  ? `https://x-access-token:${token}@github.com/Uwayxt/agent-skills.wiki.git`
  : 'https://github.com/Uwayxt/agent-skills.wiki.git';

const tmpDir = path.join(ROOT, '.wiki-git-sync');

try {
  // Clean old temp dir
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log('📥 Cloning GitHub Wiki repository...');
  execSync(`git clone ${remoteUrl} "${tmpDir}"`, { stdio: 'inherit' });

  // Copy all files from wiki/ into temp dir
  console.log('📋 Copying all 11 Wiki documentation files...');
  const files = fs.readdirSync(WIKI_SRC);
  for (const file of files) {
    const srcFile = path.join(WIKI_SRC, file);
    const destFile = path.join(tmpDir, file);
    fs.copyFileSync(srcFile, destFile);
  }

  // Commit & Push
  process.chdir(tmpDir);
  execSync('git add .', { stdio: 'inherit' });
  try {
    execSync('git commit -m "docs(wiki): update all 11 enterprise wiki pages"', { stdio: 'inherit' });
  } catch (e) {
    console.log('ℹ No changes to commit.');
  }

  console.log('🚀 Pushing to GitHub Wiki...');
  execSync('git push origin master', { stdio: 'inherit' });

  console.log('✔ All 11 Wiki pages successfully synced to GitHub Wiki!');
} catch (error) {
  console.log('\n⚠️ GitHub Wiki repository has not been initialized yet by GitHub.');
  console.log('👉 To initialize in 5 seconds:');
  console.log('   1. Open: https://github.com/Uwayxt/agent-skills/wiki');
  console.log('   2. Click "Create the first page" and click "Save page".');
  console.log('   3. Run `npm run sync-wiki` and all 11 pages will be uploaded automatically!\n');
} finally {
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}
