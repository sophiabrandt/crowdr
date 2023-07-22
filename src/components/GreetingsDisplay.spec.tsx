import { render, screen } from '@testing-library/react';
import { User } from '@prisma/client';
import { assertType } from '@/helpers/utils';
import { GreetingsDisplay } from './GreetingsDisplay';

describe('Greetings', () => {
  it('should display the user greeting', () => {
    const user = assertType<User>({
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@test.com',
    });
    render(<GreetingsDisplay user={user} />);
    screen.getByRole('heading', {
      name: /hello, john!/i,
    });
    screen.getByRole('heading', {
      name: /check your daily tasks and schedule/i,
    });
    screen.getByRole('button', {
      name: /today's schedule/i,
    });
  });
});
