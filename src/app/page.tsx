import Link from 'next/link';
import { ShieldCheck, LayoutGrid, Goal } from 'lucide-react';

export default function Home() {
  return (
    // O container principal não precisa mais ser a página inteira
    <div className="relative w-full overflow-hidden">
      {/* Fundo animado */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[50rem] h-[50rem] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[50rem] h-[50rem] bg-slate-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Seção Hero */}
          <section className="text-center py-20 sm:py-32">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-50 to-slate-400">
              Assuma o Controle Total da Sua Vida Financeira
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
              FinanTrack é a ferramenta simples e poderosa que você precisa para monitorar despesas, visualizar seus gastos e alcançar suas metas.
            </p>
            <div className="mt-10">
              <Link href="/register" className="rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors">
                Comece agora, é grátis!
              </Link>
            </div>
          </section>

          {/* Seção de Features */}
          <section className="py-20 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 border border-slate-700 mb-4"><LayoutGrid className="h-6 w-6 text-blue-400" /></div>
                <h3 className="text-lg font-semibold text-slate-50">Dashboard Intuitivo</h3>
                <p className="mt-2 text-slate-400">Visualize suas receitas, despesas e saldo em um painel claro e objetivo.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 border border-slate-700 mb-4"><ShieldCheck className="h-6 w-6 text-blue-400" /></div>
                <h3 className="text-lg font-semibold text-slate-50">Segurança e Privacidade</h3>
                <p className="mt-2 text-slate-400">Seus dados são seus. Autenticação segura e controle total sobre suas informações.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 border border-slate-700 mb-4"><Goal className="h-6 w-6 text-blue-400" /></div>
                <h3 className="text-lg font-semibold text-slate-50">Foco nas Suas Metas</h3>
                <p className="mt-2 text-slate-400">Entenda para onde seu dinheiro está indo e planeje seus próximos passos financeiros.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}