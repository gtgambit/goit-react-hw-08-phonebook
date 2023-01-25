import { userApi } from 'services/api';
const { createAsyncThunk } = require('@reduxjs/toolkit');

export const registerUserRequest = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userApi.register(formData);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserRequest = createAsyncThunk(
  'user/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userApi.login(formData);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authUserRequest = createAsyncThunk(
  'user/auth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserDetailsRequest();

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutRequest = createAsyncThunk(
  'user/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.userLogOutRequest();
      localStorage.removeItem('token');

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
