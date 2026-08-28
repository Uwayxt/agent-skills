#!/usr/bin/env node
/**
 * cognitive-evaluator.js
 * Agentway Expert Tool: `agentway audit:cognitive [dir]`
 *
 * Statically scans HTML/JSX/TSX/Vue/Svelte files for cognitive overload signals:
 *  1. Decision Density — counts interactive actions per view
 *  2. Competing Primary CTAs — detects multiple dominant-style buttons
 *  3. Form Wall Violations — forms with > 6 consecutive fields
 *  4. Dead Zone Anchors — detects empty href="#" used as primary action
 *  5. Missing aria-label on icon-only buttons
 *
 * Outputs a terminal summary with a Cognitive Friction Index (CFI) estimate.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';

// ─── Hick's Law: Reaction Time from choice count ──────────────────────────
function hicksRT(n) {
  const b = 0.155;
  return (b * Math.log2(n + 1)).toFixed(3);
}

// ─── CFI Penalty Calculation ───────────────────────────────────────────────
function calcCFI({ rt, id = 1.5, swr = 3.0, penalties = 0 }) {
  const rtNorm = Math.min(parseFloat(rt) / 0.70, 1) * 30;
  const idNorm = Math.min(id / 3.5, 1) * 30;
  const swrPenalty = Math.max(0, 2.5 - swr) / 2.5 * 25;
  const cfi = Math.round(rtNorm + idNorm + swrPenalty + Math.min(penalties, 15));
  return cfi;
}

function cfiGrade(score) {
  if (score <= 25) return '✅ A — Optimal';
  if (score <= 40) return '✅ B — Good';
  if (score <= 55) return '⚠️  C — Monitor';
  if (score <= 70) return '❌ D — High Friction';
  return '🚨 F — Redesign Required';
}

// ─── File scanner ─────────────────────────────────────────────────────────
const SUPPORTED_EXTS = ['.html', '.jsx', '.tsx', '.vue', '.svelte'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage'];

function collectFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (IGNORE_DIRS.includes(entry)) continue;
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        files.push(...collectFiles(full));
      } else if (SUPPORTED_EXTS.includes(extname(entry))) {
        files.push(full);
      }
    }
  } catch { /* skip unreadable dirs */ }
  return files;
}

// ─── Pattern detectors ────────────────────────────────────────────────────

// Count interactive action elements in a file
const ACTION_PATTERNS = [
  /<button/gi,
  /<a\s/gi,
  /onClick=/gi,
  /@click=/gi,
  /v-on:click=/gi,
  /<input[^>]*type=["']submit/gi,
  /<input[^>]*type=["']button/gi,
];

function countActions(content) {
  return ACTION_PATTERNS.reduce((sum, re) => {
    const matches = content.match(re);
    return sum + (matches ? matches.length : 0);
  }, 0);
}

// Detect competing primary CTAs (multiple filled/primary buttons)
function detectCompetingCTAs(content) {
  const primaryIndicators = [
    /class=["'][^"']*btn-primary[^"']*["']/gi,
    /class=["'][^"']*button-primary[^"']*["']/gi,
    /variant=["']primary["']/gi,
    /class=["'][^"']*bg-primary[^"']*["']/gi,
    /class=["'][^"']*contained[^"']*["']/gi,
  ];
  const counts = primaryIndicators.reduce((sum, re) => {
    const m = content.match(re);
    return sum + (m ? m.length : 0);
  }, 0);
  return counts;
}

// Count consecutive form fields (inputs, textareas, selects)
function detectFormWalls(content) {
  const fieldPattern = /(<input(?![^>]*type=["']hidden)[\s\S]*?>|<textarea[\s\S]*?>|<select[\s\S]*?>)/gi;
  const allFields = content.match(fieldPattern) || [];
  return allFields.length;
}

// Detect dead links (href="#" used as button replacement)
function detectDeadZoneAnchors(content) {
  const deadLinks = content.match(/href=["']#["']/gi) || [];
  return deadLinks.length;
}

// Detect icon buttons missing aria-label
function detectMissingAriaOnIconButtons(content) {
  const svgButtons = content.match(/<button[^>]*>[\s\S]*?<svg[\s\S]*?<\/button>/gi) || [];
  const missingAria = svgButtons.filter(btn => !/aria-label=/i.test(btn));
  return missingAria.length;
}

// ─── Report builder ───────────────────────────────────────────────────────
function auditFile(filePath, baseDir) {
  const content = readFileSync(filePath, 'utf-8');
  const relPath = relative(baseDir, filePath);

  const actionCount = countActions(content);
  const primaryCTAs = detectCompetingCTAs(content);
  const formFields = detectFormWalls(content);
  const deadAnchors = detectDeadZoneAnchors(content);
  const missingAria = detectMissingAriaOnIconButtons(content);

  // Heuristic scoring
  const rt = parseFloat(hicksRT(actionCount));
  const swr = primaryCTAs >= 2 ? 1.0 : 3.0; // competing primaries tank SWR
  let penalties = 0;
  if (deadAnchors > 0) penalties += 5;
  if (formFields > 6) penalties += 5;
  if (primaryCTAs >= 2) penalties += 5;

  const cfi = calcCFI({ rt, id: 1.5, swr, penalties });
  const grade = cfiGrade(cfi);

  const issues = [];
  if (actionCount > 5)  issues.push(`⚠️  Decision Density: ${actionCount} actions (Hick's RT: ${rt}s — exceeds 5-choice threshold)`);
  if (primaryCTAs >= 2) issues.push(`❌ Competing Primary CTAs: ${primaryCTAs} detected (kills SWR — users will hesitate)`);
  if (formFields > 6)   issues.push(`❌ Form Wall: ${formFields} fields (max 6 per chunk — add visual separators)`);
  if (deadAnchors > 0)  issues.push(`⚠️  Dead Zone Anchors: ${deadAnchors}× href="#" found (replace with real handlers)`);
  if (missingAria > 0)  issues.push(`❌ Icon Buttons Missing aria-label: ${missingAria} found`);

  return { relPath, cfi, grade, issues };
}

// ─── CLI Entry Point ──────────────────────────────────────────────────────
export function run(scanDir = '.') {
  const files = collectFiles(scanDir);

  if (files.length === 0) {
    console.log(`\n  ℹ️  No UI files found in "${scanDir}". Supported: .html .jsx .tsx .vue .svelte\n`);
    return;
  }

  console.log(`\n  🧠 Agentway Cognitive Load Auditor`);
  console.log(`  ─────────────────────────────────────────────────────────`);
  console.log(`  Scanning ${files.length} files in: ${scanDir}\n`);

  const results = files.map(f => auditFile(f, scanDir));
  const critical = results.filter(r => r.cfi > 55);
  const passing  = results.filter(r => r.cfi <= 40);

  results.forEach(({ relPath, cfi, grade, issues }) => {
    if (issues.length === 0) {
      console.log(`  ✅ ${relPath.padEnd(55)} CFI: ${String(cfi).padStart(3)}/100  ${grade}`);
    } else {
      console.log(`\n  📄 ${relPath}`);
      console.log(`     CFI: ${cfi}/100  ${grade}`);
      issues.forEach(i => console.log(`       ${i}`));
    }
  });

  console.log(`\n  ─────────────────────────────────────────────────────────`);
  console.log(`  Summary: ${files.length} files scanned  |  ${passing.length} Passing (≤40)  |  ${critical.length} Critical (>55)`);

  // Aggregate average CFI
  const avgCFI = Math.round(results.reduce((s, r) => s + r.cfi, 0) / results.length);
  console.log(`  Average CFI: ${avgCFI}/100  ${cfiGrade(avgCFI)}\n`);

  if (critical.length > 0) {
    console.log(`  🚨 ${critical.length} file(s) require immediate cognitive redesign before shipping.\n`);
  } else {
    console.log(`  ✅ All files within acceptable cognitive friction thresholds.\n`);
  }
}
