import React, { forwardRef } from 'react';
import { cn } from '@purer-ui/core';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'filled' | 'unstyled';
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      error = false,
      errorMessage,
      fullWidth = false,
      leftElement,
      rightElement,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClass =
      'rounded-md font-medium transition-colors focus:outline-none';

    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
    };

    const variantClasses = {
      outline:
        'border border-gray-300 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      filled:
        'border border-transparent bg-gray-100 focus:bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      unstyled: 'border-none bg-transparent',
    };

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        <div
          className={cn('relative flex items-center', fullWidth && 'w-full')}
        >
          {leftElement && (
            <div className='absolute left-3 text-gray-500'>{leftElement}</div>
          )}
          <input
            ref={ref}
            className={cn(
              baseClass,
              sizeClasses[size],
              variantClasses[variant],
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              disabled && 'opacity-60 cursor-not-allowed bg-gray-50',
              fullWidth && 'w-full',
              className
            )}
            disabled={disabled}
            {...props}
          />
          {rightElement && (
            <div className='absolute right-3 text-gray-500'>{rightElement}</div>
          )}
        </div>
        {error && errorMessage && (
          <p className='mt-1 text-xs text-red-500'>{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
