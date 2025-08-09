"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Importando o axios completo
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (!API_URL) throw new Error("URL da API não configurada.");
      
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(response.data.token);

    } catch (err) { // O 'err' aqui é do tipo 'unknown' por padrão
      
      // ✅ CORREÇÃO: Tratamento de erro Type-Safe
      let errorMessage = 'Não foi possível fazer o login. Verifique suas credenciais.';
      
      // Verificamos se o erro tem o formato de um erro do Axios
      if (axios.isAxiosError(err) && err.response) {
        // Se for, sabemos que podemos acessar `err.response.data.message` com segurança
        errorMessage = err.response.data.message || errorMessage;
      } else if (err instanceof Error) {
        // Se for um erro genérico do JavaScript, podemos usar a mensagem dele
        errorMessage = err.message;
      }
      
      setError(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container principal com um gradiente sutil no fundo
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-50">FinanTrack</h1>
          <p className="mt-2 text-slate-400">Bem-vindo de volta! Acesse sua conta.</p>
        </div>

        <div className="mt-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-black/20">
            <div className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    E-mail
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Senha
                  </label>
                  <div className="mt-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-md p-3 text-center">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verificando...' : 'Entrar'}
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-500">
                      Não tem uma conta?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/register"
                    className="w-full flex justify-center py-2 px-4 border border-slate-700 rounded-md shadow-sm text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500"
                  >
                    Crie uma agora
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}