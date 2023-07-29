import { getProjectById } from '@/lib/get-data';
import { ProjectWithRewards } from '@/helpers/project';
import { ProjectCardDisplay } from './ProjectCardDisplay';

interface ProjectCardContainerProps {
  projectId: string;
}

export const ProjectCardContainer = async ({
  projectId,
}: ProjectCardContainerProps) => {
  try {
    const project: ProjectWithRewards = await getProjectById(projectId);
    return <ProjectCardDisplay project={project} />;
  } catch (err) {
    console.error(
      `No project found with id ${projectId}: ${
        err instanceof Error ? err.message : JSON.stringify(err)
      }`
    );
  }
};
