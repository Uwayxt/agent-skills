import fs from 'fs';
import path from 'path';

/**
 * Scaffolds a complete modular feature slice with 5-state resilience and manifest.
 */
export function scaffoldModule(moduleName, baseDir = './src/modules') {
  if (!moduleName) {
    throw new Error('Module name is required. Example: agentway scaffold:module billing');
  }

  const cleanName = moduleName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
  const pascalName = cleanName
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

  const targetDir = path.resolve(process.cwd(), baseDir, cleanName);
  fs.mkdirSync(targetDir, { recursive: true });

  // 1. module.manifest.json
  const manifest = {
    "$schema": "https://agentway.dev/schemas/module.manifest.json",
    "name": cleanName,
    "displayName": pascalName,
    "version": "1.0.0",
    "description": `Feature module for ${pascalName}`,
    "route": `/${cleanName}`,
    "icon": "Folder",
    "navigation": {
      "group": "Features",
      "order": 10,
      "badge": null,
      "requiredRole": ["admin", "member"]
    },
    "states": {
      "hasEmptyState": true,
      "hasOfflineSupport": true,
      "hasSkeletonLoader": true
    },
    "dependencies": []
  };
  fs.writeFileSync(path.join(targetDir, 'module.manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');

  // 2. route-intent.json
  const routeIntent = {
    "path": `/${cleanName}`,
    "component": `${pascalName}Module`,
    "authRequired": true,
    "roles": ["admin", "member"],
    "subRoutes": [
      {
        "path": `/${cleanName}/:id`,
        "component": `${pascalName}DetailView`,
        "dynamicParam": "id"
      }
    ]
  };
  fs.writeFileSync(path.join(targetDir, 'route-intent.json'), JSON.stringify(routeIntent, null, 2), 'utf-8');

  // 3. React 5-State Component Boilerplate
  const componentCode = `import React, { useState, useEffect } from 'react';
import './${cleanName}.css';

/**
 * ${pascalName} Module with 5-State Resilience Architecture
 * States: Loading (Skeleton) | Ideal | Empty | Degraded/Error | Offline
 */
export function ${pascalName}Module() {
  const [status, setStatus] = useState('ideal'); // 'loading' | 'ideal' | 'empty' | 'error' | 'offline'
  const [data, setData] = useState([]);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline || status === 'offline') {
    return (
      <div className="${cleanName}-state-container ${cleanName}-offline" role="alert">
        <div className="state-icon">📡</div>
        <h2>Offline Mode</h2>
        <p>You are currently offline. Showing cached ${cleanName} data where available.</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Retry Connection
        </button>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="${cleanName}-state-container ${cleanName}-skeleton" aria-busy="true">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="${cleanName}-state-container ${cleanName}-error" role="alert">
        <div className="state-icon">⚠️</div>
        <h2>Unable to load ${pascalName}</h2>
        <p>Something went wrong while fetching this module. Please try again.</p>
        <button onClick={() => setStatus('ideal')} className="btn btn-secondary">
          Reload Module
        </button>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="${cleanName}-state-container ${cleanName}-empty">
        <div className="state-icon">📂</div>
        <h2>No ${pascalName} Found</h2>
        <p>Get started by creating your first ${cleanName} record.</p>
        <button onClick={() => alert('Create action')} className="btn btn-primary">
          + Create New
        </button>
      </div>
    );
  }

  return (
    <div className="${cleanName}-container">
      <header className="${cleanName}-header">
        <div>
          <h1>${pascalName}</h1>
          <p className="text-muted">Manage your ${cleanName} operations and overview.</p>
        </div>
        <button className="btn btn-primary">+ Add New</button>
      </header>

      <main className="${cleanName}-content">
        <div className="card">
          <h3>${pascalName} Content Area</h3>
          <p>Render module metrics, tables, and workflows here.</p>
        </div>
      </main>
    </div>
  );
}

export default ${pascalName}Module;
`;
  fs.writeFileSync(path.join(targetDir, `${pascalName}Module.jsx`), componentCode, 'utf-8');

  // 4. CSS file
  const cssCode = `/**
 * @generated by Agentway scaffold:module ${cleanName}
 */
.${cleanName}-container {
  padding: var(--space-lg, 24px);
  max-width: 1200px;
  margin: 0 auto;
}

.${cleanName}-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl, 32px);
  gap: var(--space-md, 16px);
}

.${cleanName}-state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-2xl, 48px);
  background: var(--surface-base, #ffffff);
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--border-subtle, #e5e7eb);
  min-height: 320px;
}

.${cleanName}-state-container .state-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md, 16px);
}

.skeleton-line {
  height: 24px;
  width: 240px;
  background: var(--border-subtle, #e5e7eb);
  border-radius: var(--radius-sm, 4px);
  margin-bottom: var(--space-md, 16px);
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;
  fs.writeFileSync(path.join(targetDir, `${cleanName}.css`), cssCode, 'utf-8');

  // 5. Update .agents/route-intents.json if present
  const globalRouteIntents = path.resolve(process.cwd(), '.agents/route-intents.json');
  if (fs.existsSync(globalRouteIntents)) {
    try {
      const routesData = JSON.parse(fs.readFileSync(globalRouteIntents, 'utf-8'));
      if (Array.isArray(routesData.routes)) {
        const exists = routesData.routes.find(r => r.path === `/${cleanName}`);
        if (!exists) {
          routesData.routes.push(routeIntent);
          fs.writeFileSync(globalRouteIntents, JSON.stringify(routesData, null, 2), 'utf-8');
        }
      }
    } catch (e) {}
  }

  return {
    moduleDir: targetDir,
    files: [
      'module.manifest.json',
      'route-intent.json',
      `${pascalName}Module.jsx`,
      `${cleanName}.css`
    ]
  };
}
