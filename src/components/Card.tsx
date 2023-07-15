import clsx from 'clsx';

interface CardProps {
  className: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded-3xl px-10 py-4 drop-shadow-xl bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};
