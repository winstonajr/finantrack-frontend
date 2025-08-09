"use client";

import { Transaction } from "@/types";
import { format } from 'date-fns'; // Biblioteca para formatação de datas
import { ptBR } from 'date-fns/locale'; // Para datas em português
import { Edit2, Trash2, TrendingUp, TrendingDown } from "lucide-react"; // Ícones

// Props que o componente receberá
interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
  deletingId: number | null;
}

// Função para formatar moeda, agora local ao componente
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export function TransactionList({ transactions, onEdit, onDelete, deletingId }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-400">Nenhuma transação encontrada.</p>
        <p className="text-sm text-slate-500">Adicione sua primeira receita ou despesa no formulário acima!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div key={tx.id} className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 bg-slate-800 p-4 rounded-lg transition-all duration-200 hover:bg-slate-700/50">
          
          {/* Coluna Descrição e Data (ocupa mais espaço) */}
          <div className="col-span-2 md:col-span-2 flex items-center gap-4">
            <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              {tx.type === 'income' ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
            </div>
            <div>
              <p className="font-semibold text-slate-50">{tx.description}</p>
              <p className="text-sm text-slate-400">
                {format(new Date(tx.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>

          {/* Coluna Valor */}
          <div className="text-right md:text-left">
            <p className={`font-semibold text-lg ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
            </p>
          </div>

          {/* Coluna de Ações (Editar/Apagar) */}
          <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-4">
            <button onClick={() => onEdit(tx)} className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
              <Edit2 size={18} />
            </button>
            <button onClick={() => onDelete(tx.id)} disabled={deletingId === tx.id} className="p-2 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50">
              {deletingId === tx.id ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400"></div> : <Trash2 size={18} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}