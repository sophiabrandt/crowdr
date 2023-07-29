import Link from 'next/link';
import { GreetingsContainer } from '@/components/GreetingsContainer';
import { GreetingsSkeleton } from '@/components/GreetingsSkeleton';
import { ProjectCardContainer } from '@/components/ProjectCardContainer';
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton';
import { Suspense } from 'react';
import { RewardCardContainer } from '@/components/RewardCardContainer';
import { getUserProjectIds } from '@/lib/get-data';
import { RewardCardSkeleton } from '@/components/RewardCardSkeleton';
import NewProject from '@/components/NewProject';

const Page = async () => {
  const projectIds = await getUserProjectIds();

  return (
    <div className="w-1/1 h-full w-full overflow-y-scroll">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow">
          <Suspense fallback={<GreetingsSkeleton />}>
            <GreetingsContainer />
          </Suspense>
        </div>
        <div className="mt-3 grid gap-4 grid-auto-fit">
          {!!projectIds.length &&
            projectIds.map((projectId: string) => (
              <div className="p-2" key={projectId}>
                <Link href={`/project/${projectId}`}>
                  <Suspense fallback={<ProjectCardSkeleton />}>
                    <ProjectCardContainer projectId={projectId} />
                  </Suspense>
                </Link>
              </div>
            ))}
          <div className="p-2">
            <NewProject />
          </div>
        </div>
        <div className="mt-3">
          <Suspense fallback={<RewardCardSkeleton />}>
            <RewardCardContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
