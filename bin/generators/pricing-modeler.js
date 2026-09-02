/**
 * Agentway CLI Generator #9: pricing-modeler
 * Command: agentway gen:pricing [dir]
 *
 * Generates:
 *   - pricing-matrix.json (structured pricing tiers with decoy effect)
 *   - PricingTable.jsx (React component with annual/monthly billing toggle)
 *   - pricing.css (responsive, light/dark mode styling)
 */

import fs from 'fs/promises';
import path from 'path';
import pc from 'picocolors';

export function generatePricingMatrix() {
  return {
    version: '1.7.0',
    model: 'Decoy Effect (Asymmetric Dominance)',
    currency: 'USD',
    billingPeriods: {
      monthly: { label: 'Monthly' },
      annual: { label: 'Annual', discountPercentage: 20, badge: 'Save 20%' }
    },
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        tagline: 'Essential tools for individuals & emerging projects',
        priceMonthly: 19,
        priceAnnualPerMonth: 15,
        badge: null,
        isTargetTier: false,
        isDecoy: false,
        features: [
          { name: 'Up to 3 Active Projects', included: true },
          { name: '5 GB Cloud Storage', included: true },
          { name: 'Standard Community Support', included: true },
          { name: 'Real-time Team Collaboration', included: false },
          { name: 'Custom Export Formats', included: false },
          { name: 'Advanced Audit Logs', included: false }
        ],
        ctaText: 'Get Started'
      },
      {
        id: 'pro',
        name: 'Professional',
        tagline: 'Full power for high-velocity builders & scaling teams',
        priceMonthly: 49,
        priceAnnualPerMonth: 39,
        badge: 'MOST POPULAR',
        isTargetTier: true,
        isDecoy: false,
        features: [
          { name: 'Unlimited Active Projects', included: true },
          { name: '100 GB Cloud Storage', included: true },
          { name: 'Priority 24/7 Support', included: true },
          { name: 'Real-time Team Collaboration (Up to 10 seats)', included: true },
          { name: 'Custom Export Formats (PDF, JSON, CSV)', included: true },
          { name: 'Advanced Audit Logs & Version History', included: true }
        ],
        ctaText: 'Start 14-Day Free Trial'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        tagline: 'Dedicated infrastructure, custom SLAs & strict governance',
        priceMonthly: 'Custom',
        priceAnnualPerMonth: 'Custom',
        badge: 'ENTERPRISE',
        isTargetTier: false,
        isDecoy: false,
        features: [
          { name: 'Unlimited Everything', included: true },
          { name: 'Dedicated Cloud Infrastructure', included: true },
          { name: 'Custom SLA & 99.99% Uptime Guarantee', included: true },
          { name: 'SAML 2.0 / SSO Integration', included: true },
          { name: 'Dedicated Customer Success Manager', included: true },
          { name: 'Custom Security & Compliance Audits', included: true }
        ],
        ctaText: 'Contact Sales'
      }
    ]
  };
}

export function generatePricingComponent() {
  return `import React, { useState } from 'react';
import './pricing.css';
import pricingData from './pricing-matrix.json';

export function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <span className="pricing-kicker">TRANSPARENT PRICING</span>
        <h2 className="pricing-title">Simple, predictable pricing for ambitious teams</h2>
        <p className="pricing-subtitle">
          Scale effortlessly from MVP to enterprise with zero hidden fees.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pricing-toggle-container">
          <span className={!isAnnual ? 'toggle-label active' : 'toggle-label'}>Monthly</span>
          <button
            type="button"
            className="pricing-toggle-switch"
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual billing"
          >
            <span className={\`toggle-knob \${isAnnual ? 'annual' : 'monthly'}\`} />
          </button>
          <span className={isAnnual ? 'toggle-label active' : 'toggle-label'}>
            Annual <span className="pricing-save-badge">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
        {pricingData.tiers.map((tier) => {
          const price = typeof tier.priceMonthly === 'number'
            ? (isAnnual ? tier.priceAnnualPerMonth : tier.priceMonthly)
            : tier.priceMonthly;

          return (
            <div
              key={tier.id}
              className={\`pricing-card \${tier.isTargetTier ? 'target-pro' : ''}\`}
            >
              {tier.badge && (
                <div className="pricing-card-badge">{tier.badge}</div>
              )}
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-tagline">{tier.tagline}</p>

              <div className="tier-price-block">
                {typeof price === 'number' ? (
                  <>
                    <span className="price-currency">$</span>
                    <span className="price-amount">{price}</span>
                    <span className="price-period">/ month</span>
                  </>
                ) : (
                  <span className="price-amount custom">{price}</span>
                )}
              </div>

              {isAnnual && typeof price === 'number' && (
                <p className="billed-annually-note">
                  Billed annually (\${price * 12}/yr)
                </p>
              )}

              <button
                type="button"
                className={\`btn-tier \${tier.isTargetTier ? 'btn-primary' : 'btn-outline'}\`}
              >
                {tier.ctaText}
              </button>

              <ul className="tier-features-list">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className={feat.included ? 'feat-included' : 'feat-excluded'}>
                    <span className="feat-icon">{feat.included ? '✓' : '—'}</span>
                    <span className="feat-name">{feat.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PricingTable;
`;
}

export function generatePricingCss() {
  return `/* Pricing Component Styles — Agentway v1.7.0 */
.pricing-section {
  padding: var(--space-12, 48px) var(--space-6, 24px);
  max-width: 1200px;
  margin: 0 auto;
  font-family: inherit;
  color: var(--color-text, #1E293B);
}

.pricing-header {
  text-align: center;
  margin-bottom: var(--space-10, 40px);
}

.pricing-kicker {
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-primary, #3B82F6);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pricing-title {
  font-size: var(--text-3xl, 2rem);
  font-weight: var(--font-bold, 700);
  margin: var(--space-2, 8px) 0;
}

.pricing-subtitle {
  color: var(--color-text-muted, #64748B);
  font-size: var(--text-base, 1rem);
  max-width: 580px;
  margin: 0 auto;
}

.pricing-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3, 12px);
  margin-top: var(--space-6, 24px);
}

.toggle-label {
  font-size: var(--text-sm, 0.875rem);
  color: var(--color-text-muted, #64748B);
  font-weight: var(--font-medium, 500);
}

.toggle-label.active {
  color: var(--color-text, #1E293B);
  font-weight: var(--font-bold, 700);
}

.pricing-toggle-switch {
  width: 48px;
  height: 26px;
  background: var(--color-border, #CBD5E1);
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 200ms ease;
  padding: 2px;
}

.toggle-knob {
  display: block;
  width: 22px;
  height: 22px;
  background: #FFFFFF;
  border-radius: 50%;
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toggle-knob.annual {
  transform: translateX(22px);
}

.pricing-save-badge {
  background: rgba(34, 197, 94, 0.15);
  color: #16A34A;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  margin-left: 4px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6, 24px);
  align-items: stretch;
}

.pricing-card {
  background: var(--color-surface, #FFFFFF);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: var(--radius-lg, 16px);
  padding: var(--space-8, 32px);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.pricing-card.target-pro {
  border: 2px solid var(--color-primary, #3B82F6);
  box-shadow: 0 12px 32px -4px rgba(59, 130, 246, 0.15);
}

@media (min-width: 900px) {
  .pricing-card.target-pro {
    transform: scale(1.04);
  }
}

.pricing-card-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary, #3B82F6);
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  letter-spacing: 0.05em;
}

.tier-name {
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-bold, 700);
  margin: 0;
}

.tier-tagline {
  font-size: var(--text-sm, 0.875rem);
  color: var(--color-text-muted, #64748B);
  margin: 6px 0 var(--space-4, 16px) 0;
  min-height: 40px;
}

.tier-price-block {
  display: flex;
  align-items: baseline;
  margin: var(--space-4, 16px) 0 var(--space-2, 8px) 0;
}

.price-currency {
  font-size: var(--text-2xl, 1.5rem);
  font-weight: 600;
}

.price-amount {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1;
}

.price-amount.custom {
  font-size: 2rem;
}

.price-period {
  color: var(--color-text-muted, #64748B);
  font-size: var(--text-sm, 0.875rem);
  margin-left: 6px;
}

.billed-annually-note {
  font-size: 0.8rem;
  color: var(--color-text-muted, #64748B);
  margin: 0 0 var(--space-6, 24px) 0;
}

.btn-tier {
  width: 100%;
  padding: var(--space-3, 12px);
  border-radius: var(--radius-md, 8px);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  cursor: pointer;
  transition: opacity 150ms ease;
  margin-bottom: var(--space-6, 24px);
}

.btn-primary {
  background: var(--color-primary, #3B82F6);
  color: #FFFFFF;
  border: none;
}

.btn-primary:hover {
  opacity: 0.92;
}

.btn-outline {
  background: transparent;
  color: var(--color-text, #1E293B);
  border: 1px solid var(--color-border, #CBD5E1);
}

.btn-outline:hover {
  background: rgba(0, 0, 0, 0.03);
}

.tier-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid var(--color-border, #E2E8F0);
  padding-top: var(--space-4, 16px);
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
}

.feat-included {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm, 0.875rem);
}

.feat-excluded {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm, 0.875rem);
  color: var(--color-text-muted, #94A3B8);
  opacity: 0.6;
}

.feat-icon {
  font-weight: bold;
  color: var(--color-primary, #3B82F6);
}

.feat-excluded .feat-icon {
  color: var(--color-text-muted, #94A3B8);
}
`;
}

export async function runPricingGenerator(targetDir = process.cwd()) {
  const resolvedDir = path.resolve(targetDir);
  console.log(pc.cyan(`\n💡 Agentway Behavioral Pricing Modeler\n`));
  console.log(pc.dim(`   Scaffolding in: ${resolvedDir}\n`));

  await fs.mkdir(resolvedDir, { recursive: true });

  const matrix = generatePricingMatrix();
  await fs.writeFile(path.join(resolvedDir, 'pricing-matrix.json'), JSON.stringify(matrix, null, 2));
  console.log(pc.green('   ✔ pricing-matrix.json (Decoy Effect model)'));

  const component = generatePricingComponent();
  await fs.writeFile(path.join(resolvedDir, 'PricingTable.jsx'), component);
  console.log(pc.green('   ✔ PricingTable.jsx (React component with annual toggle)'));

  const css = generatePricingCss();
  await fs.writeFile(path.join(resolvedDir, 'pricing.css'), css);
  console.log(pc.green('   ✔ pricing.css (Responsive & tokenized styles)\n'));

  console.log(pc.bold(pc.green('✅ Behavioral Pricing architecture scaffolded successfully!')));
}
