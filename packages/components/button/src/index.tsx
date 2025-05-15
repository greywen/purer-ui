import React, { ReactNode } from 'react';
import { cn } from '@purer-ui/core';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass =
    'rounded-md font-medium transition-colors focus:outline-none flex items-center justify-center';

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  const colorVariants = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      ghost: 'text-blue-600 hover:bg-blue-50',
      link: 'text-blue-600 underline-offset-4 hover:underline',
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-gray-600 text-gray-600 hover:bg-gray-50',
      ghost: 'text-gray-600 hover:bg-gray-50',
      link: 'text-gray-600 underline-offset-4 hover:underline',
    },
    danger: {
      solid: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-red-600 text-red-600 hover:bg-red-50',
      ghost: 'text-red-600 hover:bg-red-50',
      link: 'text-red-600 underline-offset-4 hover:underline',
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-700',
      outline: 'border border-green-600 text-green-600 hover:bg-green-50',
      ghost: 'text-green-600 hover:bg-green-50',
      link: 'text-green-600 underline-offset-4 hover:underline',
    },
    warning: {
      solid: 'bg-yellow-600 text-white hover:bg-yellow-700',
      outline: 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50',
      ghost: 'text-yellow-600 hover:bg-yellow-50',
      link: 'text-yellow-600 underline-offset-4 hover:underline',
    },
  };

  return (
    <button
      className={cn(
        baseClass,
        sizeClasses[size],
        colorVariants[color][variant],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon && <span className='mr-2'>{leftIcon}</span>}
      {loading ? (
        <>
          <svg
            className='w-4 h-4 mr-2 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          {children}
        </>
      ) : (
        children
      )}
      {rightIcon && <span className='ml-2'>{rightIcon}</span>}
    </button>
  );
}
