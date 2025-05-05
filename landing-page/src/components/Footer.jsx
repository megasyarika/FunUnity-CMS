import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  // Modern RGB color theme
  const colors = {
    primary: "#1a73e8",       // Modern Google-style blue
    primaryHover: "#1557b0",  // Darker blue for hover states
    secondary: "#4285f4",     // Secondary blue (lighter)
    accent: "#34a853",        // Accent green for contrast
    light: "#e8f0fe",         // Very light blue for backgrounds
    dark: "#1a237e",          // Very dark blue for text
    darkBg: "#202124",        // Dark background
    grayBg: "#303134",        // Slightly lighter gray for sections
    textLight: "#ffffff",
    textMuted: "#9aa0a6"
  };

  return (
    <footer className="text-white" style={{ backgroundColor: colors.darkBg }}>
      {/* Subscription Bar */}
      <div style={{ backgroundColor: colors.grayBg }} className="py-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 gap-6">

        </div>
      </div>

      {/* Footer Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {/* About Us */}
          <div>
            <h3 className="font-bold text-xl mb-4" style={{ color: colors.primary }}>About Us</h3>
            <p className="mb-4" style={{ color: colors.textLight }}>
              FundUnity CMS is dedicated to helping individuals and organizations come together to fund and support important causes.
            </p>
            <div style={{ color: colors.textMuted }} className="space-y-2">
              <div className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3"></i>
                <span>0852 - 1310 - 3997</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <span>yukmariproject@gmail.com</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>PT. Yuk Mari Project Indonesia, Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Kota Bandung, Jawa Barat 40286</span>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="mt-6">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.4104645402554!2d107.67505759999999!3d-6.9608114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c300070c60c1%3A0xddd74453cb6ef1a!2sPT.%20YUKMARI%20PROJECT%20INDONESIA!5e0!3m2!1sid!2sid!4v1740843636608!5m2!1sid!2sid"
                  width="100%" 
                  height="220" 
                  style={{ border: '0' }} 
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <a 
                  href="https://maps.app.goo.gl/7pdXU75EiCQLyc746" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center justify-center gap-2"
                  style={{ color: colors.secondary }}
                >
                  <span>View larger map</span>
                  <i className="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Who We Are Section */}
          <div>
            <h3 className="font-bold text-xl mb-4" style={{ color: colors.primary }}>Who We Are</h3>
            <ul className="space-y-3" style={{ color: colors.textLight }}>
              {['About YMP', 'Partners', 'Contact'].map((item, i) => (
                <li key={i} className="transition-all duration-300 hover:translate-x-2">
                  <div className="flex items-center cursor-pointer group">
                    <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                       style={{ color: colors.primary }}></i>
                    <span className="hover:text-blue-400">{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Moving Together Section */}
          <div>
            <h3 className="font-bold text-xl mb-4" style={{ color: colors.primary }}>Moving Together</h3>
            <ul className="space-y-3" style={{ color: colors.textLight }}>
              {['Volunteers', 'Donation in Nature'].map((item, i) => (
                <li key={i} className="transition-all duration-300 hover:translate-x-2">
                  <div className="flex items-center cursor-pointer group">
                    <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                       style={{ color: colors.primary }}></i>
                    <span className="hover:text-blue-400">{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Do Section */}
          <div>
            <h3 className="font-bold text-xl mb-4" style={{ color: colors.primary }}>What We Do</h3>
            <ul className="space-y-3" style={{ color: colors.textLight }}>
              {['Program', 'Campaign'].map((item, i) => (
                <li key={i} className="transition-all duration-300 hover:translate-x-2">
                  <div className="flex items-center cursor-pointer group">
                    <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                       style={{ color: colors.primary }}></i>
                    <span className="hover:text-blue-400">{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="py-4 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="container mx-auto px-4">
          <p style={{ color: colors.textMuted }}>
            © {new Date().getFullYear()} FundUnity CMS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;