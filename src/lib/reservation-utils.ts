import { format, addMinutes, isAfter, parseISO } from 'date-fns';

export function generateTimeSlots(
  openingTime: string,
  closingTime: string,
  slotDuration: number,
  date: string
): string[] {
  const slots: string[] = [];
  const [openH, openM] = openingTime.split(':').map(Number);
  const [closeH, closeM] = closingTime.split(':').map(Number);

  const [year, month, day] = date.split('-').map(Number);
  let current = new Date(year, month - 1, day, openH, openM, 0, 0);

  const closing = new Date(year, month - 1, day, closeH, closeM, 0, 0);
  if (closeH <= openH) {
    closing.setDate(closing.getDate() + 1);
  }

  // Son slot: kapanış saatinden slotDuration kadar önce başlamalı
  const lastSlotStart = addMinutes(closing, -slotDuration);

  while (!isAfter(current, lastSlotStart)) {
    slots.push(format(current, 'HH:mm'));
    current = addMinutes(current, 30);
  }

  return slots;
}

export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function parseReservationDate(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const d = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return d;
}
