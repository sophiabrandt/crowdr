import { getProjectById } from '@/lib/get-data';
import { ProjectCard } from './ProjectCard';
import { ProjectWithRewards } from '@/helpers/project';

interface ProjectCardContainerProps {
  projectId: string;
}

export const ProjectCardContainer = async ({
  projectId,
}: ProjectCardContainerProps) => {
  try {
    const project: ProjectWithRewards = await getProjectById(projectId);
    return <ProjectCard project={project} />;
  } catch (err) {
    console.error(
      `No project found with id ${projectId}: ${
        err instanceof Error ? err.message : JSON.stringify(err)
      }`
    );
    return null;
  }
};
