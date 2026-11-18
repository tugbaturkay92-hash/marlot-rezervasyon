import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Marlot Restorant Seed başlıyor...');

  // Marlot restoranını bul veya oluştur
  let restaurant = await prisma.restaurant.findUnique({
    where: { slug: 'marlot-kurucesme' },
  });

  if (restaurant) {
    // Mevcut Marlot verilerini temizle
    await prisma.reservation.deleteMany({ where: { restaurantId: restaurant.id } });
    await prisma.menuItem.deleteMany({ where: { category: { restaurantId: restaurant.id } } });
    await prisma.menuCategory.deleteMany({ where: { restaurantId: restaurant.id } });
    await prisma.table.deleteMany({ where: { restaurantId: restaurant.id } });

    restaurant = await prisma.restaurant.update({
      where: { id: restaurant.id },
      data: {
        name: 'Marlot Restorant',
        phone: '+902122874000',
        address: 'Kuruçeşme Yalı Hattı No: 84, Beşiktaş / İstanbul',
        description: '19. yüzyıl Boğaz yalı mimarisinde, çağdaş haute gastronomie lezzet ritüelleri, küratörlü tarihi şarap mahzeni ve büyüleyici Boğaz manzarası.',
        primaryColor: '#3D0011',
        openingTime: '12:00',
        closingTime: '00:00',
        slotDuration: 120,
        maxGuests: 14,
        maxAdvanceDays: 60,
      },
    });
  } else {
    restaurant = await prisma.restaurant.create({
      data: {
        name: 'Marlot Restorant',
        slug: 'marlot-kurucesme',
        phone: '+902122874000',
        address: 'Kuruçeşme Yalı Hattı No: 84, Beşiktaş / İstanbul',
        description: '19. yüzyıl Boğaz yalı mimarisinde, çağdaş haute gastronomie lezzet ritüelleri, küratörlü tarihi şarap mahzeni ve büyüleyici Boğaz manzarası.',
        primaryColor: '#3D0011',
        openingTime: '12:00',
        closingTime: '00:00',
        slotDuration: 120,
        maxGuests: 14,
        maxAdvanceDays: 60,
      },
    });
  }

  // Admin Kullanıcıları (Marlot Konsiyerj)
  const passwordHash = await bcrypt.hash('admin14021400459392*', 10);
  const adminEmails = ['admin@marlot.com', 'konsiyerj@marlot.com'];

  for (const email of adminEmails) {
    const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
    if (!existingAdmin) {
      await prisma.adminUser.create({
        data: {
          email,
          name: 'Marlot Konsiyerj',
          passwordHash,
        },
      });
    }
  }

  // Marlot Masaları (Bölümler)
  const tables = [
    // Boğaz Yalı İskelesi (Deniz Kenarı)
    { name: 'Masa 1 — Yalı İskelesi (Deniz Kenarı)', capacity: 2, location: 'iskele' },
    { name: 'Masa 2 — Yalı İskelesi (Deniz Kenarı)', capacity: 2, location: 'iskele' },
    { name: 'Masa 3 — Yalı İskelesi (Deniz Kenarı)', capacity: 4, location: 'iskele' },
    { name: 'Masa 4 — Yalı İskelesi (Deniz Kenarı)', capacity: 4, location: 'iskele' },

    // Tarihi Mahzen & Şarap Kavı
    { name: 'Masa 5 — Tarihi Mahzen İçi', capacity: 2, location: 'mahzen' },
    { name: 'Masa 6 — Tarihi Mahzen İçi', capacity: 4, location: 'mahzen' },
    { name: 'Masa 7 — Tarihi Mahzen İçi', capacity: 6, location: 'mahzen' },

    // Panoramik Boğaz Terası
    { name: 'Masa 8 — Panoramik Boğaz Terası', capacity: 2, location: 'teras' },
    { name: 'Masa 9 — Panoramik Boğaz Terası', capacity: 4, location: 'teras' },
    { name: 'Masa 10 — Panoramik Boğaz Terası', capacity: 4, location: 'teras' },
    { name: 'Masa 11 — Panoramik Boğaz Terası', capacity: 6, location: 'teras' },

    // Şömineli Baş Salon
    { name: 'Masa 12 — Şömineli Baş Salon', capacity: 2, location: 'salon' },
    { name: 'Masa 13 — Şömineli Baş Salon', capacity: 4, location: 'salon' },
    { name: 'Masa 14 — Şömineli Baş Salon', capacity: 6, location: 'salon' },

    // Özel VIP Yalı Odası
    { name: 'VIP Yalı Odası (Private Dining)', capacity: 14, location: 'vip' },
  ];

  for (const t of tables) {
    await prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        name: t.name,
        capacity: t.capacity,
        location: t.location,
        isActive: true,
      },
    });
  }

  // Marlot Menü Kategorileri ve Gurme Lezzetler
  const categories = [
    {
      name: 'Degüstasyon & Tadım Menüleri',
      sortOrder: 1,
      items: [
        {
          name: 'Şefin 7 Aşamalı İmza Tadım Menüsü',
          description: 'Mevsimsel lezzet yolculuğu: Amuse-bouche, 2 soğuk, 2 sıcak başlangıç, ana yemek ve tatlı ritüeli.',
          price: 3850,
          isPopular: true,
          sortOrder: 1,
        },
        {
          name: '5 Aşamalı Boğaz Deniz Mahsulleri Tadımı',
          description: 'Günlük taze Boğaz balıkları, kabuklular ve safranlı bisque eşliğinde özel deniz seçkisi.',
          price: 3100,
          isPopular: true,
          sortOrder: 2,
        },
        {
          name: 'Sommelier Grand Cru Şarap Eşleşmesi',
          description: 'Her tadım tabağına özel küratörlü tarihi mahzenimizden seçilmiş yerli ve yabancı rezerv şaraplar.',
          price: 1950,
          isPopular: false,
          sortOrder: 3,
        },
      ],
    },
    {
      name: 'Soğuk & Sıcak Başlangıçlar',
      sortOrder: 2,
      items: [
        {
          name: 'Trüflü Deniz Tarağı Karpaçyo',
          description: 'Taze siyah kış trüfü, narenciye emülsiyonu, pembe biber ve fleur de sel.',
          price: 720,
          isPopular: true,
          sortOrder: 1,
        },
        {
          name: 'Közlenmiş Kuzey Ege Ahtapotu',
          description: 'İsli patates püresi, kapari çiçeği, tütsülü paprika yağı ve çıtır kalamar mürekkebi.',
          price: 680,
          isPopular: true,
          sortOrder: 2,
        },
        {
          name: 'Kaz Ciğeri Terin (Foie Gras)',
          description: 'Karamelize mürdüm eriği marmelatı, taze kızarmış brioche ekmeği ve fıstık kıtırı.',
          price: 840,
          isPopular: false,
          sortOrder: 3,
        },
        {
          name: 'İtalyan Burrata & Yabani Kuşkonmaz',
          description: 'Fırınlanmış çam fıstığı, kuru incir sosu ve taze fesleğen infüzyon yağı.',
          price: 540,
          isPopular: false,
          sortOrder: 4,
        },
      ],
    },
    {
      name: 'Boğaz Deniz Ürünleri & İmzalar',
      sortOrder: 3,
      items: [
        {
          name: 'Fırınlanmış Boğaz Kalkanı',
          description: 'Yabani otlu tereyağı emülsiyonu, safranlı rezene püresi ve fırınlanmış kök sebzeler.',
          price: 1450,
          isPopular: true,
          sortOrder: 1,
        },
        {
          name: 'Izgara Lagos Balığı',
          description: 'Enginar kalbi, taze deniz börülcesi, limonlu kapari velouté sos.',
          price: 1280,
          isPopular: false,
          sortOrder: 2,
        },
        {
          name: 'Istakozlu Ev Yapımı Tagliolini',
          description: 'Kanada ıstakozu parçaları, taze bisque kreması, kiraz domates ve taze mercanköşk.',
          price: 1350,
          isPopular: true,
          sortOrder: 3,
        },
      ],
    },
    {
      name: 'Kuru Dinlendirilmiş Etler',
      sortOrder: 4,
      items: [
        {
          name: '45 Gün Dinlendirilmiş Dana Antrikot (Dry Aged)',
          description: 'Kemik iliği glazes, trüflü patates terrine ve ızgara yabani mantar tabağı.',
          price: 1390,
          isPopular: true,
          sortOrder: 1,
        },
        {
          name: 'Ağır Ateşte Pişmiş Kuzu İncik',
          description: 'Kereviz kökü püresi, kırmızı şarap çektirmesi ve taze biberiye yağı.',
          price: 980,
          isPopular: false,
          sortOrder: 2,
        },
        {
          name: 'Ördek Göğsü (Magret de Canard)',
          description: 'Vişne sos, karamelize minik arpacık soğan ve parsnip ipeksi püre.',
          price: 920,
          isPopular: false,
          sortOrder: 3,
        },
      ],
    },
    {
      name: 'Mahzen & Şarap Kavı',
      sortOrder: 5,
      items: [
        {
          name: 'Marlot Kırmızı Rezerv (Kadeh)',
          description: 'Fransız meşe fıçılarda 18 ay olgunlaştırılmış Cabernet Sauvignon & Merlot kupajı.',
          price: 480,
          isPopular: true,
          sortOrder: 1,
        },
        {
          name: 'Boğaz Esintisi Beyaz (Kadeh)',
          description: 'Mineral dengesi yüksek, narenciye ve beyaz çiçek notaları taşıyan serinletici gövde.',
          price: 390,
          isPopular: false,
          sortOrder: 2,
        },
        {
          name: 'Prestij Şampanya Brut (Kadeh)',
          description: 'Geleneksel yöntemle üretilmiş, ince köpüklü ve canlı meyve asiditesine sahip şampanya.',
          price: 650,
          isPopular: true,
          sortOrder: 3,
        },
      ],
    },
    {
      name: 'İmza Tatlılar',
      sortOrder: 6,
      items: [
        {
          name: 'Madagaskar Vanilyalı Sıcak Çikolatalı Sufle',
          description: '%70 bitter Valrhona çikolata kalbi, ev yapımı fior di latte dondurması eşliğinde.',
          price: 420,
          isPopular: true,
          sortOrder: 1,
        },
        {
          name: 'Çıtır Milföy & Antep Fıstıklı Ganaj',
          description: 'Karamelize çıtır katlar, ipeksi fıstık ganajı ve taze orman meyveleri.',
          price: 380,
          isPopular: true,
          sortOrder: 2,
        },
        {
          name: 'Fırınlanmış Yanık İncir & Mascarpone',
          description: 'Karakovan lavanta balı, taze ceviz kıtırı ve narenciye kabuğu rendesi.',
          price: 360,
          isPopular: false,
          sortOrder: 3,
        },
      ],
    },
  ];

  for (const cat of categories) {
    const createdCat = await prisma.menuCategory.create({
      data: {
        restaurantId: restaurant.id,
        name: cat.name,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
    });

    for (const item of cat.items) {
      await prisma.menuItem.create({
        data: {
          categoryId: createdCat.id,
          name: item.name,
          description: item.description,
          price: item.price,
          isPopular: item.isPopular,
          isAvailable: true,
          sortOrder: item.sortOrder,
        },
      });
    }
  }

  console.log('Marlot Restorant verileri başarıyla yüklendi!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
