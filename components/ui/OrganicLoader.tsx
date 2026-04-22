'use client';

export function OrganicLoader() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="goo7">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -12" />
          </filter>
        </defs>
      </svg>

      <div className="l7">
        <i className="a"></i>
        <i className="b"></i>
      </div>

      <style jsx>{`
        .l7 {
          filter: url(#goo7);
          position: relative;
          width: 160px;
          height: 80px;
        }
        .l7 i {
          position: absolute;
          top: 50%;
          width: 46px;
          height: 46px;
          margin-top: -23px;
          background: var(--ink);
          border-radius: 50%;
        }
        .l7.dark i {
          background: #F4F2ED;
        }
        .l7 i.a {
          left: 0;
          animation: merge7 2.4s ease-in-out infinite;
        }
        .l7 i.b {
          right: 0;
          animation: merge7b 2.4s ease-in-out infinite;
        }
        @keyframes merge7 {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(58px) scale(0.8); }
        }
        @keyframes merge7b {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(-58px) scale(0.8); }
        }
      `}</style>
    </>
  );
}
