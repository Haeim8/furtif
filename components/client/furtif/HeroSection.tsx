'use client';

export function HeroSection() {
  return (
    <section className="hero" id="hero">
      <style jsx>{`
        .hero { min-height: 100vh; padding: 96px 28px 28px; position: relative; display: flex; align-items: stretch; }
        .hero-grid {
          flex: 1; display: grid; grid-template-columns: 180px 1fr 220px; gap: 32px;
          border: 1px solid var(--line); padding: 36px; background: var(--bg);
          position: relative;
        }
        .hero-grid::before, .hero-grid::after {
          content: ""; position: absolute; width: 10px; height: 10px; border: 1px solid var(--ink); background: var(--bg);
        }
        .hero-grid::before { top: -6px; left: -6px; }
        .hero-grid::after { bottom: -6px; right: -6px; }
        .hero-side { display: flex; flex-direction: column; justify-content: space-between; }
        .hero-side .eyebrow { writing-mode: vertical-rl; transform: rotate(180deg); align-self: flex-start; }
        .hero-side-bottom { display: flex; flex-direction: column; gap: 18px; }
        .tick-line { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; color: var(--mute); }
        .tick-line .ln { width: 40px; height: 1px; background: var(--ink); }
        .meta-lines { font-family: var(--mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--mute); line-height: 1.9; }
        .meta-lines b { color: var(--ink); font-weight: 500; }

        .hero-main { display: flex; flex-direction: column; justify-content: space-between; gap: 48px; }
        .hero-title {
          font-weight: 500; letter-spacing: -.055em; line-height: .82;
          display: flex; flex-direction: column; gap: 4px; border: none; font-family: var(--sans);
        }
        .hero-title .w1 { font-size: clamp(88px, 15vw, 220px); }
        .hero-title .w1 .slash { color: var(--accent); }
        .hero-title .w2 { font-size: clamp(44px, 6vw, 88px); font-style: italic; font-weight: 300; color: var(--mute); padding-left: 8%; }
        .hero-title .w3 { font-size: clamp(88px, 15vw, 220px); padding-left: 18%; }
        .hero-title .w2 em { font-style: italic; }

        .hero-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line); }
        .hs {
          display: grid; grid-template-columns: auto 1fr auto; grid-template-rows: auto auto; gap: 4px 12px;
          padding: 22px 20px 22px 0; border-right: 1px solid var(--line); position: relative;
          transition: padding .3s, background .3s; text-decoration: none;
        }
        .hs:last-child { border-right: none; }
        .hs:not(:first-child) { padding-left: 20px; }
        .hs-n { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; color: var(--mute); grid-row: 1; grid-column: 1; }
        .hs-name { font-family: var(--sans); font-size: 22px; font-weight: 500; letter-spacing: -.02em; grid-row: 1; grid-column: 2; }
        .hs-sub { grid-row: 2; grid-column: 1 / 3; font-family: var(--mono); font-size: 11px; color: var(--mute); letter-spacing: .04em; }
        .hs-arr { grid-row: 1 / 3; grid-column: 3; align-self: center; font-family: var(--sans); font-size: 20px; color: var(--mute); transition: transform .3s, color .2s; }
        .hs:hover { background: var(--ink); color: var(--bg); }
        .hs:hover .hs-n, .hs:hover .hs-sub { color: #aaa; }
        .hs:hover .hs-arr { color: var(--bg); transform: translateX(6px); }

        .hero-side.right { align-items: flex-end; text-align: right; gap: 28px; justify-content: space-between; }
        .coord { font-family: var(--mono); }
        .coord .k { font-size: 10px; letter-spacing: .22em; color: var(--mute); }
        .coord .v { font-size: 13px; color: var(--ink); margin-top: 6px; letter-spacing: .08em; line-height: 1.5; }
        .live { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); margin-right: 6px; box-shadow: 0 0 0 3px rgba(212, 65, 42, 0.13); animation: pulse 2s ease-in-out infinite; }

        @media (max-width: 900px) {
          .hero { padding-left: 20px; padding-right: 20px; }
          .hero-grid { grid-template-columns: 1fr; gap: 16px; }
          .hero-side { display: none; }
          .hero-side.right { display: flex; flex-direction: row; align-items: flex-start; text-align: left; }
          .hero-title .w1 { font-size: clamp(64px, 18vw, 120px); }
        }
      `}</style>
      
      <div className="hero-grid">
        <aside className="hero-side">
          <div className="eyebrow">Gennevilliers · Atelier N°001</div>
          <div className="hero-side-bottom">
            <div className="tick-line">
              <span className="ln"></span><span>01</span>
            </div>
            <div className="meta-lines">
              <div><b>Three disciplines.</b></div>
              <div>One signature.</div>
            </div>
          </div>
        </aside>

        <div className="hero-main">
          <h1 className="hero-title">
            <span className="w1">Fur<span className="slash">/</span>tif</span>
            <span className="w2"><em>the quiet</em></span>
            <span className="w3">atelier.</span>
          </h1>

          <div className="hero-services">
            <a href="#act-car" className="hs">
              <span className="hs-n">01</span>
              <span className="hs-name">Furtif Car</span>
              <span className="hs-sub">Location · showroom</span>
              <span className="hs-arr">→</span>
            </a>
            <a href="#act-wash" className="hs">
              <span className="hs-n">02</span>
              <span className="hs-name">Furtif Wash</span>
              <span className="hs-sub">Detailing · 5 niveaux</span>
              <span className="hs-arr">→</span>
            </a>
            <a href="#act-light" className="hs">
              <span className="hs-n">03</span>
              <span className="hs-name">Furtif Light</span>
              <span className="hs-sub">Teintes · ciel étoilé</span>
              <span className="hs-arr">→</span>
            </a>
          </div>
        </div>

        <aside className="hero-side right">
          <div className="coord">
            <div className="k">COORD</div>
            <div className="v">48.93° N<br/>2.30° E</div>
          </div>
          <div className="coord">
            <div className="k">STATUS</div>
            <div className="v"><span className="live"></span> Open — 08:00 / 19:00</div>
          </div>
        </aside>
      </div>
    </section>
  );
}
