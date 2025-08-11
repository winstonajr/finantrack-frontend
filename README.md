# FinanTrack - Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Este é o repositório do frontend para a aplicação FinanTrack, uma ferramenta moderna de controle financeiro pessoal. A interface foi construída com Next.js (App Router) e TypeScript, focando em uma experiência de usuário limpa, reativa e profissional.

---

### 🚀 **[Acesse a Aplicação Ao Vivo](https://finantrack-alpha.vercel.app/)** 🚀

---

## ✨ Funcionalidades Principais

- **Fluxo de Autenticação Completo:** Páginas de Login e Registro com validação de formulário e feedback de erros/sucesso.
- **Gerenciamento de Sessão Global:** Utiliza React Context para manter o estado do usuário em toda a aplicação, com persistência no Local Storage.
- **Rotas Protegidas:** O Dashboard é uma rota privada, inacessível para usuários não autenticados.
- **Dashboard Interativo:** Exibe um resumo financeiro (receitas, despesas, saldo) e uma lista detalhada de transações.
- **CRUD de Transações:** Interface completa para Criar, Ler, Atualizar e Deletar transações, com a UI sendo atualizada em tempo real.
- **UI/UX Polida:**
  - Design responsivo e moderno com tema escuro, construído com Tailwind CSS.
  - Componentes reutilizáveis para botões, inputs, etc.
  - Notificações "Toast" para feedback ao usuário.
  - Ícones e micro-interações para uma experiência mais agradável.

## 🛠️ Tecnologias e Bibliotecas

| Categoria             | Ferramenta                                            |
| --------------------- | ----------------------------------------------------- |
| **Framework Principal** | Next.js (App Router), React                         |
| **Linguagem** | TypeScript                                            |
| **Estilização** | Tailwind CSS                                          |
| **Gerenciamento de Estado** | React Context API, React Hooks (`useState`, `useEffect`, `useCallback`) |
| **Requisições HTTP** | Axios                                                 |
| **Ícones** | `lucide-react`                                        |
| **Notificações** | `react-hot-toast`                                     |
| **Formatação** | `date-fns` (datas), `react-currency-input-field` (valores) |
| **Deploy** | Vercel                                                |

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/winstonajr/finantrack-frontend.git](https://github.com/winstonajr/finantrack-frontend.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd finantrack-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Copie o conteúdo do arquivo `.env.example` e adicione a seguinte variável:
      ```env
      NEXT_PUBLIC_API_URL=http://localhost:3001/api
      ```
    *(Certifique-se de que o [servidor do backend](https://github.com/winstonajr/finantrack-backend) está rodando localmente em `http://localhost:3001`)*

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em **[http://localhost:3000](http://localhost:3000)**.

## 📂 Estrutura do Projeto

O projeto é organizado da seguinte forma dentro da pasta `src/`:

-   `app/`: Contém todas as rotas da aplicação, seguindo a convenção do App Router.
    -   `layout.tsx`: O layout principal, com Header, Footer e providers.
    -   `globals.css`: Estilos globais e importações do Tailwind.
    -   `(page)/`: Cada pasta representa uma rota (ex: `login/`, `dashboard/`).
-   `components/`: Componentes React reutilizáveis (Button, Input, SummaryCard, etc.).
-   `context/`: O `AuthContext` para gerenciamento de estado de autenticação.
-   `lib/`: Funções utilitárias, como o cliente `axios` configurado (`api.ts`).
-   `types/`: Definições de tipos TypeScript para o projeto.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.