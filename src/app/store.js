import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/slices/contactsSlice";
import authReducer from "../features/slices/authSlice";
import usersReducer from "../features/slices/usersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
