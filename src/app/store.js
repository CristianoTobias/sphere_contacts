import { configureStore } from "@reduxjs/toolkit"; // Importa a função configureStore do toolkit Redux
import contactsReducer from "../features/slices/contactsSlice"; // Importa o reducer de contatos
import authReducer from "../features/slices/authSlice"; // Importa o reducer de autenticação
import usersReducer from "../features/slices/usersSlice"; // Importa o reducer de usuários

// Configura a loja Redux com os reducers fornecidos
export const store = configureStore({
  reducer: {
    contacts: contactsReducer, // Define o reducer de contatos
    auth: authReducer, // Define o reducer de autenticação
    users: usersReducer, // Define o reducer de usuários
  },
});
