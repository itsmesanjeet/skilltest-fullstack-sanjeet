import React, { useState } from 'react';
import { FiMenu, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md z-50">
      {/* Left: Hamburger + Brand */}
      <div className="flex items-center gap-4">
        <button className="text-neonBlue hover:bg-neonBlue/20 p-2 rounded-lg cursor-pointer">
          <FiMenu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-neonBlue drop-shadow-neon">
          Employee App
        </h1>
      </div>

      {/* Right: User Profile */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          <div className="w-8 h-8 bg-neonBlue/30 text-neonBlue font-semibold rounded-full flex items-center justify-center">
            A
          </div>
          <span className="hidden sm:block font-medium text-sm">AssaultMaster</span>
          <FiChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-neonBlue/30 rounded-lg shadow-lg z-10">
            <ul className="py-1">
              <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-100 hover:bg-neonBlue/20 cursor-pointer">
                <FiUser className="w-4 h-4" /> Profile
              </li>
              <li className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 cursor-pointer">
                <FiLogOut className="w-4 h-4" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
