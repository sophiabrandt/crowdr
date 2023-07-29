import { RewardCardContainer } from '@/components/RewardCardContainer';
import { RewardCardSkeleton } from '@/components/RewardCardSkeleton';
import { getProjectById } from '@/lib/get-data';
import { Suspense } from 'react';

interface ProjectPageProps {
  params: { id: string };
}

const Page = async ({ params }: ProjectPageProps) => {
  const project = await getProjectById(params.id);
  return (
    <div className="h-full w-full overflow-y-auto">
      <Suspense fallback={<RewardCardSkeleton />}>
        <RewardCardContainer project={project} />
      </Suspense>
    </div>
  );
};

export default Page;
