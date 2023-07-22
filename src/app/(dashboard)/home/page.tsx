import { Greetings } from '@/components/Greetings';

export default async function Page() {
  return (
    <div className="w-1/1 h-full w-full overflow-y-auto">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow">
          <Greetings />
        </div>
        <div className="flex-2 -m-3 mt-3 flex grow flex-wrap items-center ">
          {/** projects map here */}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="flex-2 mt-6 flex w-full grow">
          <div className="w-full">{/* tasks here */}</div>
        </div>
      </div>
    </div>
  );
}
