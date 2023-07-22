import { cookies } from 'next/dist/client/components/headers';
import { db } from '@/lib/db';
import { getUserFromCookie } from './auth';

export const getUser = async () => {
  return await getUserFromCookie(cookies(), db);
};
