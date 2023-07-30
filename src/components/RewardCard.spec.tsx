import React from 'react';
import { render, screen } from '@testing-library/react';
import { RewardCard } from './RewardCard';
import { Reward } from '@prisma/client';
import { assertType } from '@/helpers/utils';

describe('RewardCard component', () => {
  it('renders rewards correctly', () => {
    const mockRewards: Reward[] = [
      assertType<Reward>({
        id: '1',
        name: 'Reward 1',
        description: 'This is Reward 1',
        projectId: '1',
      }),
      assertType<Reward>({
        id: '2',
        name: 'Reward 2',
        description: 'This is Reward 2',
        projectId: '2',
      }),
    ];

    render(<RewardCard rewards={mockRewards} title="My title" />);
    mockRewards.forEach((reward) => {
      expect(screen.getByText(reward.name)).toBeInTheDocument();
      expect(screen.getByText(reward.description)).toBeInTheDocument();
      expect(screen.getByText('My title')).toBeInTheDocument();
    });
  });

  it('renders fallback text when there are no rewards', () => {
    const mockRewards: any[] = [];

    render(<RewardCard rewards={mockRewards} title="" />);
    expect(screen.getByText('Sorry, no rewards yet')).toBeInTheDocument();
  });

  it('shows the add reward button if there is a projetId', () => {
    const mockRewards: any[] = [];

    render(
      <RewardCard rewards={mockRewards} title="my title" projectId="test-id" />
    );
    expect(
      screen.getByRole('button', { name: /\+ add new/i })
    ).toBeInTheDocument();
  });

  it('does not show add reward button if there is no projetId', () => {
    const mockRewards: any[] = [];

    render(<RewardCard rewards={mockRewards} title="my title" />);
    expect(
      screen.queryByRole('button', { name: /\+ add new/i })
    ).not.toBeInTheDocument();
  });
});
