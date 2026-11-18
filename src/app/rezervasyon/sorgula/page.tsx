'use client';

import { useState } from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import ReservationStatusBadge from '@/components/ReservationStatusBadge';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Search, Sparkles } from 'lucide-react';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  guestCount: number;
  date: string;
  confirmationCode: string;
  status: string;
  notes: string | null;
  table: { name: string } | null;
}

export default function SorgulaPage() {
  const [code, setCode] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    setReservation(null);
    try {
      const res = await fetch(`/api/reservations/check?code=${code.trim().toUpperCase()}`);
      if (!res.ok) {
        setError('Rezervasyon bulunamadı. Lütfen kodu kontrol ediniz.');
        return;
      }
      const data = await res.json();
      setReservation(data);
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-[#14080B] text-[#F8EEEF] pt-20 pb-20">
        <div className="bg-[#1C0D11] border-b border-[#C5A059]/30 py-10">
          <div className="max-w-xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-[#C5A059] text-[11px] font-bold tracking-[0.25em] uppercase mb-1">
              <Sparkles size={12} /> MARLOT KURUÇEŞME • BOĞAZ
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">Rezervasyon Sorgulama</h1>
            <p className="text-xs text-[#B8A7AA] mt-1 font-light">
              Onay kodunuzu girerek masa ve servis saatinizi görüntüleyin.
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-6 mt-10">
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <input
              type="text"
              placeholder="Örn: MLT-7894"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-[#1C0D11] border border-white/15 text-white px-5 py-3.5 rounded-xl text-sm uppercase tracking-widest font-mono focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C5A059] hover:bg-[#d8b375] text-[#14080B] px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-60"
            >
              <Search size={16} />
              {loading ? 'Aranıyor...' : 'Sorgula'}
            </button>
          </form>

          {error && (
            <div className="bg-red-950/40 border border-red-800 text-red-400 p-4 rounded-xl text-xs mb-6 text-center">
              {error}
            </div>
          )}

          {reservation && (
            <div className="bg-[#1C0D11] border border-[#C5A059]/40 rounded-2xl p-7 shadow-xl space-y-4">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="font-serif text-xl font-medium text-white">{reservation.customerName}</span>
                  <div className="text-[#C5A059] text-xs font-mono font-bold mt-1">
                    Kod: {reservation.confirmationCode}
                  </div>
                </div>
                <ReservationStatusBadge status={reservation.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#14080B] p-3 rounded-xl border border-white/5">
                  <div className="text-[#877274] text-[10px] uppercase mb-1">Tarih & Saat</div>
                  <div className="text-white font-medium">
                    {format(new Date(reservation.date), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                  </div>
                </div>
                <div className="bg-[#14080B] p-3 rounded-xl border border-white/5">
                  <div className="text-[#877274] text-[10px] uppercase mb-1">Misafir Sayısı</div>
                  <div className="text-white font-medium">{reservation.guestCount} Kişi</div>
                </div>
              </div>

              {reservation.table && (
                <div className="bg-[#14080B] p-3 rounded-xl border border-white/5 text-xs">
                  <div className="text-[#877274] text-[10px] uppercase mb-1">Ayrılan Masa / Alan</div>
                  <div className="text-[#C5A059] font-medium">{reservation.table.name}</div>
                </div>
              )}

              {reservation.notes && (
                <div className="text-xs text-[#B8A7AA] bg-[#14080B] p-3 rounded-xl border border-white/5">
                  <span className="text-[#877274] text-[10px] uppercase block mb-1">Özel İstekler</span>
                  {reservation.notes}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
