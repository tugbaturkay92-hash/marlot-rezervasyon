import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { formatPrice } from '@/lib/utils';
import { Star, Wine, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ tableId: string }>;
}

export default async function QRPage({ params }: Props) {
  const { tableId } = await params;

  const table = await prisma.table.findUnique({
    where: { id: tableId },
    include: { restaurant: true },
  });

  if (!table) notFound();

  const categories = await prisma.menuCategory.findMany({
    where: { restaurantId: table.restaurantId, isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-[#14080B] text-[#F8EEEF] pt-20 pb-20">
        {/* Table banner */}
        <div className="bg-[#1C0D11] border-b border-[#C5A059]/40 py-8 px-6 text-center shadow-lg">
          <div className="inline-flex items-center gap-1.5 text-[#C5A059] text-[11px] font-bold tracking-[0.25em] uppercase mb-1">
            <Sparkles size={12} /> {table.restaurant.name} • KURUÇEŞME
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">{table.name}</h1>
          <p className="text-xs text-[#B8A7AA] mt-1 font-light">
            Masadan taranan dijital tadım menüsü & sommelier şarap seçkisi
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 mt-10 space-y-12">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="font-serif text-xl text-[#C5A059] font-medium tracking-wide uppercase mb-4 border-b border-[#C5A059]/30 pb-2">
                {cat.name}
              </h2>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-4 bg-[#1C0D11] rounded-xl p-5 border border-[#C5A059]/25 hover:border-[#C5A059] transition-all shadow-md"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif text-base font-medium text-white">{item.name}</span>
                        {item.isPopular && (
                          <span className="inline-flex items-center gap-1 bg-[#3D0011] text-[#C5A059] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#C5A059]/40 uppercase tracking-wider">
                            <Star size={8} className="fill-[#C5A059]" /> İmza
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[#B8A7AA] text-xs font-light leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    <span className="text-[#C5A059] font-bold text-sm shrink-0 tracking-wide">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
