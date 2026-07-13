import React,{useEffect} from 'react';
import {clientLogos} from "../data/siteData.js";

export default function Clients() {
  // 🟢 Completely empty data array structure ready for your data entries

  useEffect(() => {
    document.title = "Clients | Sarawagi Enterprises";
  }, []);

  const clientsData = [
    { id: 1, name: "Tata Steel", img: clientLogos[3] },
    { id: 2, name: "Tata Power", img: clientLogos[0] },
    { id: 3, name: "Tata Steel Long Products", img: clientLogos[1] },
    { id: 4, name: "Tinplate", img: clientLogos[2] },
    { id: 5, name: "Adani ACC", img: clientLogos[4] },
    { id: 6, name: "Adani Power", img: clientLogos[5] },
    { id: 7, name: "Adhunik", img: clientLogos[6] },
    { id: 8, name: "Amalgam Steel & Power", img: clientLogos[7] },
    { id: 9, name: "Air Water India Private Ltd", img: clientLogos[8] },
    { id: 10, name: "Emami Agrotech Haldi", img: clientLogos[9] },
    { id: 11, name: "Haldia Petrochemicals", img: clientLogos[10] },
    { id: 12, name: "Hiranmaye Energy Haldia", img: clientLogos[11] },
    { id: 13, name: "Industrial Energy Limited", img: clientLogos[12] },
    { id: 14, name: "", img: clientLogos[13] },
    { id: 15, name: "", img: clientLogos[14] },
    { id: 16, name: "Neelachal Ispat Nigam Limited", img: clientLogos[15] },
    { id: 17, name: "Ramco Cement", img: clientLogos[16] },
    { id: 18, name: "Ramkrishna Forgings Limited", img: clientLogos[17] },
    { id: 19, name: "Rungta Mines Chaibasa", img: clientLogos[18] },
    { id: 22, name: "Steel Authority of India Limited", img: clientLogos[19] },
    { id: 23, name: "Shree Cement", img: clientLogos[20] },
    { id: 24, name: "Triveni Engicons Pvt Ltd", img: clientLogos[21] },
    {id: 25, name: "Praxair India Private Ltd", img: clientLogos[22] },
    {id: 26, name: "Nilachal Iron & Power Ltd", img: clientLogos[23] },
    {id: 27, name: "Shah Sponge & Power Ltd", img: clientLogos[24] },
    {id: 28, name: "Visa Steel", img: clientLogos[25] },
  ];

  return (
    <main className="pt-2 bg-slate-50 min-h-screen font-sans">
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 🖥️ GALLERY LAYOUT GRID */}
          <section className="py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              
              {clientsData.map((client) => (
                <div 
                  key={client.id}
                  className="bg-white rounded-xl border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Image Block Box */}
                  <div className="w-full h-32 sm:h-40 bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                    {client.img ? (
                      <img 
                        src={client.img} 
                        alt={client.name || "Client logo"}
                        className="max-w-full max-h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                      />
                    ) : (
                      /* Fallback subtle badge placeholder if img string is completely blank */
                      <div className="text-slate-300 text-2xl select-none font-bold tracking-widest opacity-40">
                        LOGO
                      </div>
                    )}
                  </div>

                  {/* Horizontal Border Line Divider */}
                  <div className="h-px bg-gray-100 w-full"></div>

                  {/* Card Title Footnote */}
                  <div className="p-4 grow flex items-center justify-center text-center">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors">
                      {client.name.trim() !== "" ? client.name : <span className="text-slate-400 italic font-medium">Pending Client Name</span>}
                    </h4>
                  </div>
                </div>
              ))}

            </div>
          </section>

        </div>
      </section>
    </main>
  );
}