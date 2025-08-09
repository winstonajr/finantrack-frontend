"use client";

import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';

export function Header() {
  const { user, isLoading } = useAuth(); // Pega o estado de autenticação do nosso Contexto

  return (
    <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo que leva para a Home */}
        <Link href="/" className="text-2xl font-bold text-slate-50 transition-colors hover:text-blue-400">
          Finan<span className="text-blue-500">Track</span>
        </Link>
        
        {/* Links de navegação que mudam com base no estado de login */}
        <div className="flex items-center gap-x-4">
          {isLoading ? (
            // Mostra um placeholder enquanto verifica o login
            <div className="h-6 w-24 bg-slate-700 rounded-md animate-pulse"></div>
          ) : user ? (
            // Links para usuários LOGADOS
            <>
              <Link href="/dashboard" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              {/* O botão de Logout fica no Dashboard, mas poderia estar aqui também */}
            </>
          ) : (
            // Links para VISITANTES
            <>
              <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}