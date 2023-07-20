import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormInput } from './FormInput';

describe('FormInput', () => {
  it('should render FormInput component', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <FormInput
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
      <FormInput
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
