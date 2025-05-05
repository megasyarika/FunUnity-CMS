import React from 'react';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';

function Programs() {
  const programData = [
    {
      title: "Yuk Mari Project",
      description: "Striving to create independent food security at the community level.",
      logo: image1,  // Logo image1
      isQurban: false
    },
    {
      title: "Yuk Mari Project",
      description: "A joint movement by the community donate Indonesia.",
      logo: image2,  // Logo image2
      isQurban: false
    },
    {
      title: "Yuk Mari Project",
      description: "To Remote Areas is an annual program of Community Donate of Indonesia.",
      logo: image3,  // Logo image3
      isQurban: false
    }
  ];

  return (
    <section className="bg-[#e6f0ff] py-16 min-h-screen flex flex-col items-center">
      {/* Teks Slogan */}
      <div className="text-center text-[#004f9f] font-bold text-3xl mb-12 w-full max-w-5xl">
        Melalui program-program yang bersinergi, Yuk Mari Project berusaha untuk menciptakan Indonesia yang bebas dari kelaparan.
      </div>

      {/* Program Cards */}
      <section className="container mx-auto px-10">
        <div className="flex flex-wrap justify-center gap-8">
          {programData.map((program, index) => (
            <div 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 h-100" 
              key={index}
            >
              <div className="flex flex-col justify-between p-6 h-full">
                {program.isQurban ? (
                  <h3 className="text-red-700 text-2xl font-bold mb-4">Qurban hingga Pelosok</h3>
                ) : (
                  <img 
                    src={program.logo || "/api/placeholder/150/150"} 
                    alt={`${program.title} Logo`} 
                    className="w-full h-40 object-cover rounded-lg mb-4" 
                  />
                )}
                <h3 className="text-[#004f9f] text-xl font-semibold mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{program.description}</p>
                <a 
                  href="#detail" 
                  className="inline-block bg-[#0066cc] text-white py-2 px-6 rounded-full text-lg font-bold transition duration-300 hover:bg-[#004f9f]"
                >
                  Detail
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Other Programs Button */}
        <div className="flex justify-center mt-8">
          <button className="btn btn-primary bg-[#0066cc] text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-[#004f9f] transition duration-300">
            Other Programs &gt;
          </button>
        </div>
      </section>

      {/* Padding bottom added to give space below section */}
      <div className="pb-16"></div>
    </section>
  );
}

export default Programs;
