export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // A classe `mt-auto` ajuda a "empurrar" o rodapé para o final da página em telas com pouco conteúdo
    <footer className="relative z-10 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
        <p>
          &copy; {currentYear} FinanTrack. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}