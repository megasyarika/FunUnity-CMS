import { useState } from "react";
import { FaHome, FaInfoCircle, FaList, FaCreditCard, FaCog, FaSignOutAlt, FaBars, FaImages, FaHandshake } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoCMS from "../assets/images/logoCMS.jpg";

const Sidebar = ({
  isSidebarOpen,
  onToggleSidebar,
  isLoggedIn,
}: {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isLoggedIn: boolean;
}) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Sidebar component only renders if the user is logged in
  if (!isLoggedIn) return null;

  // Handle logout button click
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  // Handle logout confirmation
  const handleConfirmLogout = () => {
    // Clear any authentication data
    localStorage.clear();
    // Close the modal
    setShowLogoutModal(false);
    // Navigate to login page
    navigate("/login");
  };

  // Close the modal
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div
        className={`flex flex-col bg-gradient-to-b from-blue-400 to-blue-900 text-white h-full shadow-lg fixed top-0 left-0 bottom-0 transition-all duration-300 z-20`}
        style={{
          width: isSidebarOpen ? "250px" : "80px",
          transition: "width 0.3s ease-in-out",
        }}
      >
        {/* Container for logo and toggle button */}
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          {isSidebarOpen && (
            <div className="flex justify-center">
              <img src={logoCMS} alt="Logo" className="pr-1 w-35 h-auto rounded-md" />
            </div>
          )}

          {/* Toggle Button (Hamburger) */}
          <button
            onClick={onToggleSidebar}
            className="text-white hover:text-blue-300 transition-colors duration-200"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Divider */}
        <div className="border-b border-blue-800 opacity-30 my-2"></div>

        {/* Navigation Links */}
        <div className="flex flex-col mt-4 px-2">
          <Link
            to="/home"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "home" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaHome className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Home</span>}
          </Link>

          <Link
            to="/aboutus"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "aboutus" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("aboutus")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaInfoCircle className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">About Us</span>}
          </Link>

          <Link
            to="/imageslider"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "imageslider" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("imageslider")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaImages className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Image Slider</span>}
          </Link>

          <Link
            to="/programs"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "programs" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("programs")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaList className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Programs</span>}
          </Link>

          <Link
            to="/transaksi"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "transactions" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("transactions")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaCreditCard className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Transactions</span>}
          </Link>

          <Link
            to="/partners"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "partners" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("partners")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaHandshake className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Partners</span>}
          </Link>

          <Link
            to="/settings"
            className={`flex items-center py-3 px-4 mb-2 rounded-lg transition-all duration-200 ${
              hoveredLink === "settings" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-blue-100 hover:bg-blue-800"
            }`}
            onMouseEnter={() => setHoveredLink("settings")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FaCog className={`${isSidebarOpen ? "mr-3" : "mx-auto"} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </Link>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogoutClick}
            className="flex items-center justify-center py-3 px-4 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-400 transition-colors duration-300 shadow-md"
          >
            <FaSignOutAlt className={`${isSidebarOpen ? "mr-3" : ""} text-xl`} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Apakah Anda Yakin Ingin Logout?</h2>
            <div className="flex gap-4 justify-end">
              {/* Confirm Button */}
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700"
                onClick={handleConfirmLogout}
              >
                Lanjut
              </button>
              {/* Cancel Button */}
              <button
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-600"
                onClick={handleCancelLogout}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;