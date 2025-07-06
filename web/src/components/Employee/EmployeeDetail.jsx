import React from 'react'

const EmployeeDetail = () => {
  return (
    <div className="flex flex-col flex-1 h-full">
        
        <div
          className={`flex items-center ${
            isSidebarCollapsed ? 'justify-between' : 'justify-end'
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
              className={`p-2 rounded-lg hover:bg-neonBlue/20 transition ${
                view === 'grid' ? 'bg-neonBlue/30 text-blue-500' : ''
              }`}
            >
              <FiGrid className="w-5 h-5 text-neonBlue" />
            </button>
            <button
              onClick={() => setView('tile')}
              className={`p-2 rounded-lg hover:bg-neonBlue/20 transition ${
                view === 'tile' ? 'bg-neonBlue/30 text-blue-500' : ''
              }`}
            >
              <FiList className="w-5 h-5 text-neonBlue" />
            </button>
          </div>
        </div>

        {/* View Container */}
        <div className="flex-1 overflow-y-auto p-4">
          {view === 'grid' ? <GridView /> : <TileView />}
        </div>
      </div>
  )
}

export default EmployeeDetail