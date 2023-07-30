import { getRewards } from '@/lib/get-data';
import { RewardCard } from './RewardCard';
import { ProjectWithRewards } from '@/helpers/project';

interface RewardCardContainerProps {
  project?: ProjectWithRewards;
}

const fetchRewards = async (project?: ProjectWithRewards) => {
  if (project) {
    return project.rewards;
  }

  try {
    return await getRewards();
  } catch (err) {
    console.error(
      `No rewards found: ${
        err instanceof Error ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const RewardCardContainer = async ({
  project,
}: RewardCardContainerProps) => {
  const rewards = (await fetchRewards(project)) ?? [];

  const title = project ? project.name : 'My rewards';
  return <RewardCard title={title} rewards={rewards} projectId={project?.id} />;
};
