'use client';

import { useState } from 'react';
import Link from 'next/link';

const MODELS = [
  {name:"Porsche 911 GT3", hp:"510 ch", accel:"3.4 s", trans:"PDK", price:"890 €"},
  {name:"Tesla Model S Plaid", hp:"1020 ch", accel:"2.1 s", trans:"Single-speed", price:"720 €"},
  {name:"Range Rover Sport", hp:"530 ch", accel:"4.5 s", trans:"8 auto", price:"620 €"},
  {name:"Mercedes G63 AMG", hp:"585 ch", accel:"4.5 s", trans:"9G-tronic", price:"950 €"},
  {name:"BMW M4 Competition", hp:"530 ch", accel:"3.5 s", trans:"M Steptronic", price:"540 €"},
  {name:"Lamborghini Urus", hp:"666 ch", accel:"3.3 s", trans:"8 auto", price:"1 450 €"},
  {name:"Audi RS6 Avant", hp:"630 ch", accel:"3.4 s", trans:"Tiptronic", price:"680 €"},
];

export function ActCar() {
  const [active, setActive] = useState(0);
  const m = MODELS[active];

  return (
    <section className="act" id="act-car">
      <style jsx>{`
        .act { position: relative; min-height: 100vh; padding: 120px 48px 80px; overflow: hidden; }
        #act-car { background: linear-gradient(180deg, var(--bg) 0%, #E8E4DB 100%); padding: 140px 48px 120px; }
        
        .car-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 48px; }
        .car-head h2 { font-size: clamp(54px, 8vw, 120px); font-weight: 500; letter-spacing: -.04em; line-height: .9; font-family: var(--sans); }
        .car-head h2 em { font-style: italic; color: var(--mute); font-weight: 400; }
        
        .showroom { position: relative; display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 24px; align-items: center; min-height: 72vh; }
        .showroom .stage { position: relative; aspect-ratio: 16/10; background: radial-gradient(ellipse at 50% 95%, rgba(10,10,10,0.09) 0%, transparent 60%); display: flex; align-items: center; justify-content: center; }
        .showroom .turntable { width: 86%; aspect-ratio: 16/9; position: relative; background: radial-gradient(ellipse at center, rgba(10,10,10,0.05), transparent 70%); display: flex; align-items: center; justify-content: center; }
        .car-shadow { position: absolute; bottom: 6%; left: 10%; right: 10%; height: 10%; background: radial-gradient(ellipse at center, rgba(10,10,10,0.2) 0%, transparent 70%); filter: blur(6px); }
        .car-plate {
          position: relative; width: 72%; aspect-ratio: 5/2;
          background: repeating-linear-gradient(135deg, rgba(10,10,10,0.03) 0 2px, transparent 2px 10px), #EDEAE3;
          border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; color: var(--mute); font-family: var(--mono); font-size: 11px; letter-spacing: .2em; text-transform: uppercase;
          transition: transform .6s cubic-bezier(.2,.7,.2,1);
        }
        .car-plate::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(10,10,10,0.07), transparent); }
        .turntable-ring { position: absolute; inset: auto 0 -4% 0; height: 40%; border-radius: 50%; border: 1px dashed rgba(10,10,10,0.2); transform: scaleY(.18) translateY(30%); animation: spin 24s linear infinite; }
        
        .spec-col { display: flex; flex-direction: column; gap: 28px; }
        .spec { border-top: 1px solid var(--line); padding-top: 10px; }
        .spec .k { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--mute); }
        .spec .v { font-family: var(--sans); font-weight: 500; font-size: 28px; letter-spacing: -.02em; margin-top: 4px; }
        
        .showroom-left { display: flex; flex-direction: column; gap: 20px; }
        .model-list { display: flex; flex-direction: column; gap: 2px; border-top: 1px solid var(--line); }
        .model-list button {
          display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line);
          font-family: var(--mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--mute); text-align: left; transition: color .2s, padding .3s;
        }
        .model-list button .n { display: inline-block; width: 28px; }
        .model-list button.active { color: var(--ink); padding-left: 10px; }
        .model-list button:hover { color: var(--ink); }
        .model-list button .arrow { opacity: 0; transition: opacity .2s; }
        .model-list button.active .arrow { opacity: 1; }
        
        .rotator { display: flex; align-items: center; gap: 14px; margin-top: 10px; font-family: var(--mono); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--mute); }
        .rotator .track { flex: 1; height: 1px; background: var(--line); position: relative; }
        .rotator .track::after { content: ""; position: absolute; inset: 0; background: var(--ink); transition: width 1.2s linear; }
        .rotator button { width: 28px; height: 28px; border: 1px solid var(--line); border-radius: 50%; display: grid; place-items: center; }

        .act-cta {
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
          margin-top: 64px; padding: 28px 40px; background: linear-gradient(180deg, #E8553E, var(--accent)); color: white;
          border: 1px solid #FF6B54; border-radius: 16px;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 15px 35px rgba(212, 65, 42, 0.4), 0 5px 15px rgba(0,0,0,0.2);
          transition: transform .3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .3s ease; text-decoration: none; font-weight: 600;
        }
        .act-cta:hover { box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), 0 25px 45px rgba(212, 65, 42, 0.6), 0 10px 20px rgba(0,0,0,0.3); transform: translateY(-4px) scale(1.01); }
        .cta-l { display: flex; flex-direction: column; gap: 4px; }
        .cta-step { font-family: var(--mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; opacity: .5; }
        .cta-title { font-family: var(--sans); font-size: clamp(28px, 3.4vw, 44px); font-weight: 500; letter-spacing: -.02em; line-height: 1; }
        .cta-r { font-family: var(--mono); font-size: 13px; letter-spacing: .18em; text-transform: uppercase; }

        @media (max-width: 900px) {
          .showroom { grid-template-columns: 1fr; gap: 16px; min-height: auto; }
          .act-cta { flex-direction: column; text-align: left; align-items: flex-start; }
          #act-car { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>
      
      <div className="car-head">
        <div>
          <div className="eyebrow">02 / Car · <span>Flotte 24 véhicules</span></div>
          <h2>Showroom<br/><em>— à la demande.</em></h2>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)', textAlign: 'right', lineHeight: 1.9 }}>
          <div>Pick-up · Gennevilliers</div>
          <div>Retour · 24h · 48h · 7j</div>
          <div>Dépôt · 500 €</div>
        </div>
      </div>

      <div className="showroom">
        <div className="showroom-left">
          <div className="num-tag">— Sélection / 07</div>
          <div className="model-list">
            {MODELS.map((model, idx) => (
              <button 
                key={idx} 
                className={active === idx ? 'active' : ''} 
                onClick={() => setActive(idx)}
              >
                <span><span className="n">0{idx + 1}</span>{model.name}</span>
                <span className="arrow">→</span>
              </button>
            ))}
          </div>

          <div className="rotator">
            <button>‹</button>
            <div className="track">
              <div style={{ position: 'absolute', inset: 0, background: 'var(--ink)', width: `${(active / 6) * 100}%`, transition: 'width 0.3s ease' }}></div>
            </div>
            <button>›</button>
          </div>
          <div className="num-tag">0{6 + active * 2}8° · 360 TURN</div>
        </div>

        <div className="stage">
          <div className="turntable">
            <div className="turntable-ring"></div>
            <div 
              className="car-plate" 
              style={{ transform: `perspective(800px) rotateY(-${6 + active * 2}deg)` }}
            >
              [ {m.name} · photo 3/4 avant ]
            </div>
            <div className="car-shadow"></div>
          </div>
        </div>

        <div className="spec-col">
          <div className="spec"><div className="k">Puissance</div><div className="v">{m.hp.split(' ')[0]} <small>{m.hp.split(' ')[1]}</small></div></div>
          <div className="spec"><div className="k">0 — 100 km/h</div><div className="v">{m.accel.split(' ')[0]} <small>{m.accel.split(' ')[1]}</small></div></div>
          <div className="spec"><div className="k">Transmission</div><div className="v">{m.trans}</div></div>
          <div className="spec"><div className="k">Tarif / jour</div><div className="v">{m.price.split(' ')[0]} <small>€</small></div></div>
        </div>
      </div>

      <Link href="/login" className="act-cta">
        <span className="cta-l"><span className="cta-step">— Étape suivante</span><span className="cta-title">Réserver cette voiture</span></span>
        <span className="cta-r">{m.price} / jour →</span>
      </Link>
    </section>
  );
}
