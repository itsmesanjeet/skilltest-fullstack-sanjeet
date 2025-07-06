const Employee = require('../../models/Employee.js');
const path = require('path');
const fs = require('fs');

const User = require('../../models/User.js');
const bcrypt = require('bcryptjs');

const employeeResolver = {
  Query: {
    employees: async (_, __, { token }) => {
      if (!token) throw new Error('Unauthorized');
      
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found');
        
        // Get employees for this user
        return await Employee.find({ userId: user._id });
      } catch (error) {
        throw new Error('Invalid token');
      }
    },
    employee: async (_, { id }) => await Employee.findById(id),
  },

  Mutation: {
    addEmployee: async (_, { input }, { token }) => {
      if (!token) throw new Error('Unauthorized');

      // Check if user already exists
      const existingUser = await User.findOne({ email: input.email });
      
      // Create or get user
      const user = existingUser || await User.create({
        name: input.name,
        email: input.email,
        password: await bcrypt.hash(input.password, 10),
        role: input.role
      });

      // Create employee linked to user
      const employee = await Employee.create({
        ...input,
        userId: user._id
      });

      return employee;
    },

    addEmployeeWithPhoto: async (_, { input, file }, { token }) => {
      if (!token) throw new Error('Unauthorized');

      const photo = await storeUpload(file);
      return await Employee.create({ ...input, photo });
    },

    updateEmployee: async (_, { id, input }, { token }) => {
      if (!token) throw new Error('Unauthorized');

      const targetEmployee = await Employee.findById(id);
      if (!targetEmployee) throw new Error('Employee not found');

      // Role-based update restriction
      if (
        user.role === 'Manager' &&
        (targetEmployee.role === 'Manager' || targetEmployee.role === 'Admin')
      ) {
        throw new Error('Managers can only update Users');
      }

      return await Employee.findByIdAndUpdate(id, input, { new: true });
    },

    deleteEmployee: async (_, { id }, { token }) => {
      if (!token) throw new Error('Unauthorized');

      if (user.role !== 'Admin') {
        throw new Error('Only admins can delete employees');
      }

      const employee = await Employee.findById(id);
      if (!employee) throw new Error('Employee not found');

      await Employee.findByIdAndDelete(id);
      return true;
    },
  },
};

module.exports = employeeResolver;
