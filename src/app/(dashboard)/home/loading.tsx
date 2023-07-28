import { Card } from '@/components/Card';

export const HomePageLoader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-violet-400"></div>
      </Card>
    </div>
  );
};

export default HomePageLoader;
