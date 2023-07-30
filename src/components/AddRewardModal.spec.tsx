import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRewardModal } from './AddRewardModal';
import { addReward } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { assertType } from '@/helpers/utils';

jest.mock('@/lib/api');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AddRewardModal', () => {
  it('submits the form correctly', async () => {
    const setIsOpen = jest.fn();
    const setAlertDialog = jest.fn();
    const refresh = jest.fn();
    assertType<jest.Mock>(useRouter).mockReturnValue({ refresh })

    render(
      <AddRewardModal
        projectId="test-project"
        setIsOpen={setIsOpen}
        setAlertDialog={setAlertDialog}
      />
    );

    const nameInput = screen.getByPlaceholderText('reward name')
    const descriptionInput = screen.getByPlaceholderText('reward description');
    const dueDateInput = screen.getByPlaceholderText('reward due date');

    await userEvent.type(nameInput, 'Test Reward');
    await userEvent.type(descriptionInput, 'This is a test reward');
    await userEvent.type(dueDateInput, '2023-07-30');

    userEvent.click(
      screen.getByRole('button', {
        name: /add/i
      }))

    await waitFor(() => expect(setIsOpen).toHaveBeenCalled());

    expect(addReward).toHaveBeenCalledWith(
      'Test Reward',
      'This is a test reward',
      '2023-07-30T00:00:00.000Z',
      'test-project'
    );
    expect(refresh).toHaveBeenCalled();
  });
});

