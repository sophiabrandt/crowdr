import { ChangeEvent } from 'react';
import { Input } from './Input';

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string;
  className: string;
  type?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  name,
  placeholder,
  value,
  className,
  type = 'text',
  required = false,
  onChange,
}: FormInputProps) => (
  <>
    <div className="text-lg text-black/50">{name}</div>
    <Input
      name={name.toLocaleLowerCase()}
      required={required}
      type={type}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
    />
  </>
);
