import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserRequest,
  loginUserRequest,
  authUserRequest,
  logOutRequest,
} from './thunk';

const initialState = {
  userData: null,
  token: null,
  isLoading: false,
  error: null,
};
// BLL - business logic layer(Redux)
const userSlice = createSlice({
  // Ім'я слайсу
  name: 'user',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  //reducers: {},
  extraReducers: builder =>
    builder
      // Register

      .addCase(registerUserRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(registerUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login

      .addCase(loginUserRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(loginUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Auth User

      .addCase(authUserRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(authUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Log Out

      .addCase(logOutRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOutRequest.fulfilled, state => {
        state.isLoading = false;
        state.token = null;
        state.userData = null;
      })
      .addCase(logOutRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export default userSlice.reducer;
