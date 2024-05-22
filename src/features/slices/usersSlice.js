import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice do toolkit Redux
import axiosInstance from "../../api/axiosInstance"; // Importa a instância Axios customizada

const initialState = []; // Estado inicial vazio para a lista de usuários

// Thunk assíncrono para buscar todos os usuários
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axiosInstance.get(`/users/`); // Faz a requisição para buscar todos os usuários
  return response.data; // Retorna os dados dos usuários obtidos na resposta da requisição
});

// Slice de usuários
const usersSlice = createSlice({
  name: "users", // Nome do slice
  initialState, // Estado inicial
  reducers: {}, // Redutores para manipular ações síncronas
  extraReducers: (builder) => {
    // Redutor extra para manipular a ação assíncrona fetchUsers.fulfilled
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload; // Atualiza o estado da lista de usuários com os dados recebidos na ação
    });
  },
});

// Seletor para obter todos os usuários
export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer; // Exporta o reducer do slice de usuários
