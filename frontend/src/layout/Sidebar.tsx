import { useState } from "react";
import { FaHome, FaInfoCircle, FaList, FaCreditCard, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
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
        className={`flex flex-col bg-white text-gray-800 h-full shadow-md fixed top-0 left-0 bottom-0 p-4 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        style={{
          width: isSidebarOpen ? "250px" : "80px",
          transition: "width 0.3s ease-in-out", // smooth transition for width change
        }}
      >
        {/* Container for logo and toggle button */}
        <div className="flex justify-between items-center mb-4">
          {/* Logo */}
          {isSidebarOpen && (
            <div className="flex justify-center mb-4">
              <img src={logoCMS} alt="Logo" className="w-30 h-auto" />
            </div>
          )}

          {/* Toggle Button (Hamburger) on the right */}
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 hover:text-gray-800 ml-4 mb-3"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <Link
          to="/home"
          className={`flex items-center py-3 px-4 mb-4 rounded-lg transition-colors duration-300 hover:bg-blue-100 ${
            hoveredLink === "home" ? "bg-blue-100" : ""
          }`}
          onMouseEnter={() => setHoveredLink("home")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {isSidebarOpen ? (
            <FaHome className="mr-3 text-blue-600" />
          ) : (
            <FaHome className="mr-3 text-blue-600" />
          )}
          {isSidebarOpen && <span>Home</span>}
        </Link>

        <Link
          to="/aboutus"
          className={`flex items-center py-3 px-4 mb-4 rounded-lg transition-colors duration-300 hover:bg-blue-100 ${
            hoveredLink === "aboutus" ? "bg-blue-100" : ""
          }`}
          onMouseEnter={() => setHoveredLink("aboutus")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {isSidebarOpen ? (
            <FaInfoCircle className="mr-3 text-blue-600" />
          ) : (
            <FaInfoCircle className="mr-3 text-blue-600" />
          )}
          {isSidebarOpen && <span>About Us</span>}
        </Link>

        <Link
          to="/programs"
          className={`flex items-center py-3 px-4 mb-4 rounded-lg transition-colors duration-300 hover:bg-blue-100 ${
            hoveredLink === "programs" ? "bg-blue-100" : ""
          }`}
          onMouseEnter={() => setHoveredLink("programs")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {isSidebarOpen ? (
            <FaList className="mr-3 text-blue-600" />
          ) : (
            <FaList className="mr-3 text-blue-600" />
          )}
          {isSidebarOpen && <span>Programs</span>}
        </Link>

        <Link
          to="/transaksi"
          className={`flex items-center py-3 px-4 mb-4 rounded-lg transition-colors duration-300 hover:bg-blue-100 ${
            hoveredLink === "transactions" ? "bg-blue-100" : ""
          }`}
          onMouseEnter={() => setHoveredLink("transactions")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {isSidebarOpen ? (
            <FaCreditCard className="mr-3 text-blue-600" />
          ) : (
            <FaCreditCard className="mr-3 text-blue-600" />
          )}
          {isSidebarOpen && <span>Transactions</span>}
        </Link>

        <Link
          to="/settings"
          className={`flex items-center py-3 px-4 mb-4 rounded-lg transition-colors duration-300 hover:bg-blue-100 ${
            hoveredLink === "settings" ? "bg-blue-100" : ""
          }`}
          onMouseEnter={() => setHoveredLink("settings")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {isSidebarOpen ? (
            <FaCog className="mr-3 text-blue-600" />
          ) : (
            <FaCog className="mr-3 text-blue-600" />
          )}
          {isSidebarOpen && <span>Settings</span>}
        </Link>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogoutClick}
            className="flex items-center py-3 px-4 w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaSignOutAlt className="mr-3 text-white" />
            {isSidebarOpen && <span>Logout</span>}
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