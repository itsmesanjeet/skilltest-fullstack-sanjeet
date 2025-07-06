import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import GridView from '../components/Employee/GridView';
import TileView from '../components/Employee/TileView';
import Sidebar from '../components/Sidebar/Sidebar';
import { FiGrid, FiList } from 'react-icons/fi';
import AddEmployee from './AddEmployee';
import Profile from './Profile';

const Employees = () => {
  const location = useLocation();

  const [view, setView] = useState('grid');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  console.log(location.pathname);
  return (
    <div className="flex h-screen bg-[#0f0f1a] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">

        <div
          className={`flex items-center ${isSidebarCollapsed ? 'justify-between' : 'justify-end'
            } px-6 py-4 border-b border-gray-800`}
        >
          {/* App Title (when collapsed) */}
          {isSidebarCollapsed && (
            <h1 className="text-xl font-bold text-neonBlue tracking-wide drop-shadow-neon">
              Employee App
            </h1>
          )}

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg hover:bg-neonBlue/20 transition ${view === 'grid' ? 'bg-neonBlue/30 text-blue-500' : ''
                }`}
            >
              {location.pathname !== '/' ? "" : <FiGrid className="w-5 h-5 text-neonBlue" />}
            </button>
            <button
              onClick={() => setView('tile')}
              className={`p-2 rounded-lg hover:bg-neonBlue/20 transition ${view === 'tile' ? 'bg-neonBlue/30 text-blue-500' : ''
                }`}
            >
              {location.pathname !== '/' ? "" : <FiList className="w-5 h-5 text-neonBlue" />}
            </button>
          </div>
        </div>

        {/* View Container */}
        <Routes>
          <Route path='/' element={
            <div className="flex-1 overflow-y-auto p-4">
              {view === 'grid' ? <GridView /> : <TileView />}
            </div>
          } />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Employees;
