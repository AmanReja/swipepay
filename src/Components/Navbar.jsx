import {React, useState} from "react";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link ,useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate =useNavigate()

   const [open,setOpen]=useState(false);

  const  handelOpen = ()=>{
    setOpen((prev)=>!prev)
  }





  const logOut = async()=>{

   
 
  

    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="w-[100%] bg-gray-100 h-[40px] flex justify-between px-[10px] sm:px-[40px] items-center mt-[20px]">
      <img className="sm:h-[45px] h-[30px]" src={busybox} alt="" />

      <div className="flex items-center gap-[20px]">
        <Link to={"/dashboard/addmoney"}>
          <button className="bg-blue-500 hover:ring-2 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/50 text-[12px] text-white rounded w-[100px] h-[30px] transition duration-300">
            + Add Money
          </button>
        </Link>

        <i class="fa-regular fa-bell"></i>
        <img  onClick={handelOpen} className="w-[30px] h-[30px] rounded-full" src={i5} alt="" />
      </div>
      <div  className={` w-[300px] flex-col z-40 bg-white  overflow-hidden border-gray-200 border-[2px] h-[200px] shadow-2xl absolute right-[35px] ${open?"flex":"hidden"}  rounded-2xl top-[82px]`}>
        <div className="border-b-gray-200 gap-[20px] border-b-[1px] bg-white w-full items-center justify-center flex h-[80px]">
          <img className="w-[50px] border-lime-400 border-[1px] h-[50px] rounded-full" src={i5} alt="" />
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">Aakash</h1>
            <p>aakash@busybox.in
</p>
          </div>
          <button onClick={()=>{navigate("/dashboard/profile")}} className="p-1 bg-blue-200 rounded-[5px] border-blue-600 border-[1px] text-blue-500">Pro</button>

        </div>
        <div class=" flex justify-center items-center dark:bg-gray-800">
  <button onClick="(() => document.body.classList.toggle('dark'))()"
        class="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg class="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg class="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    </button>
</div>
        <div className="flex justify-center items-center mt-4">
  <button  onClick={()=>{logOut()}} className="px-8 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md">
    Logout
  </button>
</div>

      </div>
    </div>
  );
};

export default Navbar;
