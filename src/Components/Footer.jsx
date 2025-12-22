import React, { useContext } from "react";
import { Theme } from "../Contexts/Theme";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  const { theme } = useContext(Theme);

  return (
    <footer
      className={`w-full   h-[60px] pl-[20px] mt-[40px]
        ${theme === "dark" 
          ? "bg-gray-900 text-gray-300 border-gray-700" 
          : "bg-transparent text-gray-700 border-gray-300"
        }`}
    >
      <div className="w-full">

        
        <div className="w-full">
          <h2 className="text-xl font-semibold">Busybox</h2>
          <p className="w-full text-[10px]">©2025 NextSpeed Technologies Private Limited. All rights reserved.  Data is secured via 'bank-grade' security</p>
        </div>

      
       

       
       
      </div>

    
    </footer>
  );
};

export default Footer;
