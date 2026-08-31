/**
 * Agentway CLI Generator #8: drift-auditor
 * Command: agentway audit:drift [dir]
 *
 * Generates:
 *   - drift-report.md   (severity-sorted violation list with line references)
 *   - drift-report.json (machine-readable, CI-ready)
 *   - drift-fixes.md    (find & replace auto-fix recipes)
 */

import fs from 'fs/promises';
import { existsSync, readdirSync, statSync } from 'fs';
import path from 'path';
import pc from 'picocolors';

// ─── Drift Pattern Signatures ─────────────────────────────────────────────

const DRIFT_PATTERNS = [
  // C1 — Hardcoded Colors (Critical)
  { id: 'C1.01', category: 'Hardcoded Colors', severity: 'critical', penalty: 20,
    regex: /#[0-9a-fA-F]{6}(?![0-9a-fA-F])/g,
    label: 'Hardcoded hex color (6-digit)',
    fix: 'Replace with semantic color token: var(--color-*)' },
  { id: 'C1.02', category: 'Hardcoded Colors', severity: 'critical', penalty: 20,
    regex: /#[0-9a-fA-F]{3}(?![0-9a-fA-F])/g,
    label: 'Hardcoded hex color (3-digit)',
    fix: 'Replace with semantic color token: var(--color-*)' },
  { id: 'C1.03', category: 'Hardcoded Colors', severity: 'critical', penalty: 20,
    regex: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,
    label: 'Hardcoded rgb/rgba color',
    fix: 'Use var(--color-overlay) or color-mix() with token' },
  { id: 'C1.04', category: 'Hardcoded Colors', severity: 'critical', penalty: 20,
    regex: /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)/g,
    label: 'Hardcoded hsl/hsla color',
    fix: 'Replace with HSL-based CSS token: var(--color-*)' },
  { id: 'C1.05', category: 'Hardcoded Colors', severity: 'critical', penalty: 20,
    regex: /(?:color|background(?:-color)?|border-color|fill|stroke|outline-color)\s*:\s*(red|blue|green|black|white|gray|grey|orange|purple|pink|yellow|cyan|navy|teal|lime|silver|maroon|olive)/g,
    label: 'CSS named color',
    fix: 'Use semantic token: var(--color-text), var(--color-surface), etc.' },

  // C2 — Hardcoded Spacing (High)
  { id: 'C2.01', category: 'Hardcoded Spacing', severity: 'high', penalty: 10,
    regex: /(?:^|\s)(?:margin|padding)\s*:\s*[\d\s]+(px|rem)(?!\s*var)/gm,
    label: 'Hardcoded margin/padding',
    fix: 'Use spacing token: var(--space-*)' },
  { id: 'C2.02', category: 'Hardcoded Spacing', severity: 'high', penalty: 10,
    regex: /(?:margin|padding)-(top|right|bottom|left)\s*:\s*\d+(\.\d+)?(px|rem)/g,
    label: 'Hardcoded directional margin/padding',
    fix: 'Use spacing token: var(--space-*)' },
  { id: 'C2.03', category: 'Hardcoded Spacing', severity: 'high', penalty: 10,
    regex: /\bgap\s*:\s*\d+(\.\d+)?(px|rem)/g,
    label: 'Hardcoded gap',
    fix: 'Use spacing token: var(--space-*)' },

  // C3 — Hardcoded Typography (High)
  { id: 'C3.01', category: 'Hardcoded Typography', severity: 'high', penalty: 10,
    regex: /font-size\s*:\s*\d+(\.\d+)?(px|rem|em)/g,
    label: 'Hardcoded font-size',
    fix: 'Use type token: var(--text-sm), var(--text-base), etc.' },
  { id: 'C3.02', category: 'Hardcoded Typography', severity: 'high', penalty: 10,
    regex: /font-weight\s*:\s*(100|200|300|400|500|600|700|800|900)/g,
    label: 'Hardcoded font-weight',
    fix: 'Use weight token: var(--font-normal), var(--font-semibold), etc.' },
  { id: 'C3.03', category: 'Hardcoded Typography', severity: 'high', penalty: 10,
    regex: /line-height\s*:\s*\d+(\.\d+)?(px|em)/g,
    label: 'Hardcoded line-height (with unit)',
    fix: 'Use leading token: var(--leading-normal) or unitless 1.5' },

  // C4 — Hardcoded Radius (Medium)
  { id: 'C4.01', category: 'Hardcoded Radius', severity: 'medium', penalty: 5,
    regex: /border-radius\s*:\s*\d+(\.\d+)?(px|rem|%)/g,
    label: 'Hardcoded border-radius',
    fix: 'Use radius token: var(--radius-sm), var(--radius-md), etc.' },

  // C5 — Hardcoded Shadows (Medium)
  { id: 'C5.01', category: 'Hardcoded Shadows', severity: 'medium', penalty: 5,
    regex: /box-shadow\s*:\s*(?!var)[\d\s-]+(px)/g,
    label: 'Hardcoded box-shadow',
    fix: 'Use shadow token: var(--shadow-sm), var(--shadow-md), etc.' },

  // C6 — Hardcoded Z-Index (Medium, Critical for 9999)
  { id: 'C6.01', category: 'Hardcoded Z-Index', severity: 'medium', penalty: 5,
    regex: /z-index\s*:\s*\d+/g,
    label: 'Hardcoded z-index',
    fix: 'Use z-index token: var(--z-dropdown), var(--z-modal), etc.' },
  { id: 'C6.02', category: 'Hardcoded Z-Index', severity: 'critical', penalty: 20,
    regex: /z-index\s*:\s*(9999|99999|999999)/g,
    label: 'Z-index arms race pattern (9999+)',
    fix: 'URGENT: Create z-index token scale and assign var(--z-modal) = 400' },

  // C7 — Hardcoded Duration (Low)
  { id: 'C7.01', category: 'Hardcoded Duration', severity: 'low', penalty: 2,
    regex: /transition(?:-duration)?\s*:\s*[^;]*\d+(\.\d+)?(ms|s)/g,
    label: 'Hardcoded transition duration',
    fix: 'Use duration token: var(--duration-fast), var(--duration-normal), etc.' },
  { id: 'C7.02', category: 'Hardcoded Duration', severity: 'low', penalty: 2,
    regex: /animation(?:-duration)?\s*:\s*[^;]*\d+(\.\d+)?(ms|s)/g,
    label: 'Hardcoded animation duration',
    fix: 'Use duration token: var(--duration-slow), var(--ease-spring), etc.' },

  // Anti-Patterns
  { id: 'AP.01', category: 'Anti-Patterns', severity: 'medium', penalty: 5,
    regex: /!important/g,
    label: '!important flag (blocks token cascade)',
    fix: 'Remove !important — use CSS specificity or token-based override' },
  { id: 'AP.02', category: 'Anti-Patterns', severity: 'high', penalty: 10,
    regex: /style\s*=\s*["'][^"']+["']/g,
    label: 'Inline style attribute',
    fix: 'Move to CSS module with token-referenced classes' },
];

const CSS_EXTENSIONS = ['.css', '.scss', '.sass', '.less', '.module.css',
  '.module.scss', '.styled.ts', '.styled.tsx', '.styled.js'];

// ─── File Scanner ─────────────────────────────────────────────────────────

function getAllFiles(dir, extensions, ignore = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage']) {
  const files = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (ignore.includes(entry)) continue;
      const fullPath = path.join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, extensions, ignore));
      } else if (extensions.some(ext => entry.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch {}
  return files;
}

function scanFile(filePath, patterns) {
  let content;
  try {
    content = require('fs').readFileSync(filePath, 'utf8');
  } catch {
    return [];
  }

  const violations = [];
  const lines = content.split('\n');

  for (const pattern of patterns) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags.includes('g') ? 'gm' : 'm');
    let match;
    while ((match = regex.exec(content)) !== null) {
      // Find line number
      const before = content.substring(0, match.index);
      const lineNum = before.split('\n').length;
      const lineContent = lines[lineNum - 1]?.trim() || '';

      violations.push({
        patternId: pattern.id,
        category: pattern.category,
        severity: pattern.severity,
        penalty: pattern.penalty,
        label: pattern.label,
        file: filePath,
        line: lineNum,
        found: match[0],
        lineContent: lineContent.substring(0, 80),
        fix: pattern.fix,
      });
    }
  }

  return violations;
}

// ─── Report Generators ────────────────────────────────────────────────────

function generateDriftReportMd(projectName, violations, summary, timestamp) {
  const bySeverity = {
    critical: violations.filter(v => v.severity === 'critical'),
    high: violations.filter(v => v.severity === 'high'),
    medium: violations.filter(v => v.severity === 'medium'),
    low: violations.filter(v => v.severity === 'low'),
  };

  const severityIcon = { critical: '🔴', high: '🟠', medium: '🟡', low: '🟢' };

  function violationTable(vios, limit = 10) {
    if (vios.length === 0) return '*No violations in this category.*\n';
    const shown = vios.slice(0, limit);
    const rows = shown.map(v =>
      `| \`${path.basename(v.file)}:${v.line}\` | \`${v.found.substring(0, 30)}\` | ${v.fix.substring(0, 45)}... |`
    ).join('\n');
    const header = '| File:Line | Found | Fix |\n| :--- | :--- | :--- |';
    const more = vios.length > limit ? `\n*... and ${vios.length - limit} more. See \`drift-report.json\` for full list.*` : '';
    return `${header}\n${rows}${more}\n`;
  }

  return `# 🔍 Design Drift Report — \`${projectName}\`

> **Scanned:** ${timestamp}
> **Agentway:** v1.6.0 · \`design-drift-detector\` skill
> **Files Scanned:** ${summary.totalFiles} · **Total Violations:** ${summary.totalViolations}

---

## 📊 Executive Summary

| Severity | Count | % of Total |
| :--- | :---: | :---: |
| 🔴 Critical | ${summary.bySeverity.critical} | ${((summary.bySeverity.critical / Math.max(summary.totalViolations, 1)) * 100).toFixed(1)}% |
| 🟠 High | ${summary.bySeverity.high} | ${((summary.bySeverity.high / Math.max(summary.totalViolations, 1)) * 100).toFixed(1)}% |
| 🟡 Medium | ${summary.bySeverity.medium} | ${((summary.bySeverity.medium / Math.max(summary.totalViolations, 1)) * 100).toFixed(1)}% |
| 🟢 Low | ${summary.bySeverity.low} | ${((summary.bySeverity.low / Math.max(summary.totalViolations, 1)) * 100).toFixed(1)}% |
| **Total** | **${summary.totalViolations}** | **100%** |

**Estimated Drift Rate:** ~${summary.driftRate}%

${summary.driftRate < 5 ? '✅ **Status: Token-Compliant** — Excellent design system adherence.' :
  summary.driftRate < 15 ? '⚠️ **Status: Minor Drift** — Advisory remediation recommended this sprint.' :
  summary.driftRate < 30 ? '🟠 **Status: Significant Drift** — P1 remediation, sprint-blocking.' :
  '🔴 **Status: Design Breakdown** — P0 CRITICAL: Stop AI generation until resolved.'}

---

## 🔴 Critical Violations (${bySeverity.critical.length})

${violationTable(bySeverity.critical)}

## 🟠 High Violations (${bySeverity.high.length})

${violationTable(bySeverity.high)}

## 🟡 Medium Violations (${bySeverity.medium.length})

${violationTable(bySeverity.medium)}

## 🟢 Low Violations (${bySeverity.low.length})

${violationTable(bySeverity.low, 5)}

---

## 🔧 Next Steps

1. **Run \`agentway doctor ./\`** — Get full TAI score with prescription queue
2. **See \`drift-fixes.md\`** — Auto-fix recipes for common patterns
3. **See \`drift-report.json\`** — Full machine-readable violation data for CI integration

---

*Generated by [Agentway v1.6.0](https://github.com/Uwayxt/agent-skills) · \`design-drift-detector\` skill*
`;
}

function generateDriftReportJson(projectName, violations, summary, timestamp) {
  return JSON.stringify({
    version: '1.6.0',
    skill: 'design-drift-detector',
    scannedAt: timestamp,
    project: projectName,
    summary: {
      totalFiles: summary.totalFiles,
      totalViolations: summary.totalViolations,
      driftRate: summary.driftRate,
      bySeverity: summary.bySeverity,
      byCategory: summary.byCategory,
    },
    violations: violations.slice(0, 200).map(v => ({
      id: v.patternId,
      category: v.category,
      severity: v.severity,
      file: v.file,
      line: v.line,
      found: v.found,
      lineContent: v.lineContent,
      fix: v.fix,
    })),
    ciThresholds: {
      clean: { driftRate: '< 5%', action: 'PASS' },
      warning: { driftRate: '5–15%', action: 'WARN' },
      high: { driftRate: '15–30%', action: 'REVIEW' },
      critical: { driftRate: '> 30%', action: 'BLOCK' },
    },
  }, null, 2);
}

function generateDriftFixesMd(projectName, violations) {
  const byCategory = {};
  for (const v of violations) {
    if (!byCategory[v.category]) byCategory[v.category] = [];
    if (byCategory[v.category].length < 5) {
      byCategory[v.category].push(v);
    }
  }

  let md = `# 🔧 Drift Auto-Fix Recipes — \`${projectName}\`

> Quick find-and-replace recipes for the most common violations found in this project.
> For comprehensive token reference: \`.agents/skills/design-drift-detector/REMEDIATION-GUIDE.md\`

---

`;

  for (const [category, vios] of Object.entries(byCategory)) {
    md += `## ${category}\n\n`;
    md += '| Found | Fix | File |\n| :--- | :--- | :--- |\n';
    for (const v of vios) {
      md += `| \`${v.found.substring(0, 30)}\` | \`${v.fix.substring(0, 40)}\` | \`${path.basename(v.file)}\` |\n`;
    }
    md += '\n';
  }

  md += `---\n\n## Token Reference Quick Map\n\n`;
  md += `| Literal | Token |\n| :--- | :--- |\n`;
  md += `| \`#3B82F6\` | \`var(--color-primary)\` |\n`;
  md += `| \`rgba(0,0,0,0.5)\` | \`var(--color-overlay)\` |\n`;
  md += `| \`16px\` (spacing) | \`var(--space-4)\` |\n`;
  md += `| \`24px\` (spacing) | \`var(--space-6)\` |\n`;
  md += `| \`14px\` (font) | \`var(--text-sm)\` |\n`;
  md += `| \`8px\` (radius) | \`var(--radius-md)\` |\n`;
  md += `| \`9999\` (z-index) | \`var(--z-modal)\` |\n`;
  md += `| \`0.3s\` (duration) | \`var(--duration-normal)\` |\n\n`;
  md += `*Full migration guide: \`.agents/skills/design-drift-detector/REMEDIATION-GUIDE.md\`*\n`;

  return md;
}

// ─── Main Generator ─────────────────────────────────────────────────────

export async function runDriftAuditor(targetDir = process.cwd()) {
  const resolvedDir = path.resolve(targetDir);
  const projectName = path.basename(resolvedDir);
  const timestamp = new Date().toISOString();

  console.log(pc.cyan(`\n🔍 Agentway Design Drift Auditor\n`));
  console.log(pc.dim(`   Scanning: ${resolvedDir}\n`));

  // Find CSS files
  process.stdout.write('   Discovering CSS files...');
  const cssFiles = getAllFiles(resolvedDir, CSS_EXTENSIONS);
  console.log(pc.green(` ${cssFiles.length} files found`));

  if (cssFiles.length === 0) {
    console.log(pc.yellow('\n   ⚠️  No CSS/SCSS files found in this directory.'));
    console.log(pc.dim('   Tip: Run from your project root (where src/ or styles/ exists)\n'));
  }

  // Scan each file
  process.stdout.write('   Scanning for drift patterns...');
  const allViolations = [];
  for (const file of cssFiles) {
    const violations = scanFile(file, DRIFT_PATTERNS);
    allViolations.push(...violations);
  }
  console.log(pc.green(` ${allViolations.length} violations detected`));

  // Build summary
  const byCategory = {};
  for (const v of allViolations) {
    byCategory[v.category] = (byCategory[v.category] || 0) + 1;
  }

  const summary = {
    totalFiles: cssFiles.length,
    totalViolations: allViolations.length,
    driftRate: cssFiles.length > 0
      ? Math.min(((allViolations.length / Math.max(cssFiles.length * 15, 1)) * 100), 100).toFixed(1)
      : '0.0',
    bySeverity: {
      critical: allViolations.filter(v => v.severity === 'critical').length,
      high: allViolations.filter(v => v.severity === 'high').length,
      medium: allViolations.filter(v => v.severity === 'medium').length,
      low: allViolations.filter(v => v.severity === 'low').length,
    },
    byCategory,
  };

  // Display summary
  const driftRate = parseFloat(summary.driftRate);
  const statusIcon = driftRate < 5 ? '✅' : driftRate < 15 ? '⚠️' : driftRate < 30 ? '🟠' : '🔴';
  console.log(`\n   ${statusIcon} Drift Rate: ${pc.bold(summary.driftRate + '%')}`);
  console.log(`   🔴 Critical: ${summary.bySeverity.critical}  🟠 High: ${summary.bySeverity.high}  🟡 Medium: ${summary.bySeverity.medium}  🟢 Low: ${summary.bySeverity.low}`);

  // Generate reports
  process.stdout.write('\n   Generating drift-report.md...');
  const mdContent = generateDriftReportMd(projectName, allViolations, summary, timestamp);
  await fs.writeFile(path.join(resolvedDir, 'drift-report.md'), mdContent);
  console.log(pc.green(' ✅'));

  process.stdout.write('   Generating drift-report.json...');
  const jsonContent = generateDriftReportJson(projectName, allViolations, summary, timestamp);
  await fs.writeFile(path.join(resolvedDir, 'drift-report.json'), jsonContent);
  console.log(pc.green(' ✅'));

  process.stdout.write('   Generating drift-fixes.md...');
  const fixContent = generateDriftFixesMd(projectName, allViolations);
  await fs.writeFile(path.join(resolvedDir, 'drift-fixes.md'), fixContent);
  console.log(pc.green(' ✅'));

  console.log(pc.dim(`\n   Files written to: ${resolvedDir}/`));
  console.log(`     📄 drift-report.md`);
  console.log(`     📊 drift-report.json`);
  console.log(`     🔧 drift-fixes.md\n`);

  console.log(pc.dim('   Next: run agentway doctor ./ for full TAI score and prescription'));
  console.log();
}
