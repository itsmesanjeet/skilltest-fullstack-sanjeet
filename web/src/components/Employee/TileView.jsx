import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { MdEdit, MdFlag, MdDelete } from 'react-icons/md';

const TileView = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="p-6 min-h-screen text-white">

      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between 
              bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
              p-5 rounded-2xl 
              hover:shadow-[0_0_10px_#00eaffaa] 
              transition-all duration-300"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-neonBlue/20 border-2 border-neonBlue flex items-center justify-center font-semibold text-neonBlue">
                JD
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neonBlue">John Doe</h3>
                <p className="text-sm text-gray-400">Senior Product Designer</p>
              </div>
            </div>

            {/* Menu Button */}
            <div className="relative">
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
                      <MdFlag className="w-4 h-4" /> Flag
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 cursor-pointer">
                      <MdDelete className="w-4 h-4" /> Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TileView;
