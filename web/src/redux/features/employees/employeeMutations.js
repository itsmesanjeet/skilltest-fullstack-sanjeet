import { gql } from '@apollo/client';

export const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      email
      mobile
      designation
      role
      location
      photo
      createdAt
      updatedAt
    }
  }
`;
