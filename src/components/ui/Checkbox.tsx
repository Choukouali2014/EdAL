import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CheckboxProps {
  id: string;
  name?: string;
  label?: string | React.JSX.Element;
  checked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onCheckedChange,
  className,
}) => {
  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        id={id}
        name={name}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={clsx(
          'h-4 w-4 rounded border border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600',
          className
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;