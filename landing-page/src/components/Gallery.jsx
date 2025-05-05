import React from "react";
import { Link } from "react-router-dom";
import video1 from "../assets/images/video1.mp4";

function Gallery() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#e6f0ff]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004f9f] mb-3">Explore Our Gallery</h2>
          <div className="w-24 h-1 bg-[#0066cc] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our inspiring moments and impactful stories</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 order-2 md:order-1 transform hover:scale-105 transition-all duration-300">
            <video 
              controls 
              className="w-full rounded-xl shadow-xl border-4 border-white"
              poster="/api/placeholder/600/400"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-4 text-center">
              <Link to="/about" className="text-[#0066cc] hover:text-[#004f9f] font-medium">
                View more videos &rarr;
              </Link>
            </div>
          </div>

          <div className="flex-1 order-1 md:order-2">
            <div className="bg-gradient-to-r from-[#0066cc] to-[#004f9f] text-white p-8 rounded-xl shadow-xl transform hover:shadow-2xl transition-all duration-300">
              <h3 className="text-3xl font-bold mb-5 text-white">Our Impact Stories</h3>
              <p className="mb-6 text-white/90 leading-relaxed">
                Discover a curated selection of inspiring images and videos that 
                showcase the power of change, innovation, and community support. 
                Each piece in this gallery tells a story of resilience, hope, 
                and the impact of collective efforts in improving lives.
              </p>
              <p className="mb-6 text-white/90 leading-relaxed">
                Through these visuals, we invite you to explore the transformative 
                journeys of individuals and communities as they overcome challenges 
                and inspire others to take action.
              </p>
              <div className="flex justify-center mt-8">
                <Link 
                  to="/about"
                  className="inline-block bg-white text-[#0066cc] py-3 px-8 rounded-full font-bold hover:bg-[#e6f0ff] transition-all duration-300 shadow-md"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
