"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      if (!API_URL) throw new Error("URL da API não configurada.");
      
      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      toast.success('Conta criada com sucesso! Redirecionando...');
      
      router.push('/login');

    } catch (err) {
      let errorMessage = 'Ocorreu um erro ao criar a conta.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-slate-50 transition-colors hover:text-blue-400">
              Finan<span className="text-blue-500">Track</span>
            </h1>
          </Link>
          <p className="mt-2 text-slate-400">Comece a organizar suas finanças hoje mesmo.</p>
        </div>

        <div className="mt-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-black/20">
            <div className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300">Nome</label>
                  <div className="mt-1">
                    <Input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">E-mail</label>
                  <div className="mt-1">
                    <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">Senha</label>
                  <div className="mt-1">
                    <Input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">Confirmar Senha</label>
                  <div className="mt-1">
                    <Input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-md p-3 text-center">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Criando conta...' : 'Criar minha conta'}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <p className="text-slate-500">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="font-semibold text-blue-500 hover:text-blue-400">
                    Faça o login
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}