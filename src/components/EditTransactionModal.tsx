"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Transaction } from '@/types';
import { Input } from './Input';
import { Button } from './Button';
import api from '@/lib/api';

interface EditTransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditTransactionModal({ transaction, onClose, onSuccess }: EditTransactionModalProps) {
  // ✅ CORRETO: Todos os Hooks (useState, useEffect, etc.) são declarados
  // no topo do componente, de forma incondicional.
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // O useEffect também é um Hook, então ele fica aqui no topo.
  useEffect(() => {
    // A lógica interna pode ser condicional sem problemas.
    if (transaction) {
      setDescription(transaction.description);
      setAmount(String(transaction.amount));
      setDate(new Date(transaction.date).toISOString().split('T')[0]);
      setType(transaction.type);
    }
  }, [transaction]);

  // ✅ CORRETO: A condição de saída (early return) vem DEPOIS
  // da declaração de todos os Hooks.
  if (!transaction) {
    return null;
  }

  // O resto do componente continua a partir daqui...
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedData = {
        description,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
        type,
      };

      await api.put(`/transactions/${transaction.id}`, updatedData);
      onSuccess();
    } catch (err) {
      setError('Erro ao atualizar a transação. Tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-50">Editar Transação</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-slate-400">Descrição</label>
            <Input id="edit-description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="edit-amount" className="block text-sm font-medium text-slate-400">Valor</label>
            <Input id="edit-amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <input type="radio" id="edit-expense" name="edit-type" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} className="form-radio h-4 w-4 text-red-500 bg-slate-700 border-slate-600 focus:ring-red-500" />
              <label htmlFor="edit-expense" className="text-sm">Despesa</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" id="edit-income" name="edit-type" value="income" checked={type === 'income'} onChange={() => setType('income')} className="form-radio h-4 w-4 text-green-500 bg-slate-700 border-slate-600 focus:ring-green-500" />
              <label htmlFor="edit-income" className="text-sm">Receita</label>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="edit-date" className="text-sm text-slate-400">Data:</label>
              <Input id="edit-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-auto p-1" />
            </div>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700">Cancelar</button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}