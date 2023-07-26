import { getUser } from '@/lib/get-data';
import { GreetingsDisplay } from './GreetingsDisplay';

export const GreetingsContainer = async () => {
  try {
    const user = await getUser();
    return <GreetingsDisplay user={user} />;
  } catch (err) {
    console.error(
      `No user found: ${
        err instanceof Error ? err.message : JSON.stringify(err)
      }`
    );
    return null;
  }
};
