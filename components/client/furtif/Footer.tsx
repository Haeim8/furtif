export function Footer() {
  return (
    <footer>
      <style jsx>{`
        footer { padding: 80px 48px 32px; background: var(--bg); border-top: 1px solid var(--line); }
        .f-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 60px; }
        .f-mark { font-size: clamp(64px, 10vw, 140px); font-family: var(--sans); font-weight: 500; letter-spacing: -.05em; line-height: .85; }
        .f-mark em { font-style: italic; color: var(--mute); font-weight: 400; }
        .f-col h4 { font-family: var(--mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--mute); margin-bottom: 16px; font-weight: 500; }
        .f-col a { display: block; padding: 6px 0; font-family: var(--sans); font-size: 16px; color: var(--ink); cursor: pointer; text-decoration: underline; text-decoration-color: rgba(10,10,10,0.2); text-underline-offset: 4px; transition: color 0.2s, text-decoration-color 0.2s; width: max-content; }
        .f-col a:hover { color: var(--accent); text-decoration-color: var(--accent); }
        .f-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 11px; letter-spacing: .15em; color: var(--mute); text-transform: uppercase; }

        @media (max-width: 900px) {
          .f-grid { grid-template-columns: 1fr; gap: 40px; }
          footer { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div className="f-grid">
        <div className="f-mark">Fur<em>/</em>tif<span style={{ color: 'var(--accent)' }}>.</span></div>
        <div className="f-col">
          <h4>Services</h4>
          <a href="#act-car">Furtif Car</a>
          <a href="#act-wash">Furtif Wash</a>
          <a href="#act-light">Furtif Light</a>
        </div>
        <div className="f-col">
          <h4>Atelier</h4>
          <a>Gennevilliers · France</a>
          <a>Mar — Sam · 08—19</a>
          <a>contact@furtif.fr</a>
        </div>
        <div className="f-col">
          <h4>Légal</h4>
          <a>CGV</a><a>Confidentialité</a><a>Assurance</a>
        </div>
      </div>
      <div className="f-bottom">
        <div>© 2026 Furtif Atelier · Tous droits réservés</div>
        <div>v0.1 · refonte</div>
      </div>
    </footer>
  );
}
