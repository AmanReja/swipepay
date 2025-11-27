import { React, useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Theme } from "../Contexts/Theme";
import { Outlet } from "react-router-dom";


import Footer from "./Footer";

const Dashbord = () => {
  const { theme } = useContext(Theme);

  return (
    <>
      {/* FIXED NAVBAR */}
      <Navbar />

      <div
        className={`w-full h-screen flex 
        ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}
      `}
      >
        {/* FIXED SIDEBAR */}
       
          <Sidebar />
        

        {/* MAIN CONTENT AREA */}
        <div
          className="ml-60 w-full   h-screen overflow-y-auto p-2"
        >
          <Outlet />
          <Footer></Footer>
        </div>
        
        
      </div>
      
    </>
  );
};

export default Dashbord;
