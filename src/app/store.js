import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contatcsSice/contactsSlice'

export const store = configureStore({
  reducer: {
    contacts: contactsReducer
  },
});
