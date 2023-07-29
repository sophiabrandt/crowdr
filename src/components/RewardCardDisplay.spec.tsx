import React from 'react';
import { render, screen } from '@testing-library/react';
import { RewardCardDisplay } from './RewardCardDisplay';
import { Reward } from '@prisma/client';
import { assertType } from '@/helpers/utils';

describe('RewardCardDisplay component', () => {
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

    render(<RewardCardDisplay rewards={mockRewards} title="My title" />);
    mockRewards.forEach((reward) => {
      expect(screen.getByText(reward.name)).toBeInTheDocument();
      expect(screen.getByText(reward.description)).toBeInTheDocument();
      expect(screen.getByText('My title')).toBeInTheDocument();
    });
  });

  it('renders fallback text when there are no rewards', () => {
    const mockRewards: any[] = [];

    render(<RewardCardDisplay rewards={mockRewards} title="" />);
    expect(
      screen.getByText('You have added no projects with rewards yet')
    ).toBeInTheDocument();
  });
});
