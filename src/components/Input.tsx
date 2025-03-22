import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, type = 'text', id, ...props }, ref) => {
    return (
      <div className={cn('mb-4', className)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={cn(
            'py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export { InputField };
