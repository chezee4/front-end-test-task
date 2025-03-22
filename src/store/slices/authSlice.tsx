import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, LoginCredentials, LoginFailureResponse, LoginSuccessResponse } from '@/store/types/auth';
import { User } from '@/types/user';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  data: {},
  status: 'idle',
  userInfo: {
    email: '',
    name: '',
    id: 0,
    role: '',
  },
};

export const loginUser = createAsyncThunk<
  LoginSuccessResponse,
  LoginCredentials,
  { rejectValue: LoginFailureResponse }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const isCredentialsValid =
      email === 'test@test.test' && password === 'password';

    if (isCredentialsValid) {
      return {
        user: {
          email,
          name: email.split('@')[0],
          id: Math.random(),
          role: 'user',
        },
        message: 'Login successful',
      };
    }
    return rejectWithValue({
      error: 'Invalid email or password',
      message: 'Login failed: Invalid email or password',
    });
  } catch (error) {
    return rejectWithValue({
      error: error instanceof Error ? error.message : 'Something went wrong',
      message: 'Login failed',
    });
  }
});

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    updateUserInfo(state, action: PayloadAction<Partial<User>>) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
        state.data = {};
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginSuccessResponse>) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.loading = false;
          state.error = null;
          state.status = 'succeeded';
          state.data = action.payload.user;
          state.userInfo = {
            ...state.userInfo,
            ...action.payload.user,
          };
        },
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<LoginFailureResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error || 'Unknown error';
          state.status = 'failed';
          state.data = {};
          state.user = null;
        },
      );
  },
});

export const { logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
