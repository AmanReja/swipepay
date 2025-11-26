import React, { useState, useEffect } from "react";
import apple from "../assets/icons/apple.svg";
import google from "../assets/icons/google.svg";
import play from "../assets/images/play.png";
import group from "../assets/images/lap.svg";
import group1 from "../assets/images/lap2.png";
import busybox from "../assets/icons/busybox.png";
import { ShieldCheck, Smartphone, Lock, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Slide } from "react-toastify";
import backgroundgreed from "../assets/images/bg.svg"
import { FaBriefcase, FaDollarSign, FaChartLine } from "react-icons/fa";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import { login, google_login, send_otp, verify_otp } from "../redux/action";





const Signin = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [chengepos, seChangepos] = useState(false);
  const [checkpass, setCheckpass] = useState(false);
  const [wrong, setWrong] = useState(false);
 
  
  const [passopen, setPassopen] = useState(false);
  const [otp, setOtp] = useState("");
  const [jwttoken, setJwttoken] = useState("")
  const [forgetpassemail, setForgetpassemail] = useState()
  const [giveotp, setGiveotp] = useState(false)








  
  


 
  

  const handelpassopen = () => {

    setPassopen((prev) => !prev)
  }

  const handelchange = () => {
    seChangepos((prev) => !prev);
  };

  const handelcheckpass = () => {
    setCheckpass((prev) => !prev);
  };




  const glogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      dispatch(google_login(navigate, response.access_token))
    },
    onError: (err) => console.error("Login Failed:", err),
  });










  const userlogin = async (e) => {
    try {
      const olduser = {
        login_id: email,
        password: pass,
      };

      dispatch(login(olduser, navigate, setWrong))





    } catch (error) {
      console.log(error);
    }

  };


  const forgotpass = () => {



    alert(forgetpassemail)
    dispatch(send_otp(forgetpassemail, setGiveotp))
  }


  const handelotp = () => {
    alert(forgetpassemail)
    dispatch(verify_otp(forgetpassemail, setGiveotp, navigate))
  }


  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex bgcolor sm:flex-row flex-col h-screen font-sans bg-gradient-to-br from-violet-800 to-[#152c6b]">




        <div className="w-full sm:w-1/2 text-white hidden sm:flex flex-col justify-center p-16">
          <div className="flex flex-col">

            <div

              style={{ fontFamily: "Righteous" }}
              className="flex tracking-wide transition-all duration-300 animate-gradient-x h-[53px] relative text-5xl font-normal bottom-[80px] 
             bg-gradient-to-r from-white via-yellow-500 to-pink-500 
             bg-clip-text text-transparent"
            >
              busybox
            </div>

            <div className="flex flex-col relative top-[50px]">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Welcome to the World of <br />
                <span className="bg-gradient-to-r from-white via-violet-400 to-sky-400 bg-clip-text text-transparent">
                  New Age Banking
                </span>
              </h1>


              <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed mb-10">
                Powering businesses with seamless transactions, fast settlements, and
                next-gen financial infrastructure built for growth.
              </p>

              <div className="w-[500px] relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="flex justify-between items-center text-sm h-full divide-x divide-gray-300/30">

                  <div className="flex-1 flex flex-col items-center  px-4 py-6 transition-transform hover:scale-105">
                    <strong className="block text-xl font-bold text-white">1M+</strong>
                    <p className="text-xs text-gray-300">Registered Businesses</p>
                  </div>


                  <div className="flex-1 flex flex-col items-center px-4 py-6 transition-transform hover:scale-105">
                    <strong className="block text-xl font-bold text-white">$1B+</strong>
                    <p className="text-xs text-gray-300">Monthly Payments</p>
                  </div>


                  <div className="flex-1 flex flex-col items-center px-4 py-6 transition-transform hover:scale-105">
                    <strong className="block text-xl font-bold text-white">1M+</strong>
                    <p className="text-xs text-gray-300">Daily Transactions</p>
                  </div>
                </div>
              </div>
            </div>


          </div>


        </div>


        <div className="w-full sm:w-1/2 h-full   flex items-center justify-center">
          <div

            className="p-10 lg:p-14 flex flex-col sm:h-[550px] h-full sm:w-1/2 w-full overflow-y-hidden  rounded bg-white  overflow-hidden justify-center"
          >
            <div className="max-w-md mx-auto w-full space-y-4">




              <div>
                <h1 className="text-2xl  text-gray-900 leading-tight">
                  Secure Financial Access
                </h1>

              </div>




              <button type="button" className="w-full flex items-center justify-center gap-3 h-12 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition shadow-sm">


                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
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
                  Sign up with Apple
                </span>
              </button>


              <div className="flex items-center gap-4">
                <span className="flex-1 h-px bg-gray-300"></span>
                <span className="text-sm text-gray-500">OR</span>
                <span className="flex-1 h-px bg-gray-300"></span>
              </div>


              <div className="space-y-4 ">
                <div className="relative ">
                  <input
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="text"
                    placeholder="Email address"
                    className="w-full h-10 pl-12 pr-4 rounded-xl outline-none border border-gray-300  transition"
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

                <div className={`relative border  ${wrong ? "border-red-500" : "border-gray-300"}  focus:border-violet-500 rounded-xl pr-[8px]  flex items-center`}>
                  <input
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    value={pass}
                    required
                    type={checkpass ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-10 pl-12 pr-4  outline-none  transition "
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
                {wrong && (<div className="flex text-[10px] bg-red-500 p-2 border-2 rounded-2xl text-white">
                  Wrong password please use a different password
                </div>)

                }

              </div>

              <button
                type="submit" onClick={(e) => { userlogin(e) }}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition transform shadow-lg"
              >
                Sign In
              </button>
              <Link to={"/forgotpass"}>
                <p className={`text-gray-500 text-right hover:underline cursor-pointer`}>
                  Forgot Password

                </p>
              </Link>



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
          </div>
          {/* {passopen && (
            <form onSubmit={(e) => { giveotp?handelotp(e) : forgotpass(e),e.preventDefault() }} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative">
                <button type="button"
                  

                  onClick={handelpassopen}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X />
                </button>
                <h2 className="text-lg font-bold mb-4">{giveotp?"Enter Your otp":"Enter Your email"}</h2>
                <p className="text-sm text-gray-600 mb-4">
           
                  {giveotp?"Enter your otp which was sent to your email":"Enter Your registered email"}
                </p>
                <input required onChange={(e) => { setForgetpassemail(e.target.value) }}
                  type="text"
                  value={forgetpassemail}
                  placeholder={giveotp?"Enter your otp":"Enter your email"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                />
                <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                  Confirm
                </button>
              </div>
            </form>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Signin;
