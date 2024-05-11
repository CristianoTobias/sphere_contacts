import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000";

// Função assíncrona para buscar todos os contatos
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

// Função assíncrona para adicionar um novo contato
export const addNewContact = createAsyncThunk(
  "contacts/addNewContact",
  async (contactData) => {
    try {
      const response = await axios.post(`${apiUrl}/add_contact/`, contactData);
      return response.data;
    } catch (error) {
      console.error("Error adding new contact:", error);
      throw error;
    }
  }
);

// Função assíncrona para remover um contato pelo ID
export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (contactId) => {
    try {
      await axios.delete(`${apiUrl}/delete_contact/${contactId}`);
      return contactId; // Retorna o ID do contato excluído
    } catch (error) {
      console.error("Error removing contact:", error);
      throw error;
    }
  }
);

// Função assíncrona para atualizar um contato no backend e no Redux
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (updatedContact) => {
    try {
      // Faz uma solicitação PUT para atualizar o contato no backend
      const response = await axios.put(
        `${apiUrl}/contacts/${updatedContact.id}/`,
        updatedContact
      );
      // Retorna os dados do contato atualizados do backend
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }
);

// Estado inicial
const initialState = {
  contacts: [],
  status: "idle",
  error: null,
  contactsFilter: null,
};

// Slice de contatos
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
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
  extraReducers(builder) {
    // Adiciona reducers para tratar os estados pendentes, bem-sucedidos e com falha para fetchContacts, addNewContact, removeContact e updateContact
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts.push(action.payload);
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove o contato excluído da lista de contatos
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedContact = action.payload;
        console.log("Updated contact:", updatedContact);
        console.log("State contacts:", state.contacts);
        state.contacts = state.contacts.map((contact) => {
          console.log("Mapping contact:", contact);
          return contact.id === updatedContact.id ? updatedContact : contact;
        });
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Exporta as actions do slice de contatos
export const { setContactsFilter, clearContactsFilter } = contactsSlice.actions;
export const selectAllContacts = (state) => state.contacts.contacts;
export const getContactsStatus = (state) => state.contacts.status;
export const getContactsError = (state) => state.contacts.error;
export const selectContactsFilter = (state) => state.contacts.contactsFilter;

export const selectFilteredContactById = (state, id) => {
  const { contacts } = state.contacts;
  return contacts.find((contact) => contact.id === parseInt(id)) || null;
};

// Reducer do slice de contatos
export default contactsSlice.reducer;
