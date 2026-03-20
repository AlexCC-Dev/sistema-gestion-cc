import React from 'react';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'leads', label: 'Leads', icon: '' },
    { id: 'campaigns', label: 'Campañas', icon: '' },
    { id: 'reports', label: 'Reportes', icon: '' }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold">C&C Asesores</h1>
        <p className="text-sm text-gray-400 mt-1">Módulo Marketing</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
              activeTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;