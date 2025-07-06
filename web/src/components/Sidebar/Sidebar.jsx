import React, { useState, useEffect } from 'react';
import {
  FiMenu,
  FiHome,
  FiUserPlus,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import { logoutUser } from '../../redux/features/user/userThunk';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/features/user/userThunk';

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Handle token removal
  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }, [user]);

  const menuItems = [
    { label: 'Dashboard', icon: <FiHome className="w-5 h-5 text-neonBlue" />, link: "/" },
    { label: 'Add Employee', icon: <FiUserPlus className="w-5 h-5 text-neonBlue" />, link: "/addemployee" },
  ];

  return (
    <div
      className={`h-screen bg-[#10131b] text-white flex flex-col justify-between shadow-xl border-r border-neonBlue/10 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Top Section */}
      <div className="p-4 space-y-6">
        {/* Brand & Toggle */}
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-neonBlue tracking-wide drop-shadow-neon">
              Employee App
            </h1>
          )}
          <button
            className="hover:bg-neonBlue/10 p-2 rounded-md transition ml-auto"
            onClick={toggleCollapse}
          >
            <FiMenu className="text-neonBlue w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center gap-2 pt-4 pb-6 border-b border-gray-700/40">
          <div className="w-14 h-14 rounded-full bg-slate-600 border border-neonBlue text-neonBlue flex items-center justify-center font-bold text-lg shadow-inner backdrop-blur-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!isCollapsed && user && (
            <>
              <h3 className="text-base font-medium">{user.name}</h3>
              <p className="text-xs text-gray-400">{user.email}</p>
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 text-sm font-medium mt-2">
          {menuItems.map((item, idx) => (
            <Link to={item.link}>
              <div
                key={idx}
                className="flex items-center px-4 py-2 min-h-[44px] rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-200"
              >
                <div className="w-5 h-5 text-neonBlue shrink-0">{item.icon}</div>
                <span
                  className={`ml-3 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'
                    }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <div 
          onClick={handleLogout}
          className="flex items-center min-h-[44px] px-3 py-2 rounded-lg hover:bg-red-500/10 cursor-pointer transition-all text-red-400"
        >
          <div className="w-5 h-5 shrink-0">
            <FiLogOut className="w-5 h-5" />
          </div>
          <span
            className={`ml-3 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'
              }`}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
