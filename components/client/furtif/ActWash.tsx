'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const WASH_TIERS = [
  { name: "Express", sub: "Ext · aspiration — 45 min", price: "75" },
  { name: "Signature", sub: "Ext / Int complet — 2h30", price: "180" },
  { name: "Deep clean", sub: "Shampoing sièges · moquettes — 4h", price: "320" },
  { name: "Ceramic", sub: "Protection céramique 3 ans — 1 jour", price: "890" },
  { name: "Concours", sub: "Polish + correction peinture — 2 jours", price: "1450" },
];

const STAGES = ["PRE-RINSE", "FOAM", "DEEP CLEAN", "CERAMIC", "POLISH"];
const SIZES = [1, 1.25, 1.5]; // Citadine, Berline, SUV

export function ActWash() {
  const [active, setActive] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [sweep, setSweep] = useState(false);

  useEffect(() => {
    setSweep(true);
    const t = setTimeout(() => setSweep(false), 1400);
    return () => clearTimeout(t);
  }, [active]);

  const activeTier = WASH_TIERS[active];

  return (
    <section className="act" id="act-wash">
      <style jsx>{`
        .act { position: relative; min-height: 100vh; padding: 120px 48px 80px; overflow: hidden; }
        #act-wash { background: #0B0C0E; color: #F4F2ED; padding: 160px 48px 140px; position: relative; }
        #act-wash::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(1200px 600px at 80% 20%, rgba(26,58,96,0.2) 0%, transparent 60%), radial-gradient(800px 400px at 20% 80%, rgba(42,74,112,0.13) 0%, transparent 60%);
        }
        
        .wash-head { display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; margin-bottom: 80px; }
        .wash-head h2 { font-size: clamp(64px, 11vw, 180px); font-weight: 500; letter-spacing: -.05em; line-height: .85; font-family: var(--sans); }
        .wash-head h2 em { font-style: italic; font-weight: 300; color: #8A8A85; }
        .wash-head .meta { font-family: var(--mono); font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; text-align: right; line-height: 2; }
        .wash-head .meta b { color: #F4F2ED; font-weight: 500; }
        
        .wash-wall { position: relative; z-index: 2; display: grid; grid-template-columns: 2fr 3fr; gap: 48px; min-height: 60vh; }
        .wash-menu { display: flex; flex-direction: column; gap: 2px; border-top: 1px solid rgba(255,255,255,0.1); }
        .wash-menu button {
          display: grid; grid-template-columns: 32px 1fr auto; gap: 18px; align-items: center;
          padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;
          transition: padding .3s, color .2s; color: #F4F2ED; font-family: var(--sans);
        }
        .wash-menu button .idx { font-family: var(--mono); font-size: 11px; letter-spacing: .2em; color: #6a6a6a; }
        .wash-menu button .name { font-size: 24px; font-weight: 500; letter-spacing: -.01em; }
        .wash-menu button .name small { display: block; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; font-weight: 400; margin-top: 4px; }
        .wash-menu button .price { font-family: var(--mono); font-size: 14px; color: #8A8A85; }
        .wash-menu button:hover { padding-left: 14px; color: #fff; }
        .wash-menu button.active { padding-left: 14px; color: #fff; background: linear-gradient(90deg, rgba(255,255,255,0.03), transparent); }
        .wash-menu button.active .idx { color: #F4F2ED; }
        
        .wash-preview { position: relative; aspect-ratio: 4/3; background: #000; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
        .wash-preview .scan { position: absolute; inset: 0; background: repeating-linear-gradient(180deg, rgba(14,165,232,0.04) 0 2px, transparent 2px 6px); }
        .wash-preview .car-silhouette { position: absolute; inset: auto 10% 14% 10%; height: 50%; background: linear-gradient(180deg, #1a1a1a, #0a0a0a); clip-path: polygon(0 100%, 6% 60%, 20% 40%, 34% 10%, 64% 10%, 80% 40%, 94% 60%, 100% 100%); box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
        .wash-preview .water { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 8%), radial-gradient(circle at 60% 30%, rgba(255,255,255,0.13), transparent 6%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.16), transparent 7%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.13), transparent 5%); opacity: 0; transition: opacity .6s; }
        .wash-preview.active .water { opacity: 1; }
        .wash-preview .foam { position: absolute; inset: -20% -40%; height: 140%; background: radial-gradient(ellipse at center, #ffffff, rgba(255,255,255,0.6) 30%, transparent 60%); filter: blur(20px); opacity: 0; transform: translateX(-120%); transition: transform 1.4s cubic-bezier(.2,.8,.2,1), opacity .4s; }
        .wash-preview.sweep .foam { opacity: .6; transform: translateX(120%); }
        .wash-preview .hud { position: absolute; left: 16px; right: 16px; bottom: 16px; display: flex; justify-content: space-between; align-items: end; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #F4F2ED; }
        .wash-preview .hud .bars { display: flex; gap: 3px; }
        .wash-preview .hud .bars span { width: 3px; height: 18px; background: rgba(244,242,237,0.2); }
        .wash-preview .hud .bars span.on { background: #F4F2ED; }
        .wash-preview .corner { position: absolute; width: 24px; height: 24px; border: 1px solid rgba(244,242,237,0.4); }
        .wash-preview .tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
        .wash-preview .tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
        .wash-preview .bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
        .wash-preview .br { bottom: 10px; right: 10px; border-left: none; border-top: none; }
        
        .wash-details { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 64px; position: relative; z-index: 2; }
        .wash-details .det { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; }
        .wash-details .k { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; }
        .wash-details .v { font-size: 22px; font-weight: 500; font-family: var(--sans); margin-top: 6px; letter-spacing: -.01em; }
        .wash-details .v small { display: block; font-family: var(--mono); font-size: 11px; color: #8A8A85; margin-top: 4px; font-weight: 400; letter-spacing: .1em; }
        
        .act-cta.dark {
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
          margin-top: 64px; padding: 28px 40px; background: linear-gradient(180deg, #E8553E, var(--accent)); color: white;
          border: 1px solid #FF6B54; border-radius: 16px;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 15px 35px rgba(212, 65, 42, 0.3), 0 5px 15px rgba(0,0,0,0.4);
          transition: transform .3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .3s ease; text-decoration: none; font-weight: 600;
        }
        .act-cta.dark:hover { box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 25px 45px rgba(212, 65, 42, 0.5), 0 10px 20px rgba(0,0,0,0.6); transform: translateY(-4px) scale(1.01); }
        .cta-l { display: flex; flex-direction: column; gap: 4px; }
        .cta-step { font-family: var(--mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; opacity: .5; }
        .cta-title { font-family: var(--sans); font-size: clamp(28px, 3.4vw, 44px); font-weight: 500; letter-spacing: -.02em; line-height: 1; }
        .cta-r { font-family: var(--mono); font-size: 13px; letter-spacing: .18em; text-transform: uppercase; }

        @media (max-width: 900px) {
          .wash-wall, .wash-details { grid-template-columns: 1fr; gap: 16px; }
          .act-cta.dark { flex-direction: column; text-align: left; align-items: flex-start; }
          #act-wash { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div className="wash-head">
        <div>
          <div className="eyebrow" style={{ color: '#8A8A85' }}>03 / Wash · Detailing atelier</div>
          <h2>Silent <em>wash.</em></h2>
        </div>
        <div className="meta">
          <div><b>5 niveaux de soin.</b></div>
          <div>Booking 48h minimum.</div>
          <div style={{ marginTop: '10px' }}>Atelier · Gennevilliers</div>
        </div>
      </div>

      <div className="wash-wall">
        <div className="wash-menu">
          <div style={{ padding: '0 0 24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A8A85', marginBottom: '8px' }}>Categorie de véhicule</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setSizeIdx(0)} style={{ flex: 1, padding: '12px', border: '1px solid rgba(255,255,255,0.1)', background: sizeIdx === 0 ? '#F4F2ED' : 'transparent', color: sizeIdx === 0 ? '#0A0A0A' : '#8A8A85', fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em' }}>Citadine (ex: Clio)</button>
              <button onClick={() => setSizeIdx(1)} style={{ flex: 1, padding: '12px', border: '1px solid rgba(255,255,255,0.1)', background: sizeIdx === 1 ? '#F4F2ED' : 'transparent', color: sizeIdx === 1 ? '#0A0A0A' : '#8A8A85', fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em' }}>Berline / Break</button>
              <button onClick={() => setSizeIdx(2)} style={{ flex: 1, padding: '12px', border: '1px solid rgba(255,255,255,0.1)', background: sizeIdx === 2 ? '#F4F2ED' : 'transparent', color: sizeIdx === 2 ? '#0A0A0A' : '#8A8A85', fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em' }}>SUV (ex: Cayenne)</button>
            </div>
          </div>

          {WASH_TIERS.map((t, idx) => (
            <button key={idx} className={active === idx ? 'active' : ''} onClick={() => setActive(idx)}>
              <span className="idx">0{idx + 1}</span>
              <span className="name">{t.name}<small>{t.sub}</small></span>
              <span className="price">{Math.round(parseFloat(t.price) * SIZES[sizeIdx])} €</span>
            </button>
          ))}
        </div>

        <div className={`wash-preview active ${sweep ? 'sweep' : ''}`}>
          <div className="corner tl"></div><div className="corner tr"></div><div className="corner bl"></div><div className="corner br"></div>
          <div className="scan"></div>
          <div className="car-silhouette"></div>
          <div className="water"></div>
          <div className="foam"></div>
          <div className="hud">
            <div>FURTIF·WASH / CH-03<br/>PRESSURE 140 BAR · 38°C</div>
            <div>
              <div style={{ textAlign: 'right', marginBottom: '6px' }}>STAGE · {STAGES[active]}</div>
              <div className="bars">
                {[0,1,2,3,4].map((i) => <span key={i} className={i <= active ? 'on' : ''}></span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wash-details">
        <div className="det"><div className="k">Produits</div><div className="v">pH neutre<small>— sans rinçage agressif</small></div></div>
        <div className="det"><div className="k">Eau</div><div className="v">Osmose<small>— 0 trace</small></div></div>
        <div className="det"><div className="k">Pickup</div><div className="v">Inclus 15 km<small>— selon prestation</small></div></div>
        <div className="det"><div className="k">Disponibilité</div><div className="v">Mar — Sam<small>— 08:00 / 19:00</small></div></div>
      </div>

      <Link href="/login" className="act-cta dark">
        <span className="cta-l"><span className="cta-step">— Étape suivante</span><span className="cta-title">Réserver cette prestation</span></span>
        <span className="cta-r">{activeTier.name} · {Math.round(parseFloat(activeTier.price) * SIZES[sizeIdx])} € →</span>
      </Link>
    </section>
  );
}
