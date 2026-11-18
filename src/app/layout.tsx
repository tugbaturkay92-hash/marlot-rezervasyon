import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marlot Restorant | Kuruçeşme Boğaz • Online Masa Rezervasyonu & QR Menü',
  description: '19. yüzyıl Boğaz yalı mimarisinde haute gastronomie lezzet ritüelleri, küratörlü tarihi şarap mahzeni ve büyüleyici Boğaz manzarası eşliğinde online masa rezervasyonu.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-[#14080B] text-[#F8EEEF] font-sans antialiased selection:bg-[#3D0011] selection:text-[#C5A059]">
        {children}
      </body>
    </html>
  );
}
