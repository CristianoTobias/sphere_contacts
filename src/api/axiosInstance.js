import axios from "axios"; // Importa a biblioteca Axios para fazer requisições HTTP
import { jwtDecode } from "jwt-decode"; // Importa a função jwtDecode de uma biblioteca para decodificar tokens JWT
import cookies from "cookies-js"; // Importa a biblioteca cookies-js para manipulação de cookies no navegador

// Obtém a URL da API a partir de uma variável de ambiente no React
const apiUrl = process.env.REACT_APP_API_URL;

// Cria uma instância do Axios com a URL base da API
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// Intercepta as requisições antes de serem enviadas e adiciona cabeçalhos de autorização
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = cookies.get("accessToken"); // Obtém o token de acesso do cookie
    const refreshToken = cookies.get("refreshToken"); // Obtém o token de atualização do cookie

    // Verifica se há um token de acesso
    if (accessToken) {
      // Decodifica o token de acesso para obter informações
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000; // Obtém o tempo atual em segundos

      // Verifica se o token de acesso expirou
      if (decodedToken.exp < currentTime) {
        try {
          // Se o token de acesso expirou, faz uma requisição para atualizá-lo
          const response = await axios.post(`${apiUrl}/token/refresh/`, {
            refresh: refreshToken,
          });
          accessToken = response.data.access; // Obtém o novo token de acesso
          cookies.set("accessToken", accessToken); // Atualiza o token de acesso no cookie
        } catch (error) {
          // Se ocorrer um erro ao atualizar o token, expira os cookies de acesso e redireciona para a página de login
          cookies.expire("accessToken");
          cookies.expire("refreshToken");
          window.location.href = "/login";
          throw error; // Lança o erro para interromper o fluxo da requisição
        }
      }

      // Adiciona o token de acesso como cabeçalho de autorização na requisição
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config; // Retorna a configuração da requisição modificada
  },
  (error) => {
    return Promise.reject(error); // Retorna o erro para ser tratado posteriormente
  }
);

export default axiosInstance; // Exporta a instância do Axios modificada
