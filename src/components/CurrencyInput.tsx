"use client";

import React from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

// Este componente "envelopa" a biblioteca e aplica nosso estilo do Tailwind
export const CustomCurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    const classNames =
      'appearance-none block w-full px-3 py-2 border border-slate-700 bg-slate-900 rounded-md shadow-sm placeholder-slate-400 text-slate-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';

    return (
      <CurrencyInput
        ref={ref}
        className={classNames}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalScale={2}
        {...props}
      />
    );
  }
);

CustomCurrencyInput.displayName = 'CustomCurrencyInput';