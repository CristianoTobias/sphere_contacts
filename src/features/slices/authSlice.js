import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';import cookies from "cookies-js";

const userCookie = cookies.get("user");
const accessTokenCookie = cookies.get("accessToken");
const accessRefreshTokenCookie = cookies.get("refreshToken");

let user = null;
let accessToken = null;
let refreshToken = null;

if (userCookie && accessRefreshTokenCookie && accessTokenCookie) {
  try {
    user = JSON.parse(userCookie);
    accessToken = accessTokenCookie;
    refreshToken = accessRefreshTokenCookie;
  } catch (err) {
    console.log("Houve um erro!");
  }
}

const initialState = {
  user,
  accessToken,
  refreshToken,
  isLoading: false,
  error: null,
  isAuthenticated: accessToken !== null,
};

const apiUrl = "http://127.0.0.1:8000";

// Slice de autenticação
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const timers = 60 * 84600;
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      cookies.set("user", user, { expires: timers });
      cookies.set("accessToken", accessToken, { expires: timers });
      cookies.set("refreshToken", refreshToken, { expires: timers });
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      cookies.expire("user");
      cookies.expire("accessToken");
      cookies.expire("refreshToken");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  authSlice.actions;

export const login = (credential) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${apiUrl}/token/`, credential);
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    const decodedToken = jwtDecode(accessToken);
    dispatch(loginSuccess({ user: decodedToken, accessToken, refreshToken }));
    const timer = 240;
    const interValid = setInterval(() => {
      dispatch(refreshAccessToken());
    }, timer * 1000);
    dispatch({ type: "SET_INTERVAL_ID", payload: interValid });
  } catch (error) {
    const message =
      error.response?.data?.detail || "Um erro desconhecido ocorreu";
    dispatch(loginFailure(message));
    throw error;
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export const refreshAccessToken = () => async (dispatch, getState) => {
  try {
    const newRefreshToken = cookies.get("refreshToken");
    const response = await axios.post(`${apiUrl}/token/refresh/`, {
      refresh: newRefreshToken,
    });
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    const decodedToken = jwtDecode(accessToken);
    const user = decodedToken;
    dispatch(loginSuccess({ user, accessToken, refreshToken }));
  } catch (error) {
    dispatch(logout());
  }
};

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
