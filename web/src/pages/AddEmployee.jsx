import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../redux/features/employees/employeeThunks';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    role: '',
    location: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(addEmployee(formData)).unwrap();
      setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        role: '',
        location: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-neonBlue drop-shadow-neon">
        Add New Employee
      </h2>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 text-green-400 p-4 rounded-lg mb-8">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
              placeholder="Enter password"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Mobile No</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue/40 transition"
            />
          </div>


        </div>



        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
