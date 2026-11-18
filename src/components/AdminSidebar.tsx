'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  UtensilsCrossed,
  TableProperties,
  Settings,
  LogOut,
  Wine,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/rezervasyonlar', label: 'Rezervasyonlar', icon: CalendarCheck },
  { href: '/admin/menu', label: 'Tadım & Menü', icon: UtensilsCrossed },
  { href: '/admin/masalar', label: 'Masalar & QR Kodlar', icon: TableProperties },
  { href: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/giris');
  };

  return (
    <aside className="w-64 min-h-screen bg-[#14080B] flex flex-col border-r border-[#C5A059]/25">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#C5A059]/20">
        <Link href="/admin" className="font-serif text-lg font-bold tracking-widest text-[#F8EEEF] block">
          MARLOT
        </Link>
        <div className="text-[#C5A059] text-[10px] tracking-[0.2em] uppercase font-semibold mt-0.5">
          Kuruçeşme Konsiyerj
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
              isActive(href, exact)
                ? 'bg-[#3D0011] text-[#F8EEEF] border border-[#C5A059]/60 shadow-md shadow-[#3D0011]/80'
                : 'text-[#B8A7AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={16} className={isActive(href, exact) ? 'text-[#C5A059]' : ''} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Public Site Link & Logout */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 text-xs text-[#C5A059] rounded-lg transition-colors"
        >
          Canlı Siteyi Aç ↗
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#877274] hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors w-full"
        >
          <LogOut size={15} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
