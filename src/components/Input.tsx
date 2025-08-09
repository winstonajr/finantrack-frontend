import React from 'react';

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    // Usando apenas classes padrão do Tailwind
    const classNames =
      'appearance-none block w-full px-3 py-2 border border-slate-700 bg-slate-900 rounded-md shadow-sm placeholder-slate-400 text-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';

    return <input className={classNames} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';