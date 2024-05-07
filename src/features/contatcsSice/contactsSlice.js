import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiurl = "http://127.0.0.1:8000";

const initialState = {
  contacts: [],
  status: "idle",
  erro: null,
  contactsFilter: null,
};

export const fectchContacts = createAsyncThunk(
  "contacts/fectchContacts",
  async () => {
    const reponse = await axios.get(apiurl);
    return reponse.data;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContactsFilter: (state, action) => {
      state.contactsFilter = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fectchContacts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fectchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fectchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.erro = action.error.message;
      });
  },
});

export const { setContactsFilter } = contactsSlice.actions;
export const selectAllContacts = (state) => state.contacts.contacts;
export const getContatcsStatus = (state) => state.contacts.status;
export const getContatcsError = (state) => state.contacts.error;
export const selectContactsFilter = (state) => state.contacts.contactsFilter;

export default contactsSlice.reducer;
