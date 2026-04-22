'use client';

import { useEffect, useState } from 'react';

export function ChromeNav() {
  const [dark, setDark] = useState(false);

  // Un petit observer pourrait vérifier quel section est visible pour changer la couleur, 
  // mais pour l'instant Furtif.html utilisait mix-blend-mode.
  
  return (
    <>
      <style jsx>{`
        .chrome {
          position: fixed; inset: 0 0 auto 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 28px; mix-blend-mode: difference; color: #F4F2ED;
          pointer-events: none;
        }
        .chrome > * { pointer-events: auto; }
        .mark { font-family: var(--sans); font-weight: 800; font-size: 18px; letter-spacing: .24em; }
        .mark .dot { display: inline-block; width: 6px; height: 6px; background: currentColor; border-radius: 50%; margin-left: 6px; vertical-align: 2px; }
        .nav { display: flex; gap: 28px; font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase; }
        .nav a { opacity: .65; transition: opacity .2s; }
        .nav a:hover, .nav a.active { opacity: 1; }
        .nav a .num { opacity: .5; margin-right: 6px; }

        .side-index {
          position: fixed; left: 28px; bottom: 28px; z-index: 40;
          font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
          color: var(--ink); mix-blend-mode: difference; color: #F4F2ED;
        }
        .side-index .row { display: flex; gap: 12px; align-items: center; margin-top: 6px; }
        .side-index .bar { width: 24px; height: 1px; background: currentColor; opacity: .35; }

        .scroll-hint {
          position: fixed; right: 28px; bottom: 28px; z-index: 40;
          font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
          display: flex; align-items: center; gap: 10px; mix-blend-mode: difference; color: #F4F2ED;
        }
        .scroll-hint .tick { width: 1px; height: 24px; background: currentColor; animation: tick 2s ease-in-out infinite; }

        @media (max-width: 900px) {
          .chrome { padding: 14px 20px; }
        }
      `}</style>
      
      <div className="chrome">
        <div className="mark">FURTIF<span className="dot"></span></div>
        <nav className="nav">
          <a href="/login" style={{ paddingLeft: '24px' }}>Connexion au compte</a>
        </nav>
      </div>

      <div className="scroll-hint">
        Scroll<div className="tick"></div>
      </div>
    </>
  );
}
