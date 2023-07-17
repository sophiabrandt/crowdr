import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        'border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg focus:border-purple-800 focus:outline-none ',
        className
      )}
      {...props}
    />
  );
};
