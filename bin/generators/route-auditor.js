import fs from 'fs';
import path from 'path';

/**
 * Recursively scans project files for route integrity and interactive element issues.
 */
export function auditRoutes(scanDir = '.') {
  const issues = [];
  const targetDir = path.resolve(process.cwd(), scanDir);

  const ignoredDirs = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.agents', '.claude', 'wiki', 'bin']);
  const validExtensions = new Set(['.html', '.jsx', '.tsx', '.vue', '.svelte']);


  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (ignoredDirs.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (validExtensions.has(path.extname(entry.name))) {
        inspectFile(fullPath);
      }
    }
  }

  function inspectFile(filePath) {
    const relPath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;

      // 1. Check for href="#" or href=""
      if (/href\s*=\s*["'](#|"")["']/i.test(line)) {
        issues.push({
          file: relPath,
          line: lineNum,
          type: 'DEAD_LINK',
          severity: 'HIGH',
          message: `Dead anchor link found (href="#" or href=""). Replace with valid route intent or button element.`
        });
      }

      // 2. Check for button without onClick or type="submit"
      if (/<button\b(?![^>]*\b(onClick|@click|v-on:click|on:click|type\s*=\s*["']submit["']))[^>]*>/i.test(line)) {
        // Exclude disabled buttons or form submit buttons
        if (!/disabled/i.test(line) && !/type\s*=\s*["']reset["']/i.test(line)) {
          issues.push({
            file: relPath,
            line: lineNum,
            type: 'ORPHANED_BUTTON',
            severity: 'MEDIUM',
            message: `Button element has no click handler or submit type. Users cannot trigger actions.`
          });
        }
      }

      // 3. Icon button missing aria-label
      if (/<button[^>]*>\s*<svg/i.test(line) && !/aria-label/i.test(line)) {
        issues.push({
          file: relPath,
          line: lineNum,
          type: 'A11Y_MISSING_LABEL',
          severity: 'HIGH',
          message: `Icon-only button missing aria-label. Screen readers cannot announce button purpose.`
        });
      }
    });
  }

  walk(targetDir);
  return issues;
}
