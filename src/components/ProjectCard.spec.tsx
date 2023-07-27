import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { REWARD_STATUS } from '@prisma/client';
import { ProjectWithRewards, format } from '@/helpers/project';
import { assertType } from '@/helpers/utils';

const mockProject = assertType<ProjectWithRewards>({
  name: 'Test Project',
  createdAt: new Date(),
  rewards: [
    { status: REWARD_STATUS.RECEIVED },
    { status: REWARD_STATUS.RECEIVED },
    { status: REWARD_STATUS.NOT_RECEIVED },
  ],
});

describe('ProjectCard', () => {
  it('displays the correct project information', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText(mockProject.name)).toBeInTheDocument();
    expect(screen.getByText(format(mockProject.createdAt))).toBeInTheDocument();
    expect(screen.getByText('2/3 received')).toBeInTheDocument();

    const progress = Math.ceil((2 / mockProject.rewards.length) * 100);
    expect(screen.getByText(`${progress}%`)).toBeInTheDocument();
  });
});
