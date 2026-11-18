export const RESTAURANT_SLUG = 'marlot-kurucesme';
export const RESTAURANT_NAME = 'Marlot Restorant';
export const RESTAURANT_PHONE = '+905521193095';
export const RESTAURANT_PHONE_DISPLAY = '+90 552 119 30 95';
export const RESTAURANT_LANDLINE = '+902122874000';
export const RESTAURANT_WHATSAPP = '+905521193095'; // WhatsApp & Rezervasyon Hattı
export const RESTAURANT_ADDRESS = 'Kuruçeşme Yalı Hattı No: 84, Beşiktaş / İstanbul';

export const RESERVATION_STATUSES = {
  pending: { label: 'Bekliyor', color: 'yellow' },
  confirmed: { label: 'Onaylandı', color: 'green' },
  cancelled: { label: 'İptal', color: 'red' },
  completed: { label: 'Tamamlandı', color: 'blue' },
  no_show: { label: 'Gelmedi', color: 'gray' },
} as const;

export type ReservationStatus = keyof typeof RESERVATION_STATUSES;
