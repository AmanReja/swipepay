import React, { useEffect, useState,useContext } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { Outlet } from "react-router-dom";
import adhar from "../assets/icons/aadhaar.svg";
import gst from "../assets/icons/calculate.png";
import man from "../assets/icons/man.png";
import confetti from "../assets/icons/confetti.png";
import line from "../assets/icons/line.svg";
import card from "../assets/icons/card.png";
import bank from "../assets/icons/bank.png";
import user from "../assets/icons/user.png";
import credit from "../assets/icons/credit.png";
import house from "../assets/icons/house.png";
import tie from "../assets/icons/tie.png";
import phone from "../assets/icons/phone.png";
import mail from "../assets/icons/mail.png";
import Subfooter from "./Subfooter";
import robo from "../assets/icons/robo.png";
import {getone_user} from "../redux/action"
import { useSelector, useDispatch } from "react-redux";
import {Theme} from "../Contexts/Theme"
import {motion} from "framer-motion"

const Accounts = () => {


  const {theme,setTheme} =useContext(Theme)
  const [user,setUser]=useState([])
  const dispatch = useDispatch();
  const getoneuserdata = useSelector((state)=>state.getoneuser.getoneuser.user)
  
  

  useEffect(()=>{
    
    dispatch(getone_user())
 
  
  
  },[dispatch])

  




  // const user = JSON.parse(localStorage.getItem("user")) || {};

  const content_card = [
    {
      name: getoneuserdata?.role,
      catagory: "Role",
      color: "bg-gradient-to-r from-violet-400 to-sky-500",
      icon: (
        <svg
          className="w-6 h-6  text-white"
          fill="#fff"
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 460 460"
          xml:space="preserve"
          stroke="#fff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g id="XMLID_26_">
              <polygon
                id="XMLID_462_"
                points="290,0 170,0 188.182,100 271.818,100 "
              ></polygon>
              <polygon
                id="XMLID_463_"
                points="160,390 230,460 300,390 271.111,130 188.889,130 "
              ></polygon>
            </g>
          </g>
        </svg>
      ),
    },
    {
      name: "8617828286",
      catagory: "Mobile Number",
      color: "bg-gradient-to-r from-red-400 to-pink-500",
      icon: (
        <svg
          className="w-6 h-6  text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
        </svg>
      ),
    },
    {
      name:getoneuserdata?.email,
      catagory: "Email ID",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      icon: (
        <svg
          className="w-6 h-6  text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
        </svg>
      ),
    },
    {
      name: "XXXXXXXX3710",
      catagory: "Adhaar",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      icon: (
        <svg
          className="w-6 h-6  text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "XXXXXXXX449R",
      catagory: "Pan Number",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
  
  

  const content_business = [
    {
      name: getoneuserdata?.company_id,
      catagory: "Business Name",
      color: "bg-gradient-to-r from-violet-400 to-sky-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "XXXXXX838J",
      catagory: "Business Pan",
      color: "bg-gradient-to-r from-red-400 to-pink-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "19AAICB9838J1ZZ",
      catagory: "GST",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "bb1122334456",
      catagory: "Organisation ID",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className={`w-full flex flex-col gap-[50px] mb-[10px] ${theme==="dark"?"bg-gray-800":"bg-white"}  overflow-hidden`}>
        <div className="flex flex-col border-gray-200  h-auto  w-full shadow rounded-xl">
        <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 shadow-[0_0_40px_-10px_rgba(79,70,229,0.7)] border border-indigo-600/30">
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-indigo-500/30 blur-3xl rounded-full top-[-100px] right-[-100px]" />
        <div className="absolute w-80 h-80 bg-violet-500/20 blur-3xl rounded-full bottom-[-80px] left-[-100px]" />
      </div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 max-w-2xl text-center md:text-left"
      >
        {/* Icon */}
        <div className="flex justify-center md:justify-start">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-2xl shadow-lg shadow-indigo-700/40">
            <svg
              className="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9.953 9.953 0 0112 15c2.21 0 4.21.72 5.879 1.928M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
          Personal Information
        </h1>

        {/* Paragraph */}
        <p
          style={{ fontFamily: "Delius" }}
          className="text-base md:text-lg text-gray-300 leading-relaxed md:pr-[15%]"
        >
          Manage your details to keep your account secure and personalized.
        </p>

      
     
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center relative top-[50px]"
      >
        <img
          className="w-48 md:w-56 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          src={robo}
          alt="Personal Info"
        />
      </motion.div>
    </div>

          <div className="w-full py-[10px] pl-[30px] sm:justify-normal flex-wrap h-auto  mt-[20px] justify-start sm:flex-row flex-col flex gap-[50px] ">
            {content_card.map((item) => (
              <div className="flex gap-[10px]  sm:min-w-0 min-w-[280px] sm:justify-center justify-evenly items-center">
                <div
                 
                  className={` rounded-full p-4 ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="flex flex-col  min-w-[200px] ">
                  <h1 className="font-bold text-[13px] text-gray-700">
                    {item.name}
                  </h1>
                  <p className="text-[12px]">{item.catagory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex border-gray-200  border w-full rounded-2xl   h-auto mb-[10px] flex-col p-4 gap-[10px]">
          <div className="flex  items-center gap-[10px]">
            <div className="bg-violet-400 shadow-md w-[40px] p-2 rounded-full">
              <svg
                class="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p
              style={{ fontFamily: "Delius" }}
              className="text-[16px] tracking-wide opacity-90"
            >
              Business Information
            </p>
          </div>

          <div className="w-full py-[10px] pl-[30px] sm:justify-normal justify-start sm:flex-row flex-col flex gap-[50px] ">
            {content_business.map((item) => (
              <div className="flex gap-[10px]  sm:min-w-0 min-w-[280px] sm:justify-center justify-evenly items-center">
                <div
                 
                  className={` rounded-full p-4 ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="flex flex-col  min-w-[200px] ">
                  <h1 className="font-bold text-[13px] text-gray-700">
                    {item.name}
                  </h1>
                  <p className="text-[12px]">{item.catagory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
