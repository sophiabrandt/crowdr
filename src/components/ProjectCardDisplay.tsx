import clsx from 'clsx';
import { Card } from './Card';
import { ProjectWithRewards, format } from '@/helpers/project';
import { REWARD_STATUS, Reward } from '@prisma/client';

interface ProjectCardDisplayProps {
  project: ProjectWithRewards;
}

export const ProjectCardDisplay = ({ project }: ProjectCardDisplayProps) => {
  const receivedCount = project.rewards.filter(
    (reward: Reward) => reward.status === REWARD_STATUS.RECEIVED
  ).length;
  const rewardsCount = project.rewards.length;

  const progress =
    rewardsCount > 0 ? Math.ceil((receivedCount / rewardsCount) * 100) : 0;

  return (
    <Card className="!px-6 !py-8 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      <div>
        <span className="text-sm text-gray-300">
          {format(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {receivedCount}/{project.rewards.length} received
        </span>
      </div>
      <div>
        <div className="mb-2 h-2 w-full rounded-full bg-violet-200">
          <div
            className={clsx(
              'h-full rounded-full bg-violet-600 text-center text-xs text-white'
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-600">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};
