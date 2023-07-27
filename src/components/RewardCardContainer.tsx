import { getRewards } from '@/lib/get-data';
import { RewardCardDisplay } from './RewardCardDisplay';

export const RewardCardContainer = async () => {
  try {
    const rewards = await getRewards();
    return <RewardCardDisplay rewards={rewards} />;
  } catch (err) {
    console.error(
      `No rewards found: ${
        err instanceof Error ? err.message : JSON.stringify(err)
      }`
    );
    return null;
  }
};
