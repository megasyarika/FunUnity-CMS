import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing a search icon

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 ml-8 mr-8 bg-white shadow-md rounded-md mb-4 w-1xl">
      {/* Logo or Title */}
      <div className="text-sm font-medium text-gray-800">Dashboard Admin</div>

      {/* Search Container */}
      <div className="flex items-center w-1/4 max-w-xs bg-gray-50 p-1 rounded-md shadow-sm border border-gray-300">
        <FaSearch className="text-gray-500 mr-2" /> {/* Search icon */}
        
        {/* Search Box */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-1 bg-transparent text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </div>
  );
};

export default Header;
