'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import QRCodeModal from '@/components/QRCodeModal';
import { MapPin, Phone, Clock, Wine, Sparkles, QrCode, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <>
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#14080B] text-[#F8EEEF] overflow-hidden pt-20">
        {/* Background Visual Canvas */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80')`,
          }}
        />
        {/* Warm Ambient Vignette Scrim */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#14080B] via-[#14080B]/80 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#14080B] via-[#3D0011]/30 to-[#14080B]/90" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col justify-center min-h-[calc(100vh-5rem)]">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#C5A059]/40 backdrop-blur-md w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
              Kuruçeşme Yalı Hattı • No: 84
            </span>
          </div>

          {/* Statement */}
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-3">
            Haute Gastronomie & Boğaz İskelesi
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white max-w-4xl leading-[1.1] tracking-tight mb-6">
            Boğaz'ın İncisi Kuruçeşme'de Eşsiz Bir Gastronomi Deneyimi.
          </h1>
          <p className="text-base sm:text-lg text-[#B8A7AA] max-w-2xl font-light leading-relaxed mb-10">
            19. yüzyıl yalı mimarisinde, Boğaz’ın tuzlu esintisi eşliğinde çağdaş lezzet ritüelleri. Doğanın en nadide malzemeleri ve küratörlü tarihi mahzenimizle duyusal bir yolculuk.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/rezervasyon"
              className="inline-flex items-center gap-2 bg-[#3D0011] text-[#F8EEEF] hover:bg-[#5B1324] border border-[#C5A059]/50 px-8 py-4 rounded-lg text-xs font-bold tracking-widest uppercase transition-all shadow-xl shadow-[#3D0011]/60 hover:-translate-y-0.5 group"
            >
              <span>Masa Rezervasyonu Yap</span>
              <ArrowRight size={16} className="text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setShowQRModal(true)}
              className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#d8b375] text-[#14080B] px-8 py-4 rounded-lg text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-0.5"
            >
              <QrCode size={16} />
              <span>QR Kodu Göster & Okut</span>
            </button>

            <Link
              href="/menu"
              className="inline-flex items-center bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/15 px-8 py-4 rounded-lg text-xs font-bold tracking-widest uppercase transition-all hover:-translate-y-0.5"
            >
              Tadım Menüsünü Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="bg-[#1C0D11] border-y border-[#C5A059]/30 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#B8A7AA]">
          <div className="flex items-start gap-4">
            <MapPin size={22} className="text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Konum & Yalı Hattı</div>
              <div className="text-xs leading-relaxed">Kuruçeşme Yalı Hattı No: 84, Beşiktaş / İstanbul</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone size={22} className="text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Konsiyerj & Rezervasyon Hattı</div>
              <a href="tel:+902122874000" className="text-[#C5A059] text-base font-bold hover:underline">
                +90 212 287 40 00
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock size={22} className="text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Servis Saatleri</div>
              <div className="text-xs leading-relaxed">Haftanın 7 Günü: 12:00 – 00:00 (Mutfak Kapanış: 23:00)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Deneyim Alanları (Masalar & Atmosfer) */}
      <section className="py-24 bg-[#14080B] border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
              Özel Atmosferler
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
              Marlot Masaları & Deneyim Alanları
            </h2>
            <p className="text-xs text-[#B8A7AA] leading-relaxed font-light">
              Boğaz'ın tam kıyısındaki yalı iskelesinden, asırlık taş mahzenimize kadar her masa özel bir hikâyeye açılır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'Yalı İskelesi',
                desc: 'Boğaz suyunun hemen kıyısında, dalga sesleri eşliğinde mum ışığında akşam yemeği.',
                tag: 'Deniz Kenarı',
              },
              {
                title: 'Tarihi Mahzen',
                desc: 'Asırlık taş tonozlar arasında, nadide şarap fıçıları ve sommelier seçkisi eşliğinde.',
                tag: 'Şarap Kavı',
              },
              {
                title: 'Panoramik Teras',
                desc: 'Boğaz Köprüsü ve ışıldayan İstanbul silüetine hakim açık hava deneyimi.',
                tag: 'Manzara',
              },
              {
                title: 'Şömineli Baş Salon',
                desc: 'Klasik yalı zarafeti, meşe ateşi ve sıcak bir akşam yemeği atmosferi.',
                tag: 'İç Mekân',
              },
              {
                title: 'VIP Yalı Odası',
                desc: '14 kişiye kadar özel davetler, iş yemekleri ve kişiselleştirilmiş şef servisi.',
                tag: 'Private Dining',
              },
            ].map((area) => (
              <div
                key={area.title}
                className="bg-[#1C0D11] border border-[#C5A059]/30 rounded-xl p-5 flex flex-col justify-between hover:border-[#C5A059] transition-all hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider block mb-2">
                    {area.tag}
                  </span>
                  <h3 className="font-serif text-lg text-white font-medium mb-2">{area.title}</h3>
                  <p className="text-xs text-[#B8A7AA] font-light leading-relaxed">{area.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5">
                  <Link
                    href="/rezervasyon"
                    className="text-[11px] text-[#C5A059] font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
                  >
                    Masa Seç →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sommelier & Degüstasyon Section */}
      <section className="py-24 bg-[#0D0406] border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[#C5A059] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              <Wine size={15} /> Mahzen & Kav
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight mb-6">
              7 Aşamalı İmza Tadım Menüsü & Şarap Eşleşmesi
            </h2>
            <p className="text-[#B8A7AA] text-sm leading-relaxed font-light mb-6">
              Marlot mutfağında her tabak mevsimin ritmine göre şekillenir. Karadeniz kalkanından Ege ahtapotuna, Dry Aged antrikottan kaz ciğerine kadar şefimizin tabakları, baş sommelier’imizin tarihi kavdan seçtiği özel kupajlarla buluşuyor.
            </p>
            <div className="flex flex-wrap gap-3 mb-8 text-xs text-[#F8EEEF]">
              <span className="bg-[#1C0D11] border border-[#C5A059]/30 px-3.5 py-1.5 rounded-full">
                ✓ 7 Aşamalı Tadım Ritüeli
              </span>
              <span className="bg-[#1C0D11] border border-[#C5A059]/30 px-3.5 py-1.5 rounded-full">
                ✓ Grand Cru Eşleşmesi
              </span>
              <span className="bg-[#1C0D11] border border-[#C5A059]/30 px-3.5 py-1.5 rounded-full">
                ✓ Küratörlü Mahzen
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/menu"
                className="bg-[#3D0011] text-[#F8EEEF] border border-[#C5A059]/50 hover:bg-[#5B1324] px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Menüyü İnceleyin
              </Link>
              <button
                onClick={() => setShowQRModal(true)}
                className="border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#14080B] px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5"
              >
                <QrCode size={14} /> QR Menü
              </button>
            </div>
          </div>

          <div className="bg-[#1C0D11] border border-[#C5A059]/30 rounded-2xl p-8 shadow-2xl">
            <span className="text-[10px] text-[#C5A059] font-bold tracking-widest uppercase block mb-2">
              Akşam Servisi Önceliği
            </span>
            <h3 className="font-serif text-2xl text-white font-medium mb-3">Masanızı Şimdiden Ayırtın</h3>
            <p className="text-xs text-[#B8A7AA] leading-relaxed font-light mb-6">
              Özellikle Yalı İskelesi ve Mahzen masaları sınırlı sayıdadır. Rezervasyonunuz konsiyerj ekibimiz tarafından anında teyit edilmektedir.
            </p>
            <div className="space-y-3 mb-6 text-xs text-[#B8A7AA]">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Kıyafet Kuralı (Dress Code)</span>
                <span className="text-[#C5A059] font-semibold">Smart Casual & Şık</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Vale Hizmeti</span>
                <span className="text-white font-medium">Mevcut (Ücretsiz)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Özel Tekne İskelesi</span>
                <span className="text-white font-medium">Yalıya Denizden Ulaşım</span>
              </div>
            </div>
            <Link
              href="/rezervasyon"
              className="w-full block text-center bg-[#C5A059] hover:bg-[#d8b375] text-[#14080B] py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors shadow-lg"
            >
              Online Rezervasyon Başlat
            </Link>
          </div>
        </div>
      </section>

      {/* QR Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title="Marlot Restorant QR Menü"
        subtitle="Masanızda otururken telefonunuzun kamerasıyla bu QR kodu okutarak menümüzü ve şarap kavımızı doğrudan telefonunuzda açın."
      />

      <PublicFooter />
    </>
  );
}
