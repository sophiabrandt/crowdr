import { ChangeEvent } from 'react';
import { Input } from './Input';

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}

export const FormInput = ({
  name,
  placeholder,
  value,
  className,
  type = 'text',
  onChange,
  required = false,
  minLength,
}: FormInputProps) => (
  <>
    <div className="text-lg text-black/50">{name}</div>
    <Input
      name={name.toLocaleLowerCase()}
      required={required}
      minLength={minLength}
      type={type}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
    />
  </>
);
