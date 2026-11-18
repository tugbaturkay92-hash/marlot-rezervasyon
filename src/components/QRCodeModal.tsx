'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, QrCode, Download, ExternalLink, Printer } from 'lucide-react';
import Link from 'next/link';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  targetUrl,
  title = 'Marlot Restorant Dijital QR Menü',
  subtitle = 'Masanızda otururken telefonunuzun kamerasıyla bu QR kodu okutarak tadım menümüzü ve şarap kavımızı anında cep telefonunuzda inceleyin.',
}: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const url = targetUrl || (typeof window !== 'undefined' ? `${window.location.origin}/menu` : 'http://localhost:3001/menu');

    QRCode.toDataURL(url, {
      width: 380,
      margin: 2,
      color: {
        dark: '#3D0011',
        light: '#FFFFFF',
      },
    })
      .then((dataUri) => setQrDataUrl(dataUri))
      .catch((err) => console.error('QR code generation failed:', err));
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Marlot Restorant QR Menü</title>
          <style>
            body { font-family: 'Playfair Display', serif, sans-serif; text-align: center; padding: 40px; background: #fff; color: #1e1b1c; }
            h1 { font-size: 28px; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 4px; color: #3d0011; }
            h2 { font-size: 14px; color: #735c00; margin-top: 0; margin-bottom: 24px; letter-spacing: 2px; text-transform: uppercase; }
            img { max-width: 320px; border: 4px solid #3d0011; padding: 12px; border-radius: 12px; }
            p { font-size: 14px; color: #544244; margin-top: 20px; font-family: sans-serif; }
            .footer { font-size: 12px; color: #877274; margin-top: 30px; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <h1>MARLOT</h1>
          <h2>Kuruçeşme • Boğaz • Masa Menüsü</h2>
          <img src="${qrDataUrl}" alt="Marlot QR Kod" />
          <p>Telefonunuzun kamerası ile okutarak menümüzü ve şarap kavımızı inceleyebilirsiniz.</p>
          <div class="footer">Konsiyerj & Rezervasyon: +90 212 287 40 00</div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1C0D11] border border-[#C5A059]/40 rounded-2xl p-6 shadow-2xl text-center text-[#F8EEEF]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="inline-flex items-center justify-center p-3 bg-[#3D0011] text-[#C5A059] border border-[#C5A059]/40 rounded-full mb-3 shadow-inner">
          <QrCode size={26} />
        </div>
        <span className="font-serif text-2xl font-bold tracking-widest text-[#F8EEEF] block">
          MARLOT
        </span>
        <span className="text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-semibold block mb-2">
          Kuruçeşme • Boğaz
        </span>
        <p className="text-xs text-[#B8A7AA] mt-1 mb-5 px-4 leading-relaxed font-light">
          {subtitle}
        </p>

        {/* QR Code Canvas / Image */}
        <div className="bg-white p-4 rounded-xl inline-block shadow-2xl border-4 border-[#C5A059]">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Marlot QR Menü"
              className="w-56 h-56 object-contain"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-gray-500 text-xs">
              QR Kod Hazırlanıyor...
            </div>
          )}
        </div>

        <p className="text-xs text-[#C5A059] font-medium tracking-wider mt-3">
          📱 Telefonunuzun kamerasını buraya tutun
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-[#2D1217] hover:bg-[#3D1A21] text-[#F8EEEF] border border-[#C5A059]/40 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Printer size={15} className="text-[#C5A059]" />
            Yazdır
          </button>
          {qrDataUrl && (
            <a
              href={qrDataUrl}
              download="marlot-restorant-qr-menu.png"
              className="flex items-center justify-center gap-2 bg-[#3D0011] hover:bg-[#5B1324] text-[#F8EEEF] border border-[#C5A059]/50 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              <Download size={15} className="text-[#C5A059]" />
              İndir (PNG)
            </a>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#B8A7AA]">
          <span>Menüyü doğrudan ekranda aç:</span>
          <Link
            href="/menu"
            onClick={onClose}
            className="text-[#C5A059] font-semibold hover:underline inline-flex items-center gap-1"
          >
            Menüye Git <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
