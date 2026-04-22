'use client';

import { useState } from 'react';
import Link from 'next/link';

export function ActLight() {
  const [vlt, setVlt] = useState(35);
  const [sky, setSky] = useState(2); // 0=Aucun, 1=Classique, 2=Galaxie, 3=Cosmos
  const [cov, setCov] = useState(1); // 0=Avant, 1=Integral, 2=Pano

  return (
    <section className="act" id="act-light">
      <style jsx>{`
        .act { position: relative; min-height: 100vh; padding: 120px 48px 80px; overflow: hidden; }
        #act-light { background: var(--night); color: #F4F2ED; padding: 160px 48px 140px; position: relative; overflow: hidden; }
        #act-light .stars { position: absolute; inset: 0; pointer-events: none; }
        #act-light .stars i { position: absolute; width: 2px; height: 2px; background: var(--star); border-radius: 50%; box-shadow: 0 0 6px var(--star), 0 0 12px rgba(246,231,178,0.4); opacity: .8; animation: twinkle 4s ease-in-out infinite; }
        
        .light-head { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 80px; }
        .light-head h2 { font-family: var(--sans); font-size: clamp(64px, 11vw, 180px); font-weight: 500; letter-spacing: -.05em; line-height: .85; }
        .light-head h2 em { font-style: italic; font-weight: 300; color: #6a6a6a; }
        .light-head .meta { font-family: var(--mono); font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; text-align: right; line-height: 2; }
        .light-head .meta b { color: #F4F2ED; font-weight: 500; }
        
        .cabin { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 2fr; gap: 48px; align-items: stretch; }
        .tint-control { display: flex; flex-direction: column; gap: 24px; }
        .tint-slider { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; }
        .tint-slider .k { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; }
        .tint-slider .v { font-family: var(--sans); font-weight: 500; font-size: 56px; letter-spacing: -.03em; margin-top: 8px; }
        .tint-slider .v small { font-family: var(--mono); font-size: 13px; color: #8A8A85; margin-left: 4px; font-weight: 400; }
        
        input[type="range"] { width: 100%; margin-top: 20px; -webkit-appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-runnable-track { height: 1px; background: rgba(255,255,255,0.2); }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #F4F2ED; margin-top: -7px; cursor: pointer; }
        
        .tint-steps { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; color: #6a6a6a; margin-top: 8px; text-transform: uppercase; }
        
        .opt-toggle { display: flex; gap: 0; border: 1px solid rgba(255,255,255,0.1); margin-top: 8px; }
        .opt-toggle button { flex: 1; padding: 14px 12px; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; transition: all .2s; }
        .opt-toggle button.on { background: #F4F2ED; color: #0A0A0A; }
        
        .cabin-view { position: relative; aspect-ratio: 3/2; background: #0A0C10; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
        .windshield { position: absolute; inset: 6% 8% 24% 8%; background: linear-gradient(180deg, #9ab5d0 0%, #6890b8 60%, #0a1428 100%); clip-path: polygon(6% 100%, 14% 0, 86% 0, 94% 100%); transition: filter 1s, opacity 1s; }
        .dashboard { position: absolute; left: 0; right: 0; bottom: 0; height: 28%; background: linear-gradient(180deg, #0f0f12, #050507); border-top: 1px solid rgba(255,255,255,0.04); }
        .dash-hud { position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%); font-family: var(--mono); font-size: 10px; letter-spacing: .3em; color: #8A8A85; text-transform: uppercase; }
        
        .headliner { position: absolute; inset: 0 0 28% 0; background: radial-gradient(ellipse at 50% -20%, #1a1f2a 0%, #05070B 70%); opacity: 0; transition: opacity 1s; }
        .night .headliner { opacity: 1; }
        .starfield { position: absolute; inset: 0 0 28% 0; opacity: 0; transition: opacity 1s; pointer-events: none; }
        .night .starfield { opacity: 1; }
        .tint-overlay { position: absolute; inset: 0; background: #000; pointer-events: none; transition: opacity .2s; }
        
        .corner { position: absolute; width: 24px; height: 24px; border: 1px solid rgba(255,255,255,0.2); }
        .tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
        .tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
        .bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
        .br { bottom: 10px; right: 10px; border-left: none; border-top: none; }
        
        .light-pricing { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 64px; position: relative; z-index: 2; }
        .light-pricing .p { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; }
        .light-pricing .p .k { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #8A8A85; }
        .light-pricing .p .v { font-family: var(--sans); font-size: 28px; font-weight: 500; margin-top: 6px; letter-spacing: -.02em; }
        .light-pricing .p .v small { font-family: var(--mono); font-size: 12px; color: #8A8A85; margin-left: 4px; font-weight: 400; }
        
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
          .cabin, .light-pricing { grid-template-columns: 1fr; gap: 16px; }
          .act-cta.dark { flex-direction: column; text-align: left; align-items: flex-start; }
          #act-light { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>
      
      {/* Background purely aesthetic stars could be rendered dynamically but for React we can simply map a few fixed coords or generic CSS */}
      <div className="stars"></div>

      <div className="light-head">
        <div>
          <div className="eyebrow" style={{ color: '#8A8A85' }}>04 / Light · Tint & sky</div>
          <h2>Fall <em>into night.</em></h2>
        </div>
        <div className="meta">
          <div><b>Vitres · teintes certifiées.</b></div>
          <div>Ciel étoilé fibre optique.</div>
          <div style={{ marginTop: '10px' }}>Garantie 5 ans</div>
        </div>
      </div>

      <div className="cabin">
        <div className="tint-control">
          <div className="tint-slider">
            <div className="k">VLT · transmission lumière visible</div>
            <div className="v">{vlt}<small>%</small></div>
            <input 
              type="range" 
              min="5" 
              max="70" 
              value={vlt} 
              step="5" 
              onChange={(e) => setVlt(Number(e.target.value))} 
            />
            <div className="tint-steps"><span>5%</span><span>20%</span><span>35%</span><span>50%</span><span>70%</span></div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A8A85' }}>Ciel étoilé</div>
            <div className="opt-toggle">
              <button className={sky === 0 ? 'on' : ''} onClick={() => setSky(0)}>Aucun</button>
              <button className={sky === 1 ? 'on' : ''} onClick={() => setSky(1)}>Classique</button>
              <button className={sky === 2 ? 'on' : ''} onClick={() => setSky(2)}>Galaxie</button>
              <button className={sky === 3 ? 'on' : ''} onClick={() => setSky(3)}>Cosmos</button>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A8A85' }}>Couverture</div>
            <div className="opt-toggle">
              <button className={cov === 0 ? 'on' : ''} onClick={() => setCov(0)}>Avant</button>
              <button className={cov === 1 ? 'on' : ''} onClick={() => setCov(1)}>Intégral</button>
              <button className={cov === 2 ? 'on' : ''} onClick={() => setCov(2)}>Pano</button>
            </div>
          </div>
        </div>

        <div className={`cabin-view ${sky > 0 ? 'night' : ''}`}>
          <div className="corner tl"></div><div className="corner tr"></div><div className="corner bl"></div><div className="corner br"></div>

          <div className="windshield"></div>
          <div className="headliner"></div>
          
          <div className="starfield" style={{ opacity: sky > 0 ? (sky * 0.33) : 0 }}>
            {/* Si c'était du vrai CSS on mapperait des div d'étoiles ici */}
          </div>
          
          <div className="dashboard"></div>
          <div className="dash-hud">— INTERIOR · MODE {sky > 0 ? 'NIGHT' : 'DAY'} —</div>
          <div className="tint-overlay" style={{ opacity: 1 - (vlt / 100) }}></div>
        </div>
      </div>

      <div className="light-pricing">
        <div className="p"><div className="k">Vitres avant</div><div className="v">450 <small>€</small></div></div>
        <div className="p"><div className="k">Intégral 4 portes</div><div className="v">890 <small>€</small></div></div>
        <div className="p"><div className="k">Ciel · 400 pts</div><div className="v">1 200 <small>€</small></div></div>
        <div className="p"><div className="k">Pack cabine complet</div><div className="v">2 390 <small>€</small></div></div>
      </div>

      <Link href="/login" className="act-cta dark">
        <span className="cta-l"><span className="cta-step">— Étape suivante</span><span className="cta-title">Configurer &amp; réserver</span></span>
        <span className="cta-r">Pack cabine · 2 390 € →</span>
      </Link>
    </section>
  );
}
