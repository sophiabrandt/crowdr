import { cookies } from 'next/dist/client/components/headers';
import { db } from '@/lib/db';
import { getUserFromCookie } from './auth';
import { UserWithProjects } from '@/helpers/user';

export const getUser = async () => {
  return await getUserFromCookie({
    cookies: cookies(),
    db,
    includeProjects: false,
  });
};

export const getUserProjectIds = async () => {
  const { projects }: UserWithProjects = await getUserFromCookie({
    cookies: cookies(),
    db,
    includeProjects: true,
  });
  return projects.map((project) => project.id);
};

export const getProjectById = async (projectId: string) => {
  return db.project.findUniqueOrThrow({
    where: {
      id: projectId,
    },
    include: {
      rewards: true,
    },
  });
};
