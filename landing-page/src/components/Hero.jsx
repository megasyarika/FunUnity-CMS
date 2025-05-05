import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hero6 from '../assets/images/hero6.jpg';
import colors from '../utils/colors'; // Import our new color scheme

const Hero = () => {
  const [showDonateForm, setShowDonateForm] = useState(false);
  const navigate = useNavigate();

  const toggleDonateForm = () => {
    setShowDonateForm(!showDonateForm);
  };

  return (
    <>
      {/* Hero Section with Gradient Overlay */}
      <section 
        className="relative h-screen flex items-center" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${hero6})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-2xl" style={{ marginLeft: '5%' }}>
            <h1 
              className="text-5xl font-bold mb-4 leading-tight"
              style={{ color: colors.white }}
            >
              Together, Creating Change with YukMariProject
            </h1>
            <h2 
              className="text-xl mb-8" 
              style={{ color: colors.light }}
            >
              Join us in making a meaningful impact for those in need and building a better future.
            </h2>
            <a href="/gallery">
              <button 
                className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.white,
                  boxShadow: '0 4px 14px rgba(26, 115, 232, 0.4)'
                }}
              >
                Let's Get Moving
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Action Buttons Section with Wave Divider */}
      <section className="relative py-16 bg-white">
        {/* SVG Wave Divider */}
        <div className="absolute top-0 left-0 right-0" style={{ transform: 'translateY(-99%)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,128C960,160,1056,224,1152,224C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <button
              className="w-full py-4 text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: colors.white,
                boxShadow: '0 8px 20px rgba(26, 115, 232, 0.3)'
              }}
              onClick={toggleDonateForm}
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Modern Donation Modal */}
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
    </>
  );
};

export default Hero;