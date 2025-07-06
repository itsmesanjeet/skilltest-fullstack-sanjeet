import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../../apollo/client';
import { ADD_EMPLOYEE_MUTATION } from './employeeMutations';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: gql`
          query Employees {
            employees {
              id
              name
              email
              mobile
              designation
              role
              location
              photoUrl
              createdAt
              updatedAt
            }
          }
        `
      });
      return data.employees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_EMPLOYEE_MUTATION,
        variables: {
          input: employeeData
        }
      });

      return data.addEmployee;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);