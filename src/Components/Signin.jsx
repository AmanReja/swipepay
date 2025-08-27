import React, { useState } from "react";
import apple from "../assets/icons/apple.svg";
import google from "../assets/icons/google.svg";
import play from "../assets/images/play.png";
import group from "../assets/images/lap.svg";
import group1 from "../assets/images/lap2.png";
import busybox from "../assets/icons/busybox.png";
import { ShieldCheck, Smartphone, Lock, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Slide } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [chengepos, seChangepos] = useState(false);
  const [checkpass, setCheckpass] = useState(false);
  const [wrong, setWrong] = useState(false);
  console.log(14, pass, email);
  const [passopen, setPassopen] = useState(false);
  const [otp, setOtp] = useState("");


  const handelpassopen = ()=>{
    
    setPassopen((prev)=>!prev)
  }

  const handelchange = () => {
    seChangepos((prev) => !prev);
  };

  const handelcheckpass = () => {
    setCheckpass((prev) => !prev);
  };

  const login = async (e) => {
    try {
      const olduser = {
        login_id: email,
        password: pass,
      };
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(olduser),
        credentials: "include",
      };

      const res = await fetch(`http://192.168.1.43:3000/v1/user/login`, request);
      const data = await res.json();
      console.log(22, data);
      if (res.status === 401) {
        alert("invalid");
        setWrong(true)
        setPass("");
      }

      if (res.status === 200) {
        alert("log success");
        navigate("/dashboard/summery?login=success");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setWrong(false)
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className=" flex items-center justify-center sm:p-6 p-0 min-h-screen">
        <div className="max-w-5xl   w-full bg-white backdrop-blur-lg  rounded-3xl shadow-2xl overflow-hidden border border-white/40">
          <div className="grid lg:grid-cols-2">
           
            <form
              onSubmit={(e) => {
                login(), e.preventDefault();
              }}
              className="p-10 lg:p-14 flex flex-col  overflow-hidden justify-center"
            >
              <div className="max-w-md mx-auto w-full space-y-4">
               
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    B
                  </div>
                  <span className="text-xl font-semibold text-gray-800">
                    BUSYBOX
                  </span>
                </div>

               
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                    Secure Financial Access
                  </h1>
                  <p className="text-gray-600 text-lg mt-2">
                    Log in to manage payouts and pay-ins instantly.
                  </p>
                </div>

               

                <button className="w-full flex items-center justify-center gap-3 h-12 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition shadow-sm">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>

                  <span className="text-gray-700 font-medium">
                    Sign up with Google
                  </span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 h-12 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition shadow-sm">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"></path>
                  </svg>

                  <span className="text-gray-700 font-medium">
                    Sign up with Google
                  </span>
                </button>

           
                <div className="flex items-center gap-4">
                  <span className="flex-1 h-px bg-gray-300"></span>
                  <span className="text-sm text-gray-500">OR</span>
                  <span className="flex-1 h-px bg-gray-300"></span>
                </div>

              
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="text"
                      placeholder="Email address"
                      className="w-full h-12 pl-12 pr-4 rounded-xl outline-none border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12H8m8 0l-4-4m4 4l-4 4"
                      />
                    </svg>
                  </div>

                  <div className={`relative border border-gray-300 ${wrong?"border-red-500":"border-gray-300"}  focus:border-violet-500 focus:ring-2 rounded-xl pr-[8px] focus:ring-violet-200 flex items-center`}>
                    <input
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      value={pass}
                      required
                      type={checkpass ? "text" : "password"}
                      placeholder="Password"
                      className="w-full h-12 pl-12 pr-4  outline-none  transition"
                    />
                    <svg
                      className="w-5 h-5  text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.5 12a7.5 7.5 0 01-15 0"
                      />
                    </svg>

                    {checkpass ? (
                      <svg
                        onClick={handelcheckpass}
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        onClick={handelcheckpass}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    )}
                  </div>
                  {wrong &&( <div className="flex bg-red-500 p-2 border-2 rounded-2xl text-white pr-[80px]">
                    Wrong Password Please use a different password
                  </div>)

                  }
                 
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition transform shadow-lg"
                >
                  Sign In Account
                </button>
                <p onClick={(e)=>{setPassopen(true)}} className=" text-gray-500  text-right hover:underline cursor-pointer">
                  Forgot Password
            
                </p>

      
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-violet-600 hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-violet-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
            {passopen && (
        <form onSubmit={(e)=>{passupdate(e)}} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative">
            <button
              onClick={handelpassopen}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h2 className="text-lg font-bold mb-4">Enter Your otp</h2>
            <p className="text-sm text-gray-600 mb-4">
            Enter your otp which was sent to your email
            </p>
            <input required onChange={(e)=>{setOtp(e.target.value)}}
              type="text"
              value={otp}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
              Confirm
            </button>
          </div>
        </form>
      )}

            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center ">
              {/* <div className="flex translate-y-[-200px] translate-x-[-260px] shadow-xl bg-white/2 backdrop-blur-2xl rounded-full opacity-[10] h-[220px] w-[280px] absolute"></div> */}
              {/* <img
                src={group1}
                alt="Illustration"
                className="max-w-lg w-full object-cover rounded-3xl shadow-2xl"
              /> */}
              <div className="bg-white w-[200px] h-[200px] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
