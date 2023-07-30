import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthFormInput } from './AuthFormInput';

describe('AuthFormInput', () => {
  it('should render AuthFormInput component', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <AuthFormInput
        name="TestName"
        placeholder="TestPlaceholder"
        value=""
        className="TestClassName"
        onChange={handleChange}
      />
    );

    const inputNode = getByPlaceholderText('TestPlaceholder');

    expect(inputNode).toBeInTheDocument();
  });

  it('should call onChange function with input value', async () => {
    const handleChange = jest.fn();

    render(
      <AuthFormInput
        name="TestName"
        placeholder="TestPlaceholder"
        value=""
        className="TestClassName"
        onChange={handleChange}
      />
    );

    await userEvent.type(screen.getByTestId('input-testname'), 'testValue');

    expect(handleChange).toHaveBeenCalledTimes('testValue'.length);
  });
});
