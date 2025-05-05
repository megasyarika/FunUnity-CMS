import React, { useState } from 'react';
import { FaSearch} from 'react-icons/fa';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Toggle profile dropdown
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-10 h-19">
      {/* Left side - Title */}
      <div className="text-lg font-semibold text-blue-800">Dashboard Admin</div>

      {/* Right side - Search and user actions */}
      <div className="flex items-center space-x-4">
        {/* Search Container */}
        <div className="relative">
          <div className="flex items-center bg-blue-50 rounded-full overflow-hidden border border-blue-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition duration-300">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-64 py-2 px-4 bg-transparent text-gray-700 outline-none text-sm"
            />
            <button className="bg-blue-600 text-white p-2 hover:bg-blue-700 transition duration-300">
              <FaSearch />
            </button>
          </div>
        </div>


          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
    </header>
  );
};

export default Header;
