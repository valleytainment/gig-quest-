/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟦 MODULE │ gig-quest/src/main.tsx
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          INFRASTRUCTURE
 * @responsibility React 19 DOM bootstrap — mounts App in StrictMode
 * @depends-on     App.tsx, index.css
 * @consumers      index.html
 * @safe-mode      N/A
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
