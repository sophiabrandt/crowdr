import { Reward } from '@prisma/client';
import { Card } from './Card';
import { Button } from './Button';
import Link from 'next/link';

interface RewardCardDisplayProps {
  rewards: Reward[];
}

export const RewardCardDisplay = ({ rewards }: RewardCardDisplayProps) => {
  return (
    <Card className="mx-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl text-gray-600">My Rewards</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Add New
          </Button>
        </div>
      </div>
      <div>
        {!!rewards.length ? (
          <div>
            {rewards.map((reward) => (
              <Link
                href={`/project/${reward.projectId}`}
                className="py-2"
                key={reward.id}
              >
                <p className="text-gray-800">{reward.name}</p>
                <p className="text-sm text-gray-400">{reward.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-800">
              You have added no projects with rewards yet
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
