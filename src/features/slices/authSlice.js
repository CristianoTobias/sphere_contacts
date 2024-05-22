import { createSlice } from "@reduxjs/toolkit"; // Importa a função createSlice do toolkit Redux
import axiosInstance from "../../api/axiosInstance"; // Importa a instância Axios customizada
import { jwtDecode } from "jwt-decode"; // Importa a função jwtDecode para decodificar tokens JWT
import cookies from "cookies-js"; // Importa a biblioteca cookies-js para manipulação de cookies no navegador

// Obtém os cookies do usuário, token de acesso e token de atualização
const userCookie = cookies.get("user");
const accessTokenCookie = cookies.get("accessToken");
const accessRefreshTokenCookie = cookies.get("refreshToken");

let user = null;
let accessToken = null;
let refreshToken = null;

// Se os cookies estiverem presentes, tenta parseá-los
if (userCookie && accessRefreshTokenCookie && accessTokenCookie) {
  try {
    user = JSON.parse(userCookie);
    accessToken = accessTokenCookie;
    refreshToken = accessRefreshTokenCookie;
  } catch (err) {
    console.log("Houve um erro:", err);
  }
}

// Estado inicial do slice de autenticação
const initialState = {
  user,
  accessToken,
  refreshToken,
  isLoading: false,
  error: null,
  isAuthenticated: accessToken !== null,
};

// Define o slice de autenticação
const authSlice = createSlice({
  name: "auth", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para iniciar o processo de login
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Reducer para lidar com o sucesso do login
    loginSuccess: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      const timer = 60 * 60 * 24; // Tempo de expiração dos cookies (1 dia)
      cookies.set("user", JSON.stringify(user), { expires: timer });
      cookies.set("accessToken", accessToken, { expires: timer });
      cookies.set("refreshToken", refreshToken, { expires: timer });
    },
    // Reducer para lidar com falha no login
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Reducer para lidar com sucesso no logout
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      cookies.expire("user");
      cookies.expire("accessToken");
      cookies.expire("refreshToken");
    },
    // Reducer para atualizar o token de acesso
    refreshAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      cookies.set("accessToken", action.payload.accessToken, { expires: 60 * 60 * 24 }); // Atualiza o token de acesso no cookie
    }
  },
});

// Exporta as actions do slice de autenticação
export const { loginStart, loginSuccess, loginFailure, logoutSuccess, refreshAccessToken } = authSlice.actions;

// Thunk para realizar o login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart()); // Dispara a action de início de login
    const response = await axiosInstance.post(`/token/`, credentials); // Faz a requisição para obter os tokens de acesso e atualização
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    const decodedToken = jwtDecode(accessToken); // Decodifica o token de acesso para obter informações do usuário

    dispatch(loginSuccess({ user: decodedToken, accessToken, refreshToken })); // Dispara a action de sucesso no login com os tokens e o usuário decodificado
  } catch (error) {
    const message = error.response?.data?.detail || "An unknown error occurred"; // Obtém a mensagem de erro da resposta da requisição
    dispatch(loginFailure(message)); // Dispara a action de falha no login com a mensagem de erro
    throw error; // Lança o erro para ser tratado posteriormente
  }
};

// Thunk para realizar o logout
export const logout = () => (dispatch) => {
  dispatch(logoutSuccess()); // Dispara a action de sucesso no logout
};

// Seletor para obter o estado de autenticação
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// Seletor para obter as informações do usuário
export const selectUser = (state) => state.auth.user;
// Seletor para obter o token de acesso
export const selectAccessToken = (state) => state.auth.accessToken;
// Seletor para obter o token de atualização
export const selectRefreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer; // Exporta o reducer do slice de autenticação
