'use client';

import type { ReactNode } from 'react';

interface ButtonProps {
  appName: string;
  children: ReactNode;
  className?: string;
}

export const Button = ({ appName, children, className }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
