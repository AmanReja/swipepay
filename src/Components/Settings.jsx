import React, { useContext, useEffect } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { NavLink, Outlet } from "react-router-dom";
import adhar from "../assets/icons/aadhaar.svg";
import gst from "../assets/icons/calculate.png";
import man from "../assets/icons/man.png";
import confetti from "../assets/icons/confetti.png";
import line from "../assets/icons/line.svg";
import card from "../assets/icons/card.png";
import bank from "../assets/icons/bank.png";
import user from "../assets/icons/user.png";

import { Theme } from "../Contexts/Theme";



const Settings = () => {

  const {theme,setTheme} =useContext(Theme)

 
  

  return (
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
      <main className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
        <section className="w-full flex flex-col sm:flex-col  gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px]  sm:h-[600px] px-[2px] sm:px-[20px]">
       
         
          <header className="w-full h-[50px] sm:overflow-visible overflow-x-auto">
            <div className="flex h-[50px] items-center text-[15px] w-[600px] gap-[20px] text-gray-800">
              <NavLink
                to={"/dashboard/settings/accounts"}
                className={({ isActive }) =>
                  `flex items-center gap-1 ${theme==="dark"?"text-white":"text-gray-800"}  hover:border-b-violet-300 hover:border-b-[3px]${
                    isActive
                      ? "border-b-violet-400 font-bold border-b-[3px]"
                      : ""
                  }`
                }
              >
            
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A10.965 10.965 0 0112 15c2.21 0 4.27.64 5.879 1.804M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              Account
                
              </NavLink>

              <NavLink
                to={"/dashboard/settings/security"}
                className={({ isActive }) =>
                  `flex items-center ${theme==="dark"?"text-white":"text-gray-800"} gap-1 hover:border-b-violet-300 hover:border-b-[3px] ${
                    isActive
                      ? "border-b-violet-400 border-b-[3px] font-bold"
                      : ""
                  }`
                }
              >
                {/* Developer Tools Icon */}
                <svg
  xmlns="http://www.w3.org/2000/svg"
  class="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
 
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z"
  />

  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 0v2"
  />
</svg>

                <p> Security</p>
              </NavLink>

              <NavLink
                to={"/dashboard/settings/developertooles"}
                className={({ isActive }) =>
                  `flex items-center gap-1 ${theme==="dark"?"text-white":"text-gray-800"} hover:border-b-violet-300 hover:border-b-[3px] ${
                    isActive
                      ? "border-b-violet-400 border-b-[3px] font-bold"
                      : ""
                  }`
                }
              >
                {/* Developer Tools Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Developer tools
              </NavLink>

              <a className="flex items-center gap-1 hover:border-b-violet-300 hover:border-b-[3px]">
                {/* Team Management Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5V9a2 2 0 00-2-2h-4.34a4 4 0 00-7.32 0H4a2 2 0 00-2 2v11h5v-3a4 4 0 018 0v3z"
                  />
                </svg>
                Team management
              </a>

              <a className="flex items-center gap-1 hover:border-b-violet-300 hover:border-b-[3px]">
                {/* Billing Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-2.21 0-4 .895-4 2s1.79 2 4 2 4-.895 4-2-1.79-2-4-2zm0 4v6m0 0a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
                Billing
              </a>
            </div>
          </header>

          <main className="w-full ">
            <Outlet></Outlet>
          </main>
        </section>
      </main>
    </div>
  );
};

export default Settings;
