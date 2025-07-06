import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee } from './employeeThunks';

const initialState = {
  employees: [],
  loading: false,
  error: null,
  success: null,
  selectedEmployee: null
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.success = 'Employees fetched successfully';
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = null;
      })
      // Add Employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = [...state.employees, action.payload];
        state.success = 'Employee added successfully';
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = null;
      });
  },
});

export const { setSelectedEmployee, clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
