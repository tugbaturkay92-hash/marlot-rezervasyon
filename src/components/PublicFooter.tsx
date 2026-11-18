import Link from 'next/link';
import { MapPin, Phone, Clock, Wine, Compass } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-[#0D0406] border-t border-[#C5A059]/30 text-[#B8A7AA] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="font-serif text-2xl font-bold tracking-wider text-[#F8EEEF] block mb-1">
            MARLOT
          </span>
          <span className="text-[10px] text-[#C5A059] tracking-[0.25em] uppercase font-semibold block mb-4">
            Kuruçeşme • Boğaz
          </span>
          <p className="text-xs leading-relaxed text-[#B8A7AA]/90 font-light">
            19. yüzyıl yalı mimarisinde, Boğaz’ın tuzlu esintisi eşliğinde çağdaş lezzet ritüelleri, küratörlü mahzen ve unutulmaz anlar.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-[#F8EEEF] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Compass size={14} className="text-[#C5A059]" /> Keşfedin
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/" className="hover:text-[#C5A059] transition-colors">Anasayfa</Link></li>
            <li><Link href="/menu" className="hover:text-[#C5A059] transition-colors">Tadım Menüsü & Lezzetler</Link></li>
            <li><Link href="/rezervasyon" className="hover:text-[#C5A059] transition-colors">Online Masa Rezervasyonu</Link></li>
            <li><Link href="/admin/giris" className="hover:text-[#C5A059] transition-colors text-white/40">Konsiyerj Girişi</Link></li>
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-xs font-bold text-[#F8EEEF] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Wine size={14} className="text-[#C5A059]" /> Deneyim Alanları
          </h4>
          <ul className="space-y-2 text-xs text-[#B8A7AA]/80">
            <li>• Boğaz Yalı İskelesi (Deniz Kenarı)</li>
            <li>• Tarihi Mahzen & Şarap Kavı</li>
            <li>• Panoramik Boğaz Terası</li>
            <li>• Şömineli Baş Salon</li>
            <li>• Özel VIP Yalı Odası (Private Dining)</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold text-[#F8EEEF] uppercase tracking-widest mb-4">İletişim & Konum</h4>
          <div className="space-y-3 text-xs">
            <div className="flex gap-2.5 items-start">
              <MapPin size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
              <span>Kuruçeşme Yalı Hattı No: 84, Beşiktaş / İstanbul</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Phone size={16} className="text-[#C5A059] shrink-0" />
              <a href="tel:+902122874000" className="hover:text-white transition-colors">
                +90 212 287 40 00
              </a>
            </div>
            <div className="flex gap-2.5 items-center">
              <Clock size={16} className="text-[#C5A059] shrink-0" />
              <span>Haftanın 7 Günü: 12:00 – 00:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#877274]">
        <div>© 2026 Marlot Restorant. Tüm hakları saklıdır.</div>
        <div className="text-[11px] tracking-wider uppercase text-[#C5A059]/80">
          Kuruçeşme • Haute Gastronomie • Boğaz İskelesi
        </div>
      </div>
    </footer>
  );
}
