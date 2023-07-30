import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddReward } from './AddReward';
import { useModal } from './Modal';
import { useAlert } from './Alert';
import { assertType } from '@/helpers/utils';

jest.mock('./Modal', () => ({
  useModal: jest.fn(),
}));

jest.mock('./Alert', () => ({
  useAlert: jest.fn(),
}));

describe('AddReward', () => {
  it('calls setIsOpen when button is clicked', async () => {
    const setIsOpenMock = jest.fn();
    const setAlertDialogMock = jest.fn();

    assertType<jest.Mock>(useModal).mockReturnValue({
      isOpen: false,
      setIsOpen: setIsOpenMock,
    });

    assertType<jest.Mock>(useAlert).mockReturnValue({
      alertDialog: { isOpen: false, message: '' },
      setAlertDialog: setAlertDialogMock,
    });

    render(<AddReward projectId="1" />);

    const addButton = screen.getByText('+ Add New');
    await userEvent.click(addButton);

    expect(setIsOpenMock).toHaveBeenCalledWith(true);
  });
});
