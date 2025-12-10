import React, { useState, useEffect,useRef } from "react";

import { ShieldCheck, Smartphone, Lock, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Slide } from "react-toastify";

import { FaBriefcase, FaDollarSign, FaChartLine } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {send_otp,verify_otp  } from "../redux/action";





const Signin = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [mobnum, setMobnum] = useState("");
  const [isotpsended,setIsotpsended] =useState()
  const [wrong, setWrong] = useState(false);
  const [passopen, setPassopen] = useState(false);
  const [load, setLoad] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

 

const sendOtp = async (e) => {
    try {
      

      dispatch(send_otp(mobnum, setLoad,setIsotpsended))
    } catch (error) {
      console.log(error);
    }

  };



 
 

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus(); // move to next
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus(); // move back
    }
  };

  const verifyOtp = async (e) => {
    try {
      


const newOtp = otp.join("");


const details={
  otp:newOtp,
  mobile:mobnum
}
      dispatch(verify_otp(details, setLoad,navigate))
    } catch (error) {
      console.log(error);
    }

  };



  return (
    <>
    <ToastContainer />
  
    <div className="h-screen w-full flex bg-gradient-to-br from-[#0f1d45] to-[#381a81] font-sans">
  
      {/* LEFT SECTION */}
      <div className="hidden sm:flex flex-col justify-center w-1/2 text-white p-16 relative">
        
        <div className="text-5xl font-bold tracking-wide bg-gradient-to-r from-white via-yellow-400 to-pink-500 bg-clip-text text-transparent"
          style={{ fontFamily: "Righteous" }}>
          busybox
        </div>
  
        <div className="mt-10">
          <h1 className="text-4xl font-bold leading-tight">
            Modern Billing for  
            <br />
            <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Smart Businesses
            </span>
          </h1>
  
          <p className="text-gray-300 mt-4 text-base max-w-md leading-relaxed">
            Fast payments, instant settlements, and secure financial infrastructure
            to help your business grow faster.
          </p>
        </div>
  
        {/* STATS CARD */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl w-[450px] shadow-xl">
          <div className="grid grid-cols-3 text-center gap-4">
  
            <div className="hover:scale-105 transition">
              <p className="text-xl font-bold">1M+</p>
              <span className="text-xs text-gray-300">Businesses</span>
            </div>
  
            <div className="hover:scale-105 transition">
              <p className="text-xl font-bold">$1B+</p>
              <span className="text-xs text-gray-300">Monthly Volume</span>
            </div>
  
            <div className="hover:scale-105 transition">
              <p className="text-xl font-bold">5M+</p>
              <span className="text-xs text-gray-300">Transactions</span>
            </div>
  
          </div>
        </div>
      </div>
  
      {/* RIGHT SECTION */}
      <div className="flex flex-col w-full sm:w-1/2 justify-center items-center px-6">
  
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
  
          {/* TITLE */}
          <h1 className={`font-semibold text-gray-800 ${!isotpsended ? "text-2xl" : "text-xl"}`}>
            {isotpsended ? "Enter 6 Digit Verification Code" : "Secure Billing Access"}
          </h1>
  
          <div className="my-6">
            <div className="flex items-center gap-4">
              <span className="flex-1 h-px bg-gray-300"></span>
              <span className="text-sm text-gray-500">Login</span>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>
          </div>
  
          {/* INPUT SECTION */}
          {!isotpsended ? (
            <div className="space-y-4">
              {/* MOBILE INPUT */}
              <div className="relative">
                <input
                  required
                  onChange={(e) => setMobnum(e.target.value)}
                  value={mobnum}
                  type="number"
                  placeholder="Enter Mobile Number"
                  className="w-full h-12 rounded-lg border px-4 pl-12 border-gray-300 outline-none
                  focus:ring-2 focus:ring-indigo-400 no-spinner"
                />
  
                <Smartphone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
  
              {/* ERROR */}
              {wrong && (
                <div className="text-xs bg-red-500 text-white p-2 rounded-lg">
                  Wrong password please try again.
                </div>
              )}
            </div>
          ) : (
            /* OTP INPUTS */
            <div className="flex justify-center gap-3 mt-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  type="number"
                  className="no-spinner w-12 h-12 text-center text-xl font-semibold 
                  border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          )}
  
          {/* BUTTON */}

          {load?
          
          <button
           
           
            className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] shadow-md transition"
          >
<div role="status">
    <svg aria-hidden="true" class="inline w-8 h-8 text-neutral-tertiary animate-spin fill-dark dark:fill-quaternary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
          </button>
: <button
            type="submit"
            onClick={() => {isotpsended?verifyOtp():sendOtp()}}
            className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] shadow-md transition"
          >
            {isotpsended ? "Verify OTP" : "Send OTP"}
          </button>}
         
  
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Signin;
