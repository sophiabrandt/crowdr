import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button', () => {
  it('renders Button component correctly', () => {
    render(
      <Button intent="primary" size="medium">
        Test
      </Button>
    );

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Test');
    expect(buttonElement).toHaveClass(
      'rounded-3xl',
      'font-bold',
      'hover:scale-110',
      'active:scale-100',
      'transition',
      'duration-200',
      'ease-in-out',
      'bg-violet-500',
      'text-white',
      'border-transparent',
      'hover:bg-violet-600',
      'text-lg',
      'px-6',
      'py-2'
    );
  });

  it('fires onClick event when clicked', () => {
    const handleClick = jest.fn();

    render(
      <Button intent="primary" size="medium" onClick={handleClick}>
        Test
      </Button>
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
