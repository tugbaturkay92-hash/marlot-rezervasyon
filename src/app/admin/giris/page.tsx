'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wine, Lock, Mail } from 'lucide-react';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Giriş başarısız');
        return;
      }
      router.push('/admin');
    } catch {
      setError('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0406] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-serif text-3xl font-bold tracking-widest text-[#F8EEEF] block">
            MARLOT
          </span>
          <span className="text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-semibold block mt-1">
            Kuruçeşme • Boğaz
          </span>
          <div className="text-xs text-[#B8A7AA] mt-2 font-light">Konsiyerj & Yönetim Paneli</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1C0D11] rounded-2xl p-8 border border-[#C5A059]/30 shadow-2xl space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-2">
              Konsiyerj E-posta
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="admin@marlot.com"
                className="w-full bg-[#14080B] border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-2">
              Yönetici Şifresi
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#14080B] border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-800">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3D0011] hover:bg-[#5B1324] border border-[#C5A059]/50 text-[#F8EEEF] py-3.5 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors shadow-lg disabled:opacity-60 mt-3"
          >
            {loading ? 'Giriş yapılıyor...' : 'Panele Giriş Yap'}
          </button>

          <div className="pt-3 text-center text-xs text-[#877274] border-t border-white/10">
            Varsayılan: <span className="text-[#C5A059] font-mono">admin@marlot.com</span>
          </div>
        </form>
      </div>
    </div>
  );
}
