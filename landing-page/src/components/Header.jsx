import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoCMS from "../assets/images/logoCMS.jpg";
import colors from '../utils/colors'; // Import our new color scheme

function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const toggleDonateForm = (event) => {
    event.preventDefault();
    setShowDonateForm(!showDonateForm);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-black bg-opacity-90' : 'py-4 bg-black bg-opacity-70'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logoCMS} alt="YMP Logo" className="h-14 w-auto" />
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {/* Who We Are Dropdown */}
            <li className="relative group">
              <button
                onClick={() => toggleDropdown('who')}
                className="text-white py-2 px-3 font-medium hover:text-blue-300 transition-colors duration-200 flex items-center"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'who'}
              >
                Who We Are
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'who' && (
                <div 
                  className="absolute top-full left-0 w-48 py-2 mt-1 rounded-lg shadow-xl z-10 transform transition-all duration-200" 
                  style={{ backgroundColor: colors.primary }}
                  role="menu"
                >
                  <Link to="/about" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    About YMP
                  </Link>
                  <Link to="/contact" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    Contact
                  </Link>
                  <Link to="/" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    Home
                  </Link>
                </div>
              )}
            </li>

            {/* What We Do Dropdown */}
            <li className="relative group">
              <button
                onClick={() => toggleDropdown('what')}
                className="text-white py-2 px-3 font-medium hover:text-blue-300 transition-colors duration-200 flex items-center"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'what'}
              >
                What We Do
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'what' && (
                <div 
                  className="absolute top-full left-0 w-48 py-2 mt-1 rounded-lg shadow-xl z-10" 
                  style={{ backgroundColor: colors.primary }}
                  role="menu"
                >
                  <Link to="/program" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    Program
                  </Link>
                  <Link to="/campaign" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    Campaign
                  </Link>
                </div>
              )}
            </li>

            {/* Moving Together Dropdown */}
            <li className="relative group">
              <button
                onClick={() => toggleDropdown('moving')}
                className="text-white py-2 px-3 font-medium hover:text-blue-300 transition-colors duration-200 flex items-center"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'moving'}
              >
                Moving Together
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'moving' && (
                <div 
                  className="absolute top-full left-0 w-48 py-2 mt-1 rounded-lg shadow-xl z-10" 
                  style={{ backgroundColor: colors.primary }}
                  role="menu"
                >
                  <Link to="/volunteers" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    Volunteers
                  </Link>
                  <Link to="/donationinnature" className="block text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-200" role="menuitem">
                    Donation in Nature
                  </Link>
                </div>
              )}
            </li>

            {/* Donation Button */}
            <li>
              <button 
                onClick={toggleDonateForm}
                className="ml-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.white
                }}
              >
                Donate Now
              </button>
            </li>
          </ul>
        </nav>

        {/* Search & Hotline Section */}
        <div className="hidden lg:flex items-center">
          <div className="relative mr-4">
            <input 
              type="text" 
              placeholder="Search" 
              className="py-2 pl-4 pr-10 rounded-full text-sm focus:outline-none" 
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="text-white text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>0821-1923-1293</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

      </div>

      {/* Donation Modal - Same as in Hero component */}
      {showDonateForm && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: colors.overlay }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden"
            style={{ animation: 'fadeIn 0.3s' }}
          >
            {/* Blue header bar */}
            <div 
              className="py-6 px-8 text-center"
              style={{ backgroundColor: colors.primary }}
            >
              <h3 className="text-2xl font-bold text-white">Donate Now</h3>
              <p className="text-sm text-white opacity-90 mt-1">
                Your generosity creates lasting change
              </p>
            </div>
            
            <button 
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={toggleDonateForm}
            >
              ×
            </button>
            
            <div className="px-8 py-6">
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                    title="Please enter a valid Gmail address"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Donation Amount (IDR)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^\d]/g, '');
                      if (value) {
                        e.target.value = `Rp ${Number(value).toLocaleString()}`;
                      } else {
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                
                <div className="mb-4">
                  <textarea
                    placeholder="Add a message or description (optional)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  }}
                >
                  Complete Donation
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </header>
  );
}

export default Header;