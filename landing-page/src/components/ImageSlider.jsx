import React, { useState } from 'react';
import '../App.css';
import colors from '../utils/colors';

// Image imports
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import image6 from '../assets/images/image6.jpg';
import image7 from '../assets/images/image7.jpg';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Array of images and descriptions
  const images = [
    { src: image1, description: 'A beautiful sunset over the ocean.' },
    { src: image2, description: 'Snowy mountains with a clear sky.' },
    { src: image3, description: 'A vibrant city skyline at night.' },
    { src: image4, description: 'A peaceful forest pathway.' },
    { src: image5, description: 'A beach with clear turquoise water.' },
    { src: image6, description: 'A stunning waterfall in a jungle.' },
    { src: image7, description: 'A cozy cabin in the snow.' },
  ];

  // Function to go to the next slide
  const nextSlide = () => {
    if (currentIndex < images.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Indicators to show how many slides there are
  const indicators = [];
  for (let i = 0; i <= images.length - 3; i++) {
    indicators.push(
      <div
        key={i}
        className={`h-2 w-2 rounded-full mx-1 cursor-pointer transition-all duration-300 ${
          i === currentIndex ? `bg-${colors.primary} w-4` : `bg-${colors.light}`
        }`}
        onClick={() => setCurrentIndex(i)}
        style={{
          backgroundColor: i === currentIndex ? colors.primary : colors.light,
          width: i === currentIndex ? '16px' : '8px'
        }}
      />
    );
  }

  return (
    <div 
      className="relative py-12 px-6 rounded-xl"
      style={{ backgroundColor: colors.light }}
    >
      <h2 
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: colors.dark }}
      >
        Image Gallery
      </h2>

      <div className="relative flex justify-center items-center">
        {/* Previous Button */}
        <button
          className="absolute left-2 z-10 p-3 rounded-full cursor-pointer text-2xl hover:scale-110 transition-all duration-300 shadow-lg"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          style={{ 
            backgroundColor: currentIndex === 0 ? '#cccccc' : colors.primary,
            color: colors.white,
            opacity: currentIndex === 0 ? 0.5 : 1,
          }}
        >
          ‹
        </button>

        {/* Slider Container for displaying 3 images */}
        <div className="flex overflow-hidden transition-transform duration-500 ease-in-out max-w-6xl">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <div 
              key={index} 
              className="relative mx-2 flex flex-col items-center transform transition-all duration-300"
              style={{ 
                width: 'calc(33.333% - 16px)',
                transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div 
                className="w-full overflow-hidden rounded-t-lg shadow-lg"
                style={{ height: '280px' }}
              >
                <img
                  src={image.src}
                  alt={`Slide ${currentIndex + index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ 
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              </div>

              {/* Description Box */}
              <div 
                className="w-full p-4 rounded-b-lg shadow-md flex items-center justify-center transition-colors duration-300"
                style={{ 
                  backgroundColor: hoveredIndex === index ? colors.primaryHover : colors.primary,
                  minHeight: '80px'
                }}
              >
                <span className="text-white text-sm font-medium leading-relaxed">
                  {image.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="absolute right-2 z-10 p-3 rounded-full cursor-pointer text-2xl hover:scale-110 transition-all duration-300 shadow-lg"
          onClick={nextSlide}
          disabled={currentIndex >= images.length - 3}
          style={{ 
            backgroundColor: currentIndex >= images.length - 3 ? '#cccccc' : colors.primary,
            color: colors.white,
            opacity: currentIndex >= images.length - 3 ? 0.5 : 1,
          }}
        >
          ›
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-6">
        {indicators}
      </div>
      
      {/* Image Counter */}
      <div 
        className="text-center mt-4 font-medium"
        style={{ color: colors.dark }}
      >
        {currentIndex + 1}-{Math.min(currentIndex + 3, images.length)} of {images.length} images
      </div>
    </div>
  );
};

export default ImageSlider;