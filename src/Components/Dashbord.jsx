import { React, useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Theme } from "../Contexts/Theme";
import { Outlet } from "react-router-dom";
import {motion,AnimatePresence} from "framer-motion"
import { useLocation } from "react-router-dom";


import Footer from "./Footer";
import Offers from "./Offers";

const Dashbord = () => {
  const { theme } = useContext(Theme);
  const [loading, setLoading] = useState(false);

  const location = useLocation()

  useEffect(() => {

    setLoading(true)
   const timer = setTimeout(()=>{
   
    setLoading(false)
   },500)
  
    return ()=>clearTimeout(timer)

  }, [location.pathname])
  


  return (
    <>
      {/* FIXED NAVBAR */}
      <Navbar />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="route-loader"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed top-[52px] left-0 h-[3px] w-full bg-blue-500 origin-left z-50"
          />
        )}
      </AnimatePresence>

      <div
        className={`w-full h-screen flex 
        ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-[#f9f9f9] text-gray-900"}
      `}
      >
        {/* FIXED SIDEBAR */}
       
          <Sidebar />
        

        {/* MAIN CONTENT AREA */}
        <div
          className="ml-50 w-full   h-screen overflow-y-auto p-2"
        >
         
          <Outlet />
          <Footer></Footer>
        </div>
        
        
      </div>
      
    </>
  );
};

export default Dashbord;
