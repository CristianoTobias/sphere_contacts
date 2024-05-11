import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://127.0.0.1/users/";

const initialState = [];

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
