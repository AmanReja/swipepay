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
            className="fixed top-[52px] left-0 h-[2px] w-full bg-blue-800 origin-left z-50"
          />
        )}
      </AnimatePresence>

      <div className="h-screen w-full overflow-hidden bg-gray-50">

{/* NAVBAR */}

  <Navbar />


{/* BODY */}
<div className="flex pt-[56px] h-full">

  {/* SIDEBAR */}
  <div className="fixed left-0 top-[56px] w-[80px] h-[calc(100vh-56px)]  overflow-y-auto">
    <Sidebar />
  </div>

  {/* MAIN CONTENT + FOOTER */}
  <main className="ml-[200px] w-[calc(100%-202px)] h-[calc(100vh-56px)] overflow-y-auto flex flex-col">

    {/* PAGE CONTENT */}
    <div className="flex-1 p-6">
      <Outlet />
    </div>

    {/* FOOTER */}
 <Footer></Footer>

  </main>
</div>
</div>
      
    </>
  );
};

export default Dashbord;
