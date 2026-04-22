'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { FiArrowLeft, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email/password login logic
    console.log('Login:', { email, password });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      setErrorMsg('Impossible de se connecter avec Google');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setErrorMsg('Apple Sign In non configuré pour le moment');
  };

  return (
    <div className="min-h-screen bg-[#F4F2ED] text-[#0A0A0A] flex flex-col font-sans">
      <style jsx>{`
        .input-furtif {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(10, 10, 10, 0.2);
          padding: 12px 0 12px 40px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s;
        }
        .input-furtif:focus {
          border-bottom-color: var(--accent, #D4412A);
        }
        .label-furtif {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8A8A85;
          margin-bottom: 8px;
          display: block;
        }
        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 16px;
          border: 1px solid rgba(10, 10, 10, 0.1);
          background: transparent;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn-social:hover {
          background: rgba(10, 10, 10, 0.03);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Top Header */}
      <div className="p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[#8A8A85] hover:text-[#0A0A0A] transition-colors">
          <FiArrowLeft />
          Retour
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3">Bienvenue<span style={{ color: 'var(--accent, #D4412A)' }}>.</span></h1>
            <p className="text-[#8A8A85] font-mono text-[11px] uppercase tracking-widest">Connectez-vous à l'Atelier</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 border border-[var(--accent)] text-[var(--accent)] text-sm font-mono text-center">
              {errorMsg}
            </div>
          )}

          {/* Social */}
          <div className="flex flex-col gap-3 mb-8">
            <button onClick={handleGoogleSignIn} disabled={loading} className="btn-social">
              <FaGoogle className="text-lg" />
              {loading ? "Connexion..." : "Continuer avec Google"}
            </button>
            <button onClick={handleAppleSignIn} className="btn-social">
              <FaApple className="text-xl" />
              Continuer avec Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="font-mono text-[10px] text-[#8A8A85] tracking-widest uppercase">OU</div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="relative">
              <label className="label-furtif">Email</label>
              <div className="relative">
                <FiMail className="absolute left-0 top-1/2 -translate-y-1/2 text-[#8A8A85]" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-furtif"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <label className="label-furtif !mb-0">Mot de passe</label>
                <Link href="#" className="font-mono text-[10px] text-[var(--accent,#D4412A)] hover:underline uppercase tracking-wide">
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-0 top-1/2 -translate-y-1/2 text-[#8A8A85]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-furtif pt-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A8A85] hover:text-[#0A0A0A]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group mt-2">
              <input type="checkbox" className="accent-[var(--accent,#D4412A)] w-4 h-4" defaultChecked />
              <span className="text-sm text-[#8A8A85] group-hover:text-[#0A0A0A] transition-colors">Se souvenir de moi</span>
            </label>

            <button
              type="submit"
              disabled={!email || !password}
              className="mt-4 w-full bg-[#0A0A0A] text-white py-4 px-6 font-medium text-lg tracking-wide disabled:opacity-50 hover:bg-[var(--accent,#D4412A)] transition-colors"
            >
              Se connecter
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center text-sm">
            <span className="text-[#8A8A85]">Pas encore de compte ? </span>
            <Link href="/signup" className="font-medium hover:text-[var(--accent,#D4412A)] transition-colors border-b border-transparent hover:border-current">
              Créer un compte
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[10px] font-mono text-[#8A8A85] tracking-wide uppercase leading-relaxed">
              En continuant, vous acceptez nos <Link href="#" className="hover:text-black hover:underline">CGV</Link><br/>
              et notre <Link href="#" className="hover:text-black hover:underline">Politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
