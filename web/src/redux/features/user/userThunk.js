import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../apollo/client';

import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  LOAD_USER_QUERY,
  LOGOUT_MUTATION,
  GET_CURRENT_USER
} from './userQueries';

export const loadToken = createAsyncThunk(
  'user/loadToken',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      // Fetch user details after loading token
      const result = await dispatch(getCurrentUser());
      
      // If user data was successfully fetched, return token
      if (result.meta.requestStatus === 'fulfilled') {
        return token;
      }

      // If user data fetch failed, return null
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input: {
            email: credentials.email,
            password: credentials.password
          }
        }
      });

      if (!data?.loginUser) {
        throw new Error('Login failed: Invalid credentials');
      }

      // Store token and user data in localStorage
      localStorage.setItem('token', data.loginUser.token);
      localStorage.setItem('user', JSON.stringify(data.loginUser.user));

      // Store token in localStorage
      localStorage.setItem('token', data.loginUser.token);
      
      // Navigate to dashboard
      window.location.href = '/';
      
      return data.loginUser;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          name: userData.name,
          email: userData.email,
          password: userData.password
        }
      });
      return data.register;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  'user/load',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const { data } = await client.query({
        query: LOAD_USER_QUERY,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      });

      if (!data?.me) {
        throw new Error('Failed to load user data');
      }

      return data.me;
    } catch (error) {
      console.error('Load user error:', error);
      return rejectWithValue(error.message || 'Failed to load user data');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      
      // Clear user state
      dispatch(userSlice.actions.clearUser());
      
      // Return a success message
      return { success: true, message: 'Successfully logged out' };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: true, message: 'Successfully logged out' };
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_CURRENT_USER
      });

      return data.me;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
