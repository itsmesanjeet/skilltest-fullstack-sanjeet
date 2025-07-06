const { gql } = require('apollo-server-express');

const employeeSchema = gql`
  scalar Upload

  type Employee {
    id: ID!
    name: String!
    email: String!
    mobile: String
    designation: String
    role: String
    location: String
    photo: String
    createdAt: String
    updatedAt: String
  }

  input EmployeeInput {
    name: String!
    email: String!
    mobile: String
    designation: String
    role: String
    location: String
    password: String
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee
    addEmployeeWithPhoto(input: EmployeeInput!, file: Upload!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;

module.exports = employeeSchema;
