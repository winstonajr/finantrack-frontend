import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import { ReactNode } from 'react';

// Definimos as props que nosso card vai receber
interface SummaryCardProps {
  title: string;
  amount: number;
  icon: 'income' | 'expense' | 'balance';
}

// Função para formatar o valor como moeda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export function SummaryCard({ title, amount, icon }: SummaryCardProps) {
  // Escolhe o ícone e a cor com base na prop 'icon'
  const IconMap: Record<typeof icon, ReactNode> = {
    income: <ArrowUpCircle size={32} className="text-green-500" />,
    expense: <ArrowDownCircle size={32} className="text-red-500" />,
    balance: <DollarSign size={32} className="text-slate-50" />,
  };

  const amountColor = {
    income: 'text-green-500',
    expense: 'text-red-500',
    balance: 'text-slate-50',
  }[icon];

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col gap-4 transition-all duration-300 hover:bg-slate-700/50 hover:shadow-blue-500/10">
      <header className="flex items-center justify-between">
        <span className="text-slate-400">{title}</span>
        {IconMap[icon]}
      </header>
      <strong className={`text-3xl font-bold ${amountColor}`}>
        {formatCurrency(amount)}
      </strong>
    </div>
  );
}