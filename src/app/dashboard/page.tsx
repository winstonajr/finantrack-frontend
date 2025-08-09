"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';
import { Transaction, Summary } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { EditTransactionModal } from '@/components/EditTransactionModal';

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const router = useRouter();

  const [summary, setSummary] = useState<Summary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Usando useCallback para memoizar a função fetchData
  const fetchData = useCallback(async () => {
    if (user) {
      setIsFetching(true);
      setError(null);
      try {
        const [summaryRes, transactionsRes] = await Promise.all([
          api.get('/transactions/summary'),
          api.get('/transactions'),
        ]);
        setSummary(summaryRes.data);
        setTransactions(transactionsRes.data);
      } catch (_err) {
        setError('Não foi possível carregar os dados financeiros.');
      } finally {
        setIsFetching(false);
      }
    }
  }, [user]); // A função será recriada se o 'user' mudar

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Agora a dependência é a função memoizada 'fetchData'

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  const handleCreateTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      const newTransaction = {
        description,
        amount: parseFloat(amount),
        type,
        date: new Date(date).toISOString(),
      };
      await api.post('/transactions', newTransaction);
      setDescription('');
      setAmount('');
      await fetchData(); // Re-busca os dados
    } catch (_err) {
      setFormError('Erro ao criar a transação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (transactionId: number) => {
    if (window.confirm('Tem certeza que deseja apagar esta transação?')) {
      setDeletingId(transactionId);
      try {
        await api.delete(`/transactions/${transactionId}`);
        await fetchData(); // Re-busca os dados
      } catch (_err) {
        alert('Erro ao apagar a transação.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  if (isAuthLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <>
      <EditTransactionModal 
        transaction={editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSuccess={() => {
          setEditingTransaction(null);
          fetchData(); // Re-busca os dados
        }}
      />
    
      <div className="min-h-screen p-4 sm:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Olá, {user.email}!</h1>
            <p className="text-slate-400">Aqui está o resumo da sua vida financeira.</p>
          </div>
          <button onClick={logout} className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600">Sair</button>
        </header>

        <main className="space-y-8">
          {isFetching ? ( <p className="text-center">Buscando seus dados...</p> ) : error ? ( <p className="text-red-400 text-center">{error}</p> ) : (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg"><h2 className="text-slate-400 text-sm font-medium">Receitas</h2><p className="text-2xl font-semibold text-green-400">{formatCurrency(summary?.totalIncome ?? 0)}</p></div>
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg"><h2 className="text-slate-400 text-sm font-medium">Despesas</h2><p className="text-2xl font-semibold text-red-400">{formatCurrency(summary?.totalExpense ?? 0)}</p></div>
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg"><h2 className="text-slate-400 text-sm font-medium">Saldo Atual</h2><p className="text-2xl font-semibold">{formatCurrency(summary?.balance ?? 0)}</p></div>
              </section>

              <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Adicionar Nova Transação</h2>
                <form onSubmit={handleCreateTransaction} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-400">Descrição</label>
                    <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-400">Valor</label>
                    <Input id="amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                  </div>
                  <div>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adicionando...' : 'Adicionar'}</Button>
                  </div>
                  <div className="md:col-span-4 flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="expense" name="type" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} className="form-radio h-4 w-4 text-red-500 bg-slate-700 border-slate-600 focus:ring-red-500" />
                      <label htmlFor="expense" className="text-sm">Despesa</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="income" name="type" value="income" checked={type === 'income'} onChange={() => setType('income')} className="form-radio h-4 w-4 text-green-500 bg-slate-700 border-slate-600 focus:ring-green-500" />
                      <label htmlFor="income" className="text-sm">Receita</label>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <label htmlFor="date" className="text-sm text-slate-400">Data:</label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-auto p-1" />
                    </div>
                  </div>
                  {formError && <p className="text-sm text-red-400 md:col-span-4">{formError}</p>}
                </form>
              </section>

              <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Transações Recentes</h2>
                <ul className="space-y-4">
                  {transactions.length > 0 ? (
                    transactions.map((tx) => (
                      <li key={tx.id} className="flex flex-wrap justify-between items-center border-b border-slate-700 pb-2 gap-2">
                        <div>
                          <p className="font-semibold">{tx.description}</p>
                          <p className="text-sm text-slate-400">{new Date(tx.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className={`font-semibold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>{tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}</p>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingTransaction(tx)} className="text-slate-400 hover:text-white text-sm">Editar</button>
                            <button onClick={() => handleDelete(tx.id)} disabled={deletingId === tx.id} className="text-slate-400 hover:text-red-400 disabled:opacity-50 text-sm">{deletingId === tx.id ? 'Apagando...' : 'Apagar'}</button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-slate-400">Nenhuma transação encontrada.</p>
                  )}
                </ul>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}