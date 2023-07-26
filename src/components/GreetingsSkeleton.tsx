import { Card } from './Card';

export const GreetingsSkeleton = () => {
  return (
    <Card className="w-full py-14">
      <div className="flex animate-pulse">
        <div className="ml-4 mt-2 w-full">
          <h3
            className="h-4 rounded-md bg-gray-200 dark:bg-gray-700"
            style={{ width: '40%' }}
          ></h3>
          <ul className="mt-5 space-y-3 pb-2">
            <li className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></li>
            <li className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
