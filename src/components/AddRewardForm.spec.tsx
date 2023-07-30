import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRewardForm } from './AddRewardForm';

describe('AddRewardForm', () => {
  it('calls handleSubmit with form data on submit', async () => {
    const handleSubmit = jest.fn((e) => {
      e.preventDefault();
    });

    render(<AddRewardForm saving={false} handleSubmit={handleSubmit} />);

    const nameInput = screen.getByPlaceholderText('reward name');
    const descriptionInput = screen.getByPlaceholderText('reward description');
    const dueDateInput = screen.getByPlaceholderText('reward due date');

    await userEvent.type(nameInput, 'Test Reward');
    await userEvent.type(descriptionInput, 'This is a test reward');
    await userEvent.type(dueDateInput, '2023-07-30');

    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled())
  });
});

