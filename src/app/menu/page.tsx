'use client';

import { useEffect, useState } from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import QRCodeModal from '@/components/QRCodeModal';
import { formatPrice } from '@/lib/utils';
import { Star, X, QrCode, Sparkles, Wine } from 'lucide-react';
import QRCode from 'qrcode';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isPopular: boolean;
  isAvailable: boolean;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrThumbnail, setQrThumbnail] = useState<string>('');

  useEffect(() => {
    fetch('/api/menu/categories')
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0].id);
      })
      .finally(() => setLoading(false));

    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/menu`;
      QRCode.toDataURL(url, {
        width: 140,
        margin: 1,
        color: { dark: '#3D0011', light: '#FFFFFF' },
      })
        .then((uri) => setQrThumbnail(uri))
        .catch(() => {});
    }
  }, []);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-[#14080B] text-[#F8EEEF] pt-20 pb-20">
        {/* Header with QR Section */}
        <div className="bg-[#1C0D11] border-b border-[#C5A059]/30 py-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#C5A059] text-[11px] font-bold tracking-[0.25em] uppercase mb-1.5">
                <Sparkles size={13} /> MARLOT KURUÇEŞME • BOĞAZ
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                Tadım Menüsü & Lezzet Seçkisi
              </h1>
              <p className="text-xs text-[#B8A7AA] mt-1.5 font-light">
                19. yüzyıl yalı mutfağında çağdaş haute gastronomie & küratörlü tarihi şarap mahzeni
              </p>
            </div>

            {/* QR Quick Bar */}
            <div className="flex items-center gap-4 bg-[#14080B] border border-[#C5A059]/40 p-3.5 rounded-xl shadow-xl">
              {qrThumbnail ? (
                <img
                  src={qrThumbnail}
                  alt="Marlot QR Kod"
                  className="w-16 h-16 bg-white p-1 rounded-lg border-2 border-[#C5A059] cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowQRModal(true)}
                  title="Büyütmek için tıklayın"
                />
              ) : (
                <div className="w-16 h-16 bg-white/10 rounded-lg animate-pulse" />
              )}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <QrCode size={14} className="text-[#C5A059]" /> Masa QR Kodu
                </div>
                <div className="text-[11px] text-[#B8A7AA] mt-0.5">Telefonunuzla okutun</div>
                <button
                  onClick={() => setShowQRModal(true)}
                  className="text-xs text-[#C5A059] font-bold hover:underline mt-1 block"
                >
                  Kodu Büyüt & Yazdır →
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">
            {/* Category tabs */}
            <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-hide mb-10 border-b border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-[#3D0011] text-[#F8EEEF] border border-[#C5A059] shadow-md shadow-[#3D0011]/60'
                      : 'bg-[#1C0D11] text-[#B8A7AA] hover:text-white border border-white/10 hover:border-[#C5A059]/40'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Items grid */}
            {currentCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-[#1C0D11] rounded-xl p-6 border border-[#C5A059]/25 hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2.5">
                        <span className="font-serif text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                          {item.name}
                        </span>
                        {item.isPopular && (
                          <span className="inline-flex items-center gap-1 bg-[#3D0011] text-[#C5A059] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C5A059]/40 shrink-0 uppercase tracking-wider">
                            <Star size={9} className="fill-[#C5A059]" /> İmza
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[#B8A7AA] text-xs font-light leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-6 pt-3 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[#C5A059] font-bold text-base tracking-wide">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-[11px] text-[#B8A7AA]/70 group-hover:text-white transition-colors">
                        Detaylar →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#1C0D11] border border-[#C5A059]/40 rounded-2xl p-7 text-[#F8EEEF] shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
              aria-label="Kapat"
            >
              <X size={20} />
            </button>
            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest block mb-1">
              MARLOT HAUTE GASTRONOMIE
            </span>
            <h3 className="font-serif text-2xl font-normal text-white mb-3">{selectedItem.name}</h3>
            {selectedItem.description && (
              <p className="text-[#B8A7AA] text-sm leading-relaxed font-light mb-6">
                {selectedItem.description}
              </p>
            )}
            <div className="text-[#C5A059] text-2xl font-bold mb-6">
              {formatPrice(selectedItem.price)}
            </div>
            <div className="text-xs text-[#B8A7AA] border-t border-white/10 pt-4 flex items-center gap-2">
              <Wine size={16} className="text-[#C5A059] shrink-0" />
              <span>Sommelier önerisi: Tarihi mahzenimizden kadeh eşleşmeleri için servis ekibimize danışabilirsiniz.</span>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
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
