'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, QrCode, Phone } from 'lucide-react';
import QRCodeModal from '@/components/QRCodeModal';

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#14080B]/90 backdrop-blur-xl border-b border-[#C5A059]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col text-left group">
            <span className="font-serif text-2xl font-bold tracking-wider text-[#F8EEEF] group-hover:text-[#C5A059] transition-colors">
              MARLOT
            </span>
            <span className="text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-semibold">
              Kuruçeşme • Boğaz
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden xl:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-[#B8A7AA]">
            <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
            <Link href="/menu" className="hover:text-white transition-colors">Menü</Link>
            <button
              onClick={() => setShowQRModal(true)}
              className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5 uppercase font-semibold text-[#C5A059]"
            >
              <QrCode size={14} />
              QR Menü
            </button>
            <Link href="/rezervasyon" className="hover:text-white transition-colors">Rezervasyon</Link>
          </nav>

          {/* Concierge & CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+905521193095"
              className="flex flex-col text-right pr-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold">Rezervasyon & Bilgi</span>
              <span className="text-xs text-[#F8EEEF] font-medium flex items-center gap-1">
                <Phone size={11} className="text-[#C5A059]" /> +90 552 119 30 95
              </span>
            </a>

            <button
              onClick={() => setShowQRModal(true)}
              className="border border-[#C5A059]/40 text-[#C5A059] px-4 py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-[#C5A059] hover:text-[#14080B] transition-all flex items-center gap-1.5"
            >
              <QrCode size={14} />
              QR Kod
            </button>

            <Link
              href="/rezervasyon"
              className="bg-[#3D0011] text-[#F8EEEF] border border-[#C5A059]/40 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-[#5B1324] hover:border-[#C5A059] transition-all shadow-md shadow-[#3D0011]/50"
            >
              Masa Rezervasyonu
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden text-[#F8EEEF] p-2 hover:text-[#C5A059]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="xl:hidden bg-[#1C0D11] border-t border-[#C5A059]/20 px-6 py-6 flex flex-col gap-5 text-sm font-semibold text-[#B8A7AA] uppercase tracking-widest">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-white">Anasayfa</Link>
            <Link href="/menu" onClick={() => setMenuOpen(false)} className="hover:text-white">Menü</Link>
            <button
              onClick={() => { setMenuOpen(false); setShowQRModal(true); }}
              className="text-left text-[#C5A059] flex items-center gap-2 uppercase font-semibold"
            >
              <QrCode size={16} />
              QR Menü Kodu
            </button>
            <Link href="/rezervasyon" onClick={() => setMenuOpen(false)} className="hover:text-white">Masa Rezervasyonu</Link>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-1 text-xs">
              <span className="text-[#C5A059]">Rezervasyon & Bilgi Hattı</span>
              <a href="tel:+905521193095" className="text-white font-medium">+90 552 119 30 95</a>
            </div>
          </div>
        )}
      </header>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title="Marlot Restorant QR Menü"
        subtitle="Masanızda otururken telefonunuzun kamerasıyla bu QR kodu okutarak tadım menümüzü ve şarap kavımızı anında cep telefonunuzda inceleyin."
      />
    </>
  );
}
