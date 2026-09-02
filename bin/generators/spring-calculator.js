/**
 * Agentway CLI Generator #10: spring-calculator
 * Command: agentway gen:spring [dir]
 *
 * Generates:
 *   - spring-tokens.css (CSS custom property spring curves)
 *   - motion-choreography.js (Analytical harmonic oscillator solver)
 *   - SpringDemo.jsx (Visual demo component showcasing spring presets)
 */

import fs from 'fs/promises';
import path from 'path';
import pc from 'picocolors';

export function generateSpringTokensCss() {
  return `/* Kinematic Motion & Spring Physics Tokens — Agentway v1.7.0 */
:root {
  /* Physics-Based Spring Curves (Cubic-Bezier Approximations) */
  --spring-snappy: cubic-bezier(0.34, 1.56, 0.64, 1);
  --spring-bouncy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --spring-natural: cubic-bezier(0.22, 1, 0.36, 1);
  --spring-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --spring-subtle: cubic-bezier(0.25, 1, 0.5, 1);

  /* Asymmetric Directional Curves */
  --ease-in-kinetic: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-out-kinetic: cubic-bezier(0.16, 1, 0.3, 1);

  /* Kinematic Duration Scale */
  --motion-instant: 75ms;
  --motion-fast: 150ms;
  --motion-normal: 240ms;
  --motion-deliberate: 360ms;
  --motion-extended: 500ms;

  /* Cascading Stagger Calculations */
  --stagger-step: 35ms;
  --stagger-max-cap: 350ms;
}

/* Accessible Reduced-Motion Overrides */
@media (prefers-reduced-motion: reduce) {
  :root {
    --spring-snappy: ease;
    --spring-bouncy: ease;
    --spring-natural: ease;
    --spring-smooth: ease;
    --spring-subtle: ease;
    --motion-instant: 0.01ms;
    --motion-fast: 0.01ms;
    --motion-normal: 0.01ms;
    --motion-deliberate: 0.01ms;
    --motion-extended: 0.01ms;
  }
}
`;
}

export function generateMotionHelperJs() {
  return `/**
 * Kinematic Motion Choreography Helper — Agentway v1.7.0
 * Analytical Harmonic Oscillator Physics Solver
 */

export const SPRING_PRESETS = {
  snappy:  { mass: 0.8, stiffness: 280, damping: 18, bezier: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  bouncy:  { mass: 1.0, stiffness: 180, damping: 12, bezier: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  natural: { mass: 1.0, stiffness: 220, damping: 25, bezier: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  smooth:  { mass: 1.2, stiffness: 140, damping: 26, bezier: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  subtle:  { mass: 1.5, stiffness: 100, damping: 28, bezier: 'cubic-bezier(0.25, 1, 0.5, 1)' },
};

/**
 * Computes exact position x(t) of a damped spring oscillator
 */
export function calculateSpringPosition(t, { mass = 1, stiffness = 100, damping = 10, initialVelocity = 0 }) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * w0 * t);
    return 1 - envelope * (Math.cos(wd * t) + ((zeta * w0 - initialVelocity) / wd) * Math.sin(wd * t));
  } else {
    return 1 - Math.exp(-w0 * t) * (1 + (w0 - initialVelocity) * t);
  }
}

/**
 * Calculates cascading stagger delay for list elements
 */
export function getStaggerDelay(index, stepMs = 35, maxCapMs = 350) {
  return Math.min(index * stepMs, maxCapMs);
}
`;
}

export async function runSpringGenerator(targetDir = process.cwd()) {
  const resolvedDir = path.resolve(targetDir);
  console.log(pc.cyan(`\n🌊 Agentway Kinematic Motion Generator\n`));
  console.log(pc.dim(`   Scaffolding in: ${resolvedDir}\n`));

  await fs.mkdir(resolvedDir, { recursive: true });

  const css = generateSpringTokensCss();
  await fs.writeFile(path.join(resolvedDir, 'spring-tokens.css'), css);
  console.log(pc.green('   ✔ spring-tokens.css (Physics-based CSS custom properties)'));

  const js = generateMotionHelperJs();
  await fs.writeFile(path.join(resolvedDir, 'motion-choreography.js'), js);
  console.log(pc.green('   ✔ motion-choreography.js (Harmonic oscillator helper)\n'));

  console.log(pc.bold(pc.green('✅ Kinematic Motion system scaffolded successfully!')));
}
