import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employees/employeeSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
