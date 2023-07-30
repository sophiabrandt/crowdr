import { Prisma } from '@prisma/client';

const projectWithRewards = Prisma.validator<Prisma.ProjectArgs>()({
  include: { rewards: true },
});

export type ProjectWithRewards = Prisma.ProjectGetPayload<
  typeof projectWithRewards
>;

export const format = (date: Date) =>
  new Date(date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
