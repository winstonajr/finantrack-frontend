"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import api from '@/lib/api';
import { Transaction, Summary } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { EditTransactionModal } from '@/components/EditTransactionModal';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionList } from '@/components/TransactionList';
import { CustomCurrencyInput } from '@/components/CurrencyInput'; // Importa o novo componente de valor
import toast from 'react-hot-toast';

// Componente para telas de Carregamento
const LoadingScreen = ({ text = "Carregando..." }: { text?: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400 mb-4"></div>
    <p>{text}</p>
  </div>
);

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const router = useRouter();

  const [summary, setSummary] = useState<Summary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<string | undefined>('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
      } catch (err) {
        let errorMessage = 'Não foi possível carregar os dados financeiros.';
        if (axios.isAxiosError(err) && err.response) {
          errorMessage = err.response.data.message || errorMessage;
        }
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsFetching(false);
      }
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (!isAuthLoading && !user) router.push('/login');
  }, [user, isAuthLoading, router]);

  const handleCreateTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      const numericAmount = parseFloat(amount?.replace(/\./g, '').replace(',', '.') || '0');
      
      await api.post('/transactions', { description, amount: numericAmount, type, date: new Date(date).toISOString() });
      
      setDescription('');
      setAmount('');
      await fetchData();
      toast.success('Transação adicionada com sucesso!');
    } catch (err) {
      let errorMessage = 'Erro ao criar a transação.';
      if (axios.isAxiosError(err) && err.response) { errorMessage = err.response.data.message || errorMessage; }
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const performDelete = async (transactionId: number) => {
    setDeletingId(transactionId);
    try {
      await api.delete(`/transactions/${transactionId}`);
      await fetchData();
      toast.success('Transação apagada com sucesso!');
    } catch (err) {
      let errorMessage = 'Erro ao apagar a transação.';
      if (axios.isAxiosError(err) && err.response) { errorMessage = err.response.data.message || errorMessage; }
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };
  
  const handleDelete = (transactionId: number) => {
    toast((t) => (
      <div className='flex flex-col gap-4'>
        <p className="font-semibold">Tem certeza que deseja apagar esta transação?</p>
        <div className="flex gap-4">
          <Button 
            onClick={() => {
              toast.dismiss(t.id);
              performDelete(transactionId);
            }}
            className="w-full bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Apagar
          </Button>
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="w-full rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
    });
  };

  if (isAuthLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <EditTransactionModal 
        transaction={editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSuccess={() => { setEditingTransaction(null); fetchData(); toast.success("Transação atualizada com sucesso!"); }}
      />
    
      <div className="min-h-screen p-4 sm:p-8">
        <header className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Olá, {user.email}!</h1>
            <p className="text-slate-400">Aqui está o resumo da sua vida financeira.</p>
          </div>
          <button onClick={logout} className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600">Sair</button>
        </header>

        <main className="space-y-8">
          {isFetching ? ( <LoadingScreen text="Buscando seus dados..." /> ) : error ? ( <p className="text-red-400 text-center">{error}</p> ) : (
            <>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard title="Receitas" icon="income" amount={summary?.totalIncome ?? 0} />
                <SummaryCard title="Despesas" icon="expense" amount={summary?.totalExpense ?? 0} />
                <SummaryCard title="Saldo Atual" icon="balance" amount={summary?.balance ?? 0} />
              </section>

              <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Adicionar Nova Transação</h2>
                <form onSubmit={handleCreateTransaction} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  
                  <div className="md:col-span-2">
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-400 mb-1">Valor</label>
                    <CustomCurrencyInput
                      id="amount"
                      name="amount"
                      placeholder="R$ 0,00"
                      value={amount}
                      onValueChange={(value) => setAmount(value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">Descrição</label>
                    <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>

                  <div className="md:col-span-1">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? '...' : 'Salvar'}
                    </Button>
                  </div>

                  <div className="md:col-span-6 flex items-center gap-4 flex-wrap mt-2">
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

                  {formError && <p className="text-sm text-red-400 md:col-span-6">{formError}</p>}
                </form>
              </section>

              <section className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Histórico de Transações</h2>
                <TransactionList 
                  transactions={transactions}
                  onEdit={setEditingTransaction}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}