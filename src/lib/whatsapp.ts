export function buildWhatsAppAppUrl(phone: string, message: string): string {
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
    cleanPhone = '90' + cleanPhone.slice(1);
  } else if (cleanPhone.length === 10) {
    cleanPhone = '90' + cleanPhone;
  }
  return `whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
    cleanPhone = '90' + cleanPhone.slice(1);
  } else if (cleanPhone.length === 10) {
    cleanPhone = '90' + cleanPhone;
  }
  return `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppWebUrl(phone: string, message: string): string {
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
    cleanPhone = '90' + cleanPhone.slice(1);
  } else if (cleanPhone.length === 10) {
    cleanPhone = '90' + cleanPhone;
  }
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
}

export function getConfirmationMessage(data: {
  customerName: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  code: string;
}): string {
  return `Sayın ${data.customerName},\n\nMarlot Restorant (Kuruçeşme • Boğaz) masa rezervasyonunuz onaylanmıştır. ✨\n\n📅 Tarih: ${data.date}\n🕐 Saat: ${data.time}\n👥 Kişi: ${data.guests} Misafir\n🔑 Rezervasyon Kodu: ${data.code}\n📍 Adres: Kuruçeşme Yalı Hattı No: 84, Beşiktaş / İstanbul\n\nSizi ve değerli konuklarınızı Boğaz kıyısındaki gastronomi ritüelimizde ağırlamaktan onur duyarız.\n\nKonsiyerj & İletişim: +90 212 287 40 00`;
}

export function getReminderMessage(data: {
  customerName: string;
  restaurantName: string;
  time: string;
  guests: number;
  code: string;
}): string {
  return `Sayın ${data.customerName},\n\nYarın saat ${data.time}'da Marlot Restorant masa rezervasyonunuz bulunmaktadır.\n\n👥 ${data.guests} Misafir\n🔑 Rezervasyon Kodu: ${data.code}\n📍 Kuruçeşme Yalı Hattı No: 84\n\nSizi ağırlamak için sabırsızlanıyoruz.\nKonsiyerj: +90 212 287 40 00`;
}

export function getCancellationMessage(data: {
  customerName: string;
  date: string;
  reservationUrl: string;
}): string {
  return `Sayın ${data.customerName},\n\n${data.date} tarihli Marlot Restorant rezervasyonunuz isteğiniz üzerine iptal edilmiştir.\n\nYeni bir deneyim için rezervasyon: ${data.reservationUrl}\n\nİyi günler dileriz.`;
}
