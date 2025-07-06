import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { MdEdit, MdFlag, MdDelete } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from './employeeQueries';

const GridView = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-400">Error loading employees</div>;

  return (
    <div className="p-6 text-white min-h-screen bg-[#0f0f1a]">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.employees?.map((employee, index) => (
          <div
            key={employee._id}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 hover:shadow-[0_0_10px_#00eaffaa] transition duration-300"
          >
            {/* Employee Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-neonBlue">{employee.name}</h3>
              <p className="text-gray-400">{employee.email}</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-neonBlue/10 rounded-full text-sm">{employee.role}</span>
                <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">{employee.designation}</span>
              </div>
              <p className="text-sm text-gray-400">Location: {employee.location}</p>
              <p className="text-sm text-gray-400">Created: {new Date(employee.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-400">Updated: {new Date(employee.updatedAt).toLocaleDateString()}</p>
            </div>

            {/* 3-dot menu button */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() => toggleMenu(index)}
                className="p-1 rounded-full hover:bg-neonBlue/20 transition cursor-pointer"
              >
                <FiMoreVertical className="text-neonBlue w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {openMenuIndex === index && (
                <div className="absolute right-0 mt-2 w-36 bg-gray-800 border border-neonBlue/30 rounded-lg shadow-lg z-10">
                  <ul className="py-1">
                    <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-neonBlue/20 cursor-pointer">
                      <MdEdit className="w-4 h-4" /> Edit
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-neonBlue/20 cursor-pointer">
                      <MdDelete className="w-4 h-4 text-red-400" /> Delete
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 cursor-pointer">
                      <MdDelete className="w-4 h-4" /> Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Avatar and Info */}
            <div className="w-20 h-20 rounded-full bg-neonBlue/20 border-2 border-neonBlue mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-neonBlue text-center">
              John Doe
            </h3>
            <p className="text-sm text-gray-400 text-center">
              Frontend Developer
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridView;
