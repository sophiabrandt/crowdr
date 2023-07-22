import { getUser } from '@/lib/get-data';
import { GreetingsDisplay } from './GreetingsDisplay';

export const GreetingsContainer = async () => {
  try {
    const user = await getUser();
    return <GreetingsDisplay user={user} />;
  } catch (error) {
    console.error(
      `No user found, ${
        error instanceof Error ? error.message : JSON.stringify(error)
      }`
    );
    return null;
  }
};
