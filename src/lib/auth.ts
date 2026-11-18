import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export const sessionOptions = {
  password: (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32)
    ? process.env.SESSION_SECRET
    : 'marlot-restorant-kurucesme-bordeaux-opulence-secret-key-2026',
  cookieName: 'marlot-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session;
}
