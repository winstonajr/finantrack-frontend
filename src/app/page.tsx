import Link from 'next/link'; // Importa o componente Link para navegação otimizada

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-6xl">
          Bem-vindo ao <span className="text-blue-500">FinanTrack</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          A ferramenta definitiva para assumir o controle da sua vida financeira.
          Monitore suas despesas, visualize seus gastos e alcance suas metas
          com clareza e simplicidade.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* Botão principal que leva para a página de login */}
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Acessar Conta
          </Link>

          {/* Botão secundário que levará para a futura página de registro */}
          <Link
            href="/register" 
            className="text-sm font-semibold leading-6 text-slate-300 hover:text-white"
          >
            Criar uma conta <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}