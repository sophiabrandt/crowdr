import { render, screen, waitFor } from '@testing-library/react';
import { createNewProject } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAlert } from './Alert';
import { NewProject } from './NewProject';
import { assertType } from '@/helpers/utils';
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/api');
jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('./Alert', () => ({ useAlert: jest.fn() }));

describe('NewProject', () => {
  const setAlertDialog = jest.fn();

  beforeEach(() => {
    assertType<jest.Mock>(createNewProject).mockResolvedValue({});
    assertType<jest.Mock>(useAlert).mockReturnValue({
      alertDialog: { isOpen: false, message: '' },
      setAlertDialog,
    });
    assertType<jest.Mock>(useRouter).mockReturnValue({ refresh: jest.fn() });
  });

  it('renders without crashing', () => {
    render(<NewProject />);
  });

  it('creates a new project successfully', async () => {
    render(<NewProject />);

    userEvent.click(
      screen.getByRole('button', {
        name: /\+ new project/i,
      })
    );

    const input = await screen.findByRole('textbox');
    await userEvent.type(input, 'Test Project');
    expect(input).toHaveValue('Test Project');

    userEvent.click(screen.getByText('Create'));

    await waitFor(() =>
      expect(createNewProject).toHaveBeenCalledWith('Test Project')
    );
  });

  it('handles project creation error', async () => {
    assertType<jest.Mock>(createNewProject).mockRejectedValue(
      new Error('Could not create project')
    );

    render(<NewProject />);
    userEvent.click(screen.getByText('+ New Project'));
    const input = await screen.findByRole('textbox');
    await userEvent.type(input, 'Test Project');
    userEvent.click(screen.getByText('Create'));

    await waitFor(() =>
      expect(setAlertDialog).toHaveBeenCalledWith({
        isOpen: true,
        message: 'Could not create project',
      })
    );
  });
});
