import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { PROJECT_STATUS, REWARD_STATUS } from '@prisma/client';

const getRandomRewardStatus = () => {
  const statuses = [REWARD_STATUS.NOT_RECEIVED, REWARD_STATUS.RECEIVED];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomProjectStatus = () => {
  const statuses = [PROJECT_STATUS.COMPLETED, PROJECT_STATUS.IN_PROGRESS];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const main = async () => {
  const user = await db.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Person',
      password: await hashPassword('password12345'),
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          status: getRandomProjectStatus(),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const rewards = await Promise.all(
    user.projects.map((project) =>
      db.reward.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Reward ${i}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Everything that describes Reward ${i}`,
            status: getRandomRewardStatus(),
            expected_due: new Date(2023, 11, 22),
          };
        }),
      })
    )
  );

  console.log({ user, rewards });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
