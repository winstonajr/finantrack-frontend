import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

// --- A MÁGICA DO SEO ACONTECE AQUI ---
export const metadata: Metadata = {
  // Define a URL base para o seu site em produção.
  // Ajuda a resolver URLs relativas para os metadados.
  metadataBase: new URL('https://finantrack.vercel.app'), // <-- SUBSTITUA PELA SUA URL DE PRODUÇÃO NO FUTURO

  // Título Padrão e Template para Títulos de Páginas
  title: {
    template: '%s | FinanTrack', // Ex: "Dashboard | FinanTrack"
    default: 'FinanTrack - Controle Financeiro Pessoal Simplificado', // Título da Home Page
  },

  // Descrição principal do site (importante para o Google)
  description: 'Assuma o controle total da sua vida financeira. FinanTrack é a ferramenta simples e poderosa para monitorar despesas, visualizar gastos e alcançar suas metas.',
  
  // Metadados para Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: 'FinanTrack - Controle Financeiro Pessoal Simplificado',
    description: 'Monitore suas despesas, visualize seus gastos e alcance suas metas com clareza.',
    url: 'https://finantrack.vercel.app', // <-- SUBSTITUA PELA SUA URL DE PRODUÇÃO
    siteName: 'FinanTrack',
    images: [
      {
        url: '/og-image.png', // Caminho para a imagem na pasta `public`
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },

  // Metadados para Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'FinanTrack - Controle Financeiro Pessoal Simplificado',
    description: 'Monitore suas despesas, visualize seus gastos e alcance suas metas com clareza.',
    images: ['/og-image.png'], // Caminho para a imagem na pasta `public`
  },

  // Outros metadados úteis
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
// --- FIM DA SEÇÃO DE SEO ---


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Define o idioma principal da página para pt-BR
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-900 text-slate-50 flex flex-col min-h-screen`}>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' },
          }}
        />
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}