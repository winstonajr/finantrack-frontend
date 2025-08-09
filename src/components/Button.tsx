"use client";

import React from 'react';
import clsx from 'clsx'; // Importamos a biblioteca clsx

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    // Usamos clsx para mesclar as classes padrão com qualquer classe externa
    const finalClassNames = clsx(
      'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
      className // Aqui adicionamos as classes que vêm de fora
    );

    return (
      <button className={finalClassNames} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';