import { Card } from './Card';
import { Button } from './Button';
import { User } from '@prisma/client';

interface GreetingsDisplayProps {
  user: User;
}

export const GreetingsDisplay = ({ user }: GreetingsDisplayProps) => (
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
);
