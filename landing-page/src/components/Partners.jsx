import React from 'react';
import partner1 from '../assets/images/partner1.png';
import partner2 from '../assets/images/partner2.png';
import partner3 from '../assets/images/partner3.png';
import partner4 from '../assets/images/partner4.png';
import partner5 from '../assets/images/partner5.png';
import partner6 from '../assets/images/partner6.png';
import logoCMS from "../assets/images/logoCMS.jpg"; 

import 'swiper/css';  // Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

const Partners = () => {
  // Modern RGB color palette
  const colors = {
    primary: "#1a73e8",       // Modern blue
    secondary: "#4285f4",     // Lighter blue
    accent: "#34a853",        // Green accent
    highlight: "#ea4335",     // Red highlight
    neutral: "#fbbc05",       // Yellow/gold
    background: "linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 100%)",
    cardBg: "#ffffff",
    dark: "#1a237e",
    text: "#202124",
    lightText: "#5f6368"
  };

  const partners = [
    { name: "UPI", logo: partner1 },
    { name: "UIN", logo: partner2 },
    { name: "BAJAX", logo: partner3 },
    { name: "Kraft Heinz", logo: partner4 },
    { name: "Unilever", logo: partner5 },
    { name: "Nestle", logo: partner6 },
  ];

  return (
    <div>
      <section style={{ backgroundColor: "#ffffff", padding: "40px 0" }}></section>

      <section style={{
        position: "relative",
        padding: "60px 0 80px",
        background: colors.background,
        borderRadius: "0 0 30px 30px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)"
      }}>
        {/* Top accent bar */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.neutral} 100%)`
        }}></div>

        {/* Main logo */}
        <div style={{ 
          marginBottom: "40px",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            padding: "15px",
            backgroundColor: colors.cardBg,
            borderRadius: "16px",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-5px)",
            transition: "transform 0.3s ease",
            border: `2px solid ${colors.primary}`,
            width: "fit-content"
          }}>
            <img
              src={logoCMS}
              alt="Partner Banner"
              style={{
                width: "280px",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Section title */}
        <div style={{ 
          textAlign: "center",
          marginBottom: "40px"
        }}>
         
          <h2 style={{
            fontSize: "36px",
            fontWeight: "700",
            color: colors.dark,
            margin: "10px 0",
            position: "relative",
            display: "inline-block"
          }}>
            Trusted Partners
            <span style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "4px",
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
              borderRadius: "2px"
            }}></span>
          </h2>
          <p style={{ 
            color: colors.lightText,
            maxWidth: "600px",
            margin: "20px auto 0",
            fontSize: "16px"
          }}>
            We collaborate with industry leaders to deliver the best solutions
          </p>
        </div>

        {/* Partner logos swiper */}
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 15px"
        }}>
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            style={{
              paddingBottom: "30px",
              paddingTop: "10px"
            }}
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.cardBg,
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                  height: "160px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  border: `1px solid ${colors.secondary}30`,
                  overflow: "hidden",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.08)";
                }}
                >
                  {/* Decorative background element */}
                  <div style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                    zIndex: 0
                  }}></div>
                  
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      marginBottom: "15px",
                      zIndex: 1
                    }} 
                  />
                  <h4 style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: colors.text,
                    zIndex: 1
                  }}>
                    {partner.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View all link */}
        <div style={{
          textAlign: "center",
          marginTop: "30px"
        }}>
          <button style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(26, 115, 232, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = colors.primary;
          }}
          >
            View All Partners
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "8px" }}>
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Partners;