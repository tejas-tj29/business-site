import React from "react";
import { Link } from "react-router";

const FounderMessage = () => {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Main Flex Wrapper (Responsive: Stack on mobile, Side-by-side on desktop) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* 📄 Left Side: Chairman's Message & Text Content */}
          <div className="w-full lg:w-4/5 flex flex-col text-left">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">
              Leadership Insights
            </span>
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6">
              Founder's Message
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base  pl-4 py-1">
              <p>
                Sarawagi Enterprises represents a modern, agile, and forward-looking approach to industrial supply and logistics. What started as a small initiative has grown into a trusted name known for efficiency, accountability, and customer-centric operations.
              </p>
              <p>
                Our mission is clear: to deliver quality materials on time, every time, while continuously improving our systems, technology, and service standards. We believe in progress — for our clients, our team, and the industries we serve.
              </p>
              <p>
                Thank you for being part of our growth story. Together, we will continue to achieve new milestones.
              </p>
            </div>

            {/* Founder Signature / Name Tag */}
            <div className="mt-8">
              <h4 className="font-bold text-gray-900 text-lg">Founder</h4>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Sarawagi Enterprises
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/profile"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-200"
            >
              Know More About Us
            </Link>
            </div>
            </div>
            </div>

          {/* 🖼️ Right Side: Founder's Photograph */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
              <img
                src="/Founder/founder.png" 
                alt="Founder of Sarawagi Enterprises"
                className="w-full h-full object-cover object-top transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;