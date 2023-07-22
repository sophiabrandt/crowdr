import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import { Card } from './Card';
import { db } from '@/lib/db';
import { Button } from './Button';

const getData = async () => {
  const user = await getUserFromCookie(cookies(), db);
  return user;
};

export const Greetings = async () => {
  const user = await getData();

  return user ? (
    <Card className="relative w-full py-4">
      <div className="mb-4">
        <h1 className="mb-4 text-3xl font-bold text-gray-700">
          Hello, {user.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today&#39;s Schedule</Button>
      </div>
    </Card>
  ) : null;
};
