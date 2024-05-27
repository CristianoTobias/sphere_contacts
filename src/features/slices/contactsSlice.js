import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importa as funções createAsyncThunk e createSlice do toolkit Redux
import axiosInstance from "../../api/axiosInstance"; // Importa a instância Axios customizada

// Thunk assíncrono para buscar os contatos do usuário
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts", // Nome da ação
  async (_, { rejectWithValue, getState }) => {
    // Payload vazio e objetos adicionais (opcional)
    try {
      // Obtém o ID do usuário logado do estado do Redux
      const userId = getState().auth.userId;

      // Faz a requisição para buscar todos os contatos
      const response = await axiosInstance.get(`/user-contacts/`);

      // Filtra os contatos pelo ID do usuário
      const userContacts = response.data.filter(
        (contact) => contact.userId === userId
      );

      // Retorna os contatos filtrados
      return userContacts;
    } catch (error) {
      // Tratamento de erros
      const errorMessage = error.response?.data?.detail || error.message;
      const status = error.response?.status || 500;
      const serializableError = {
        message: errorMessage,
        status: status,
      };
      return rejectWithValue(serializableError);
    }
  }
);

// Thunk assíncrono para adicionar um novo contato
export const addNewContact = createAsyncThunk(
  "contacts/addContact", // Nome da ação
  async (contactData, { getState, rejectWithValue }) => {
    // Payload com os dados do novo contato e objetos adicionais (opcional)
    try {
      const state = getState();
      const existingContacts = state.contacts.contacts;

      const isDuplicate = existingContacts.some(
        (contact) => contact.name === contactData.name
      );

      if (isDuplicate) {
        return rejectWithValue("duplicate");
      }
      const isDuplicatePhone = existingContacts.some(
        (contact) => contact.phone === contactData.phone
      );

      if (isDuplicatePhone) {
        return rejectWithValue("duplicatePhone");
      }

      // Se não houver duplicatas, continuar com a adição do contato
      const response = await axiosInstance.post(`/add_contact/`, contactData);
      return response.data;
    } catch (error) {
      // Tratamento de erros
      const errorMessage = error.response?.data?.detail || error.message;
      const status = error.response?.status || 500;
      const serializableError = {
        message: errorMessage,
        status: status,
      };
      return rejectWithValue(serializableError);
    }
  }
);

// Thunk assíncrono para remover um contato
export const removeContact = createAsyncThunk(
  "contacts/removeContact", // Nome da ação
  async (contactId, { rejectWithValue }) => {
    // Payload com o ID do contato a ser removido e objetos adicionais (opcional)
    try {
      await axiosInstance.delete(`/delete_contact/${contactId}`);
      return contactId;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      const status = error.response?.status || 500; // Status padrão em caso de erro desconhecido
      const serializableError = {
        message: errorMessage,
        status: status,
      };
      return rejectWithValue(serializableError);
    }
  }
);

// Thunk assíncrono para atualizar um contato
export const updateContact = createAsyncThunk(
  "contacts/updateContact", // Nome da ação
  async (updatedContact, { rejectWithValue }) => {
    // Payload com os dados atualizados do contato
    try {
      const response = await axiosInstance.put(
        `/contacts/${updatedContact.id}/`,
        updatedContact
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      const status = error.response?.status || 500; // Status padrão em caso de erro desconhecido
      const serializableError = {
        message: errorMessage,
        status: status,
      };
      return rejectWithValue(serializableError);
    }
  }
);

// Estado inicial do slice de contatos
const initialState = {
  contacts: [], // Array de contatos
  status: "idle", // Estado da requisição (idle, loading, succeeded, failed)
  error: null, // Objeto de erro
  contactsFilter: null, // Filtro de contatos
};

// Slice de contatos
const contactsSlice = createSlice({
  name: "contacts", // Nome do slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para definir o filtro de contatos
    setContactsFilter: (state, action) => {
      state.contactsFilter = action.payload;
    },
    // Reducer para limpar o filtro de contatos
    clearContactsFilter: (state) => {
      state.contactsFilter = null;
    },
  },
  extraReducers: (builder) => {
    // Reducers adicionais para manipular as ações assíncronas
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading"; // Define o estado como carregando
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded"; // Define o estado como bem-sucedido
        state.contacts = action.payload; // Atualiza os contatos com os dados recebidos
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed"; // Define o estado como falha
        state.error = action.payload; // Armazena o erro
      })
      .addCase(addNewContact.pending, (state) => {
        state.status = "loading"; // Define o estado como carregando
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.status = "succeeded"; // Define o estado como bem-sucedido
        state.contacts.push(action.payload); // Adiciona o novo contato à lista de contatos
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.status = "failed"; // Define o estado como falha
        state.error = action.payload; // Armazena o erro
      })
      .addCase(removeContact.pending, (state) => {
        state.status = "loading"; // Define o estado como carregando
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.status = "succeeded"; // Define o estado como bem-sucedido
        // Remove o contato da lista de contatos
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.status = "failed"; // Define o estado como fal
      })
      .addCase(updateContact.pending, (state) => {
        state.status = "loading"; // Define o estado como carregando
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = "succeeded"; // Define o estado como bem-sucedido
        const updatedContact = action.payload;
        // Atualiza o contato na lista de contatos
        state.contacts = state.contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = "failed"; // Define o estado como falha
        state.error = action.payload; // Armazena o erro
      });
  },
});

// Exporta as actions do slice de contatos
export const { setContactsFilter, clearContactsFilter } = contactsSlice.actions;

// Seletor para obter todos os contatos
export const selectAllContacts = (state) => state.contacts.contacts;
// Seletor para obter o estado da requisição
export const getContactsStatus = (state) => state.contacts.status;
// Seletor para obter o objeto de erro
export const getContactsError = (state) => state.contacts.error;
// Seletor para obter o filtro de contatos
export const selectContactsFilter = (state) => state.contacts.contactsFilter;

// Seletor para obter um contato filtrado por ID
export const selectFilteredContactById = (state, id) => {
  const { contacts } = state.contacts;
  return contacts.find((contact) => contact.id === parseInt(id)) || null;
};

export default contactsSlice.reducer; // Exporta o reducer do slice de contatos
