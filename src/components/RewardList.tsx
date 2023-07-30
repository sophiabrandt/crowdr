import { Reward } from '@prisma/client';
import Link from 'next/link';

interface RewardListProps {
  rewards: Reward[];
}

export const RewardList = ({ rewards }: RewardListProps) => (
  <div className="space-y-2">
    {rewards.map((reward) => (
      <div key={reward.id}>
        <Link
          href={`/project/${reward.projectId}`}
          className="py-2"
          key={reward.id}
        >
          <p className="text-gray-800">{reward.name}</p>
          <p className="text-sm text-gray-400">{reward.description}</p>
        </Link>
      </div>
    ))}
  </div>
);
