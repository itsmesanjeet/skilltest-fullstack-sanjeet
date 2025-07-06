import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      email
      role
      designation
      location
      createdAt
      updatedAt
    }
  }
`;
