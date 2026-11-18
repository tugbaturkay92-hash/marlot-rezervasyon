'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, User, Compass, Sparkles } from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

interface Slot {
  time: string;
  available: boolean;
}

const DINING_AREAS = [
  { id: 'all', name: 'Farketmez (En İyi Uygun Masa)' },
  { id: 'iskele', name: 'Boğaz Yalı İskelesi (Deniz Kenarı)' },
  { id: 'mahzen', name: 'Tarihi Mahzen & Şarap Kavı İçi' },
  { id: 'teras', name: 'Panoramik Boğaz Terası' },
  { id: 'salon', name: 'Şömineli Baş Salon' },
  { id: 'vip', name: 'Özel VIP Yalı Odası (Private Dining)' },
];

export default function ReservasyonPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [preferredArea, setPreferredArea] = useState('all');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Calendar state
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(calendarMonth.getFullYear(), calendarMonth.getMonth());
  const firstDay = getFirstDayOfMonth(calendarMonth.getFullYear(), calendarMonth.getMonth());
  const adjustedFirstDay = (firstDay + 6) % 7;

  const handleDateSelect = async (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime('');
    setStep(2);
    setSlotsLoading(true);
    try {
      const res = await fetch(`/api/reservations/available-slots?date=${dateStr}&guests=${guestCount}`);
      const data = await res.json();
      setSlots(data);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleGuestConfirm = () => {
    setStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.customerPhone.trim()) {
      setError('Ad soyad ve telefon numarası zorunludur.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const fullNotes = preferredArea !== 'all'
        ? `[Tercih Edilen Alan: ${DINING_AREAS.find((a) => a.id === preferredArea)?.name}] ${form.notes}`.trim()
        : form.notes;

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          guestCount,
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          customerEmail: form.customerEmail,
          notes: fullNotes,
        }),
      });
      if (!res.ok) throw new Error('Hata');
      const data = await res.json();
      router.push(
        `/rezervasyon/basarili?code=${data.confirmationCode}&date=${selectedDate}&time=${selectedTime}&guests=${guestCount}&name=${encodeURIComponent(form.customerName)}`
      );
    } catch {
      setError('Rezervasyon oluşturulamadı. Lütfen konsiyerj hattımız ile iletişime geçiniz: +90 212 287 40 00');
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = ['Tarih', 'Saat', 'Masa & Misafir', 'İletişim'];
  const stepIcons = [Calendar, Clock, Users, User];

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-[#14080B] text-[#F8EEEF] pt-20 pb-20">
        {/* Banner */}
        <div className="bg-[#1C0D11] border-b border-[#C5A059]/30 py-10">
          <div className="max-w-3xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-[#C5A059] text-xs font-bold tracking-[0.25em] uppercase mb-1">
              <Sparkles size={13} /> MARLOT KURUÇEŞME • BOĞAZ
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white">Online Masa Rezervasyonu</h1>
            <p className="text-xs text-[#B8A7AA] mt-1 font-light">
              Yalı İskelesi, Tarihi Mahzen veya Boğaz Terası'nda yerinizi ayırtın. Konsiyerj ekibimiz anında onay iletir.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 mt-10">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10">
            {stepLabels.map((label, i) => {
              const StepIcon = stepIcons[i];
              const stepNum = (i + 1) as Step;
              const done = step > stepNum;
              const active = step === stepNum;
              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-all ${
                      done
                        ? 'bg-[#C5A059] text-[#14080B]'
                        : active
                        ? 'bg-[#3D0011] text-[#C5A059] border-2 border-[#C5A059] shadow-lg shadow-[#3D0011]/80 ring-4 ring-[#C5A059]/20'
                        : 'bg-[#1C0D11] text-[#877274] border border-white/10'
                    }`}
                  >
                    {done ? '✓' : <StepIcon size={18} />}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:block tracking-wide uppercase ${
                      active ? 'text-[#C5A059]' : 'text-[#877274]'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step 1: Tarih */}
          {step === 1 && (
            <div className="bg-[#1C0D11] border border-[#C5A059]/30 rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-white">Rezervasyon Tarihi Seçin</h2>
                  <p className="text-xs text-[#B8A7AA] mt-0.5">Önümüzdeki 60 gün için rezervasyon kabul edilmektedir.</p>
                </div>
              </div>

              {/* Calendar nav */}
              <div className="flex justify-between items-center mb-6 px-2">
                <button
                  onClick={() =>
                    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))
                  }
                  className="p-2 text-[#B8A7AA] hover:text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-30"
                  disabled={calendarMonth <= new Date(today.getFullYear(), today.getMonth(), 1)}
                  aria-label="Önceki Ay"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-serif text-lg text-white capitalize font-medium">
                  {format(calendarMonth, 'MMMM yyyy', { locale: tr })}
                </span>
                <button
                  onClick={() =>
                    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))
                  }
                  className="p-2 text-[#B8A7AA] hover:text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-30"
                  disabled={calendarMonth >= addDays(today, 60)}
                  aria-label="Sonraki Ay"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map((d) => (
                  <div key={d} className="text-center text-[#877274] text-xs font-bold py-2 uppercase tracking-wider">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dateObj = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                  const isPast = isBefore(dateObj, startOfDay(today));
                  const isFuture = dateObj > addDays(today, 60);
                  const isSelected = selectedDate === dateStr;
                  const isDisabled = isPast || isFuture;

                  return (
                    <button
                      key={day}
                      onClick={() => !isDisabled && handleDateSelect(dateStr)}
                      disabled={isDisabled}
                      className={`aspect-square rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#14080B] font-bold shadow-lg scale-105'
                          : isDisabled
                          ? 'text-[#44383A] cursor-not-allowed opacity-40'
                          : 'text-[#F8EEEF] hover:bg-[#3D0011] hover:text-[#C5A059] border border-white/5'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Saat */}
          {step === 2 && (
            <div className="bg-[#1C0D11] border border-[#C5A059]/30 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setStep(1)}
                  className="p-2 text-[#B8A7AA] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-white">Servis Saati Seçin</h2>
                  <p className="text-xs text-[#C5A059] mt-0.5 font-medium">
                    {selectedDate && format(new Date(selectedDate), 'd MMMM yyyy, EEEE', { locale: tr })}
                  </p>
                </div>
              </div>

              {slotsLoading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-12 text-[#B8A7AA] text-sm font-light">
                  Bu tarihte uygun saat dilimi bulunamadı. Lütfen başka bir gün seçin veya konsiyerj hattımızla iletişime geçin.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      onClick={() => s.available && handleTimeSelect(s.time)}
                      disabled={!s.available}
                      className={`py-3.5 px-2 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                        selectedTime === s.time
                          ? 'bg-[#C5A059] text-[#14080B] border-[#C5A059] shadow-lg'
                          : s.available
                          ? 'bg-[#14080B] text-[#F8EEEF] border-white/10 hover:border-[#C5A059] hover:bg-[#3D0011]'
                          : 'bg-white/5 text-[#544244] border-transparent cursor-not-allowed opacity-40 line-through'
                      }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Misafir Sayısı & Tercih Edilen Alan */}
          {step === 3 && (
            <div className="bg-[#1C0D11] border border-[#C5A059]/30 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setStep(2)}
                  className="p-2 text-[#B8A7AA] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-white">Misafir Sayısı & Atmosfer</h2>
                  <p className="text-xs text-[#C5A059] mt-0.5">
                    {selectedDate && format(new Date(selectedDate), 'd MMMM yyyy', { locale: tr })} — Saat {selectedTime}
                  </p>
                </div>
              </div>

              {/* Guest Count */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#B8A7AA] uppercase tracking-wider mb-3">
                  Misafir Sayısı
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map((n) => (
                    <button
                      key={n}
                      onClick={() => setGuestCount(n)}
                      className={`w-12 h-12 rounded-xl text-sm font-bold transition-all border ${
                        guestCount === n
                          ? 'bg-[#C5A059] text-[#14080B] border-[#C5A059] shadow-lg scale-105'
                          : 'bg-[#14080B] text-[#F8EEEF] border-white/10 hover:border-[#C5A059]/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#877274] mt-2 font-light">
                  14 kişiden büyük grup davetleriniz için lütfen doğrudan konsiyerjimizle iletişime geçiniz.
                </p>
              </div>

              {/* Area Preference */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#B8A7AA] uppercase tracking-wider mb-3">
                  Tercih Edilen Deneyim Alanı
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DINING_AREAS.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setPreferredArea(area.id)}
                      className={`p-3.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                        preferredArea === area.id
                          ? 'bg-[#3D0011] text-[#F8EEEF] border-[#C5A059] ring-2 ring-[#C5A059]/20'
                          : 'bg-[#14080B] text-[#B8A7AA] border-white/10 hover:border-white/20'
                      }`}
                    >
                      {area.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGuestConfirm}
                className="w-full bg-[#C5A059] hover:bg-[#d8b375] text-[#14080B] py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-lg"
              >
                İletişim Bilgilerine Geç →
              </button>
            </div>
          )}

          {/* Step 4: Bilgiler & Onay */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="bg-[#1C0D11] border border-[#C5A059]/30 rounded-2xl p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="p-2 text-[#B8A7AA] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h2 className="font-serif text-2xl font-normal text-white">İletişim & Konuk Bilgileri</h2>
                  <p className="text-xs text-[#C5A059] mt-0.5">
                    {selectedDate && format(new Date(selectedDate), 'd MMMM yyyy', { locale: tr })} • Saat {selectedTime} • {guestCount} Kişi
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#B8A7AA] uppercase tracking-wider mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Selim Yılmaz"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full bg-[#14080B] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#B8A7AA] uppercase tracking-wider mb-2">
                    Telefon Numarası *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    className="w-full bg-[#14080B] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#B8A7AA] uppercase tracking-wider mb-2">
                  E-posta Adresi (İsteğe Bağlı)
                </label>
                <input
                  type="email"
                  placeholder="ornek@domain.com"
                  value={form.customerEmail}
                  onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                  className="w-full bg-[#14080B] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#B8A7AA] uppercase tracking-wider mb-2">
                  Özel İstekler / Notlar / Alerji Bilgisi
                </label>
                <textarea
                  rows={3}
                  placeholder="Yıldönümü, doğum günü kutlaması, deniz kenarı masa talebi veya gıda alerjisi gibi detaylar..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-[#14080B] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {error && <div className="text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-800">{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#3D0011] hover:bg-[#5B1324] border border-[#C5A059]/60 text-[#F8EEEF] py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-xl shadow-[#3D0011]/80 disabled:opacity-50"
              >
                {submitting ? 'Rezervasyon Gönderiliyor...' : 'Rezervasyonu Onayla & Tamamla'}
              </button>

              <p className="text-[11px] text-[#877274] text-center font-light leading-relaxed">
                Rezervasyonunuz konsiyerj ekibimize iletilir ve WhatsApp üzerinden bilgilendirme iletilir.
              </p>
            </form>
          )}
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
