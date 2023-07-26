import Link from 'next/link';
import { GreetingsContainer } from '@/components/GreetingsContainer';
import { GreetingsSkeleton } from '@/components/GreetingsSkeleton';
import { ProjectCardContainer } from '@/components/ProjectCardContainer';
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton';
import { Suspense } from 'react';
import { getUserProjectIds } from '@/lib/get-data';

const Page = async () => {
  const projectIds = await getUserProjectIds();

  return (
    <div className="w-1/1 h-full w-full overflow-y-auto">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow">
          <Suspense fallback={<GreetingsSkeleton />}>
            <GreetingsContainer />
          </Suspense>
        </div>
        <div className="flex-2 -m-3 mt-3 flex grow flex-wrap items-center ">
          {!!projectIds.length &&
            projectIds.map((projectId: string) => (
              <div className="w-1/3 p-3" key={projectId}>
                <Link href={`/project/${projectId}`}>
                  <Suspense fallback={<ProjectCardSkeleton />}>
                    <ProjectCardContainer projectId={projectId} />
                  </Suspense>
                </Link>
              </div>
            ))}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="flex-2 mt-6 flex w-full grow">
          <div className="w-full">{/* tasks here */}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
