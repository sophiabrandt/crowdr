import { Reward } from '@prisma/client';
import { Card } from './Card';
import { RewardList } from './RewardList';
import { AddReward } from './AddReward';

interface RewardCardProps {
  rewards: Reward[];
  title: string;
  projectId?: string;
}

export const RewardCard = ({ rewards, title, projectId }: RewardCardProps) => {
  return (
    <Card className="mx-2">
      <div className="flex items-center justify-between">
        <div className="mb-2">
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        {projectId && <AddReward projectId={projectId} />}
      </div>
      <div>
        {rewards.length > 0 ? (
          <RewardList rewards={rewards} />
        ) : (
          <p className="text-gray-800">Sorry, no rewards yet</p>
        )}
      </div>
    </Card>
  );
};
