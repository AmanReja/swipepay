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




    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%]   flex flex-col">
    <main className="w-full  h-full flex flex-col overflow-y-scroll">
      
    <section className="flex flex-col w-full p-4 sm:min-h-[600px] 2xl:h-[780px]  sm:h-[600px] gap-[30px]">
  

<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
<div>
  <p className="text-sm font-medium text-gray-700">Secret Key</p>
  <p className="text-xs text-gray-500 truncate w-52">
    sk_live_abcdef1234567890
  </p>
</div>
<button className="px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
  Copy
</button>
</div>

<div className="mt-6">
<button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
Generate New Key
</button>
</div><div
      className={`w-[350px] h-[200px] rounded-2xl p-6 shadow-xl bg-gradient-to-br ${color} text-white flex flex-col justify-between`}
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-light tracking-wide">{type}</h3>
        <CreditCard className="w-10 h-10 text-yellow-300" />
      </div>

      {/* Card Number */}
      <div className="text-xl tracking-widest font-mono">{number}</div>

      {/* Bottom Row */}
      <div className="flex justify-between items-end">
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
