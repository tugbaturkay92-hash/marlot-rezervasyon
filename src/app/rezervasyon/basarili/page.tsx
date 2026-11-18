import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { CheckCircle, Wine, Sparkles } from 'lucide-react';
import { getConfirmationMessage } from '@/lib/whatsapp';
import WhatsAppShareBox from '@/components/WhatsAppShareBox';
import { RESTAURANT_PHONE, RESTAURANT_NAME } from '@/lib/constants';

interface Props {
  searchParams: Promise<{ code?: string; date?: string; time?: string; guests?: string; name?: string }>;
}

export default async function BasariliPage({ searchParams }: Props) {
  const { code, date, time, guests, name } = await searchParams;

  const waMessage = code && date && time && guests
    ? getConfirmationMessage({
        customerName: name ? decodeURIComponent(name) : 'Değerli Misafirimiz',
        restaurantName: RESTAURANT_NAME,
        date: date,
        time: time,
        guests: Number(guests),
        code: code,
      })
    : '';

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-[#14080B] text-[#F8EEEF] pt-24 pb-20 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-[#1C0D11] border border-[#C5A059]/40 rounded-2xl p-8 sm:p-10 text-center shadow-2xl">
          <div className="flex justify-center mb-5">
            <div className="p-3 bg-[#3D0011] rounded-full border border-[#C5A059]/50 shadow-inner">
              <CheckCircle className="text-[#C5A059]" size={48} />
            </div>
          </div>

          <span className="text-[10px] text-[#C5A059] font-bold tracking-[0.25em] uppercase block mb-1">
            MARLOT KONSİYERJ
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
            Rezervasyonunuz Alındı
          </h1>
          <p className="text-[#B8A7AA] text-xs font-light mb-8 leading-relaxed">
            Talebiniz başarıyla kaydedildi. Konsiyerj ekibimiz rezervasyonunuzu anında teyit etmiştir.
          </p>

          {code && (
            <div className="bg-[#14080B] border border-[#C5A059]/40 rounded-xl p-5 mb-6 shadow-inner">
              <div className="text-[#C5A059] text-[11px] font-bold uppercase tracking-widest mb-1">
                Rezervasyon Onay Kodu
              </div>
              <div className="text-white text-3xl font-serif font-bold tracking-widest text-[#F8EEEF]">
                {code}
              </div>
              <p className="text-[#877274] text-[11px] mt-1.5 font-light">
                Girişte konsiyerj görevlimize bu kodu iletebilirsiniz.
              </p>
            </div>
          )}

          {date && time && guests && (
            <div className="grid grid-cols-3 gap-3 mb-8 text-xs">
              <div className="bg-[#14080B] rounded-xl p-3 border border-white/5">
                <div className="text-[#877274] text-[10px] uppercase tracking-wider mb-1">Tarih</div>
                <div className="text-white font-medium">{date}</div>
              </div>
              <div className="bg-[#14080B] rounded-xl p-3 border border-white/5">
                <div className="text-[#877274] text-[10px] uppercase tracking-wider mb-1">Saat</div>
                <div className="text-white font-medium">{time}</div>
              </div>
              <div className="bg-[#14080B] rounded-xl p-3 border border-white/5">
                <div className="text-[#877274] text-[10px] uppercase tracking-wider mb-1">Misafir</div>
                <div className="text-white font-medium">{guests} Kişi</div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3.5">
            {waMessage && (
              <WhatsAppShareBox phone={RESTAURANT_PHONE} message={waMessage} />
            )}

            <Link
              href="/rezervasyon/sorgula"
              className="w-full bg-[#14080B] border border-[#C5A059]/30 text-[#C5A059] py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center hover:bg-[#3D0011] transition-all"
            >
              Rezervasyonumu Sorgula
            </Link>

            <Link
              href="/"
              className="w-full text-[#877274] py-2 text-xs text-center hover:text-white transition-colors"
            >
              ← Anasayfaya Dön
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
