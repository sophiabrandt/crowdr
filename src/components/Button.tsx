import { cva, VariantProps } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'rounded-3xl',
    'font-bold',
    'enabled:hover:scale-110',
    'enabled:active:scale-100',
    'enabled:transition',
    'enabled:duration-200',
    'ease-in-out',
    'disabled:bg-slate-300',
    'disabled:text-slate-600',
    'disabled:border-slate-600',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-violet-500',
          'text-white',
          'border-transparent',
          'hover:bg-violet-600',
        ],

        secondary: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800',
        ],
        text: ['bg-transparent', 'text-black', 'hover:bg-gray-100'],
      },
      size: {
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  intent?: VariantProps<typeof buttonClasses>['intent'];
  size?: VariantProps<typeof buttonClasses>['size'];
}
export const Button = ({
  children,
  className,
  intent,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};
