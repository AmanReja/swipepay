import React from "react";
import {  CreditCard } from "lucide-react"; // optional icons

const Card = ({
  type = "Virtual Debit Card",
  holder = "John Doe",
  number = "**** **** **** 1234",
  expiry = "12/27",
  network = "Visa",
  color = "from-indigo-500 to-purple-600",
}) => {
  return (




    <div className="w-full rounded-2xl h-[78%] flex flex-col">
    <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="flex flex-col w-full p-6 sm:min-h-[600px] 2xl:h-[780px] gap-10">
        
        {/* Secret Key Box */}
        <div className="flex items-center justify-between p-5 bg-white/60 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-xl">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secret Key</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-56 font-mono">
              sk_live_abcdef1234567890
            </p>
          </div>
          <button className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition">
            Copy
          </button>
        </div>
  
        {/* Generate Key */}
        <div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition">
            Generate New Key
          </button>
        </div>
  
        {/* Virtual Card */}
        <div
          className={`relative w-[360px] h-[220px] rounded-2xl p-6 shadow-2xl text-white flex flex-col justify-between overflow-hidden`}
          style={{
            background: `linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)`,
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-20 rounded-2xl"></div>
  
          {/* Top Row */}
          <div className="flex justify-between items-center relative z-10">
            <h3 className="text-sm font-light tracking-wide uppercase">{type}</h3>
            <CreditCard className="w-10 h-10 text-yellow-300" />
          </div>
  
          {/* Card Number */}
          <div className="text-2xl tracking-widest font-mono relative z-10">{number}</div>
  
          {/* Bottom Row */}
          <div className="flex justify-between items-end relative z-10">
            <div>
              <p className="text-xs opacity-70">Card Holder</p>
              <p className="text-sm font-semibold">{holder}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Expires</p>
              <p className="text-sm font-semibold">{expiry}</p>
            </div>
            <div className="text-lg font-bold">{network}</div>
          </div>
        </div>
      </section>
    </main>
  </div>
  

    
  );
};

export default Card;
