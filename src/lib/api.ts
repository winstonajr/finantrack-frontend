import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Esta é a parte "mágica": um interceptador.
// Antes de CADA requisição ser enviada, esta função é executada.
api.interceptors.request.use(
  (config) => {
    // Pegamos o token do localStorage
    const token = localStorage.getItem('authToken');

    // Se o token existir, nós o adicionamos ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Retorna a configuração da requisição atualizada
  },
  (error) => {
    // Se houver um erro, apenas o rejeitamos
    return Promise.reject(error);
  }
);

export default api;