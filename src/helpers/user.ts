import { Prisma } from '@prisma/client';

export const userWithProjects = Prisma.validator<Prisma.UserArgs>()({
  include: { projects: true },
});

export type UserWithProjects = Prisma.UserGetPayload<typeof userWithProjects>;
