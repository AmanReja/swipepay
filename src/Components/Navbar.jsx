import { React, useState, useContext,useEffect } from "react";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { getone_user, update_user_details } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Navbar = () => {
  
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const { theme, setTheme } = useContext(Theme)

  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen((prev) => !prev)
  }





  const logOut = async () => {





    localStorage.removeItem("token")
    navigate("/")
  }

  
  



useEffect(()=>{dispatch(getone_user())},[dispatch]);
const getoneuser = useSelector((state) => state.getoneuser.getoneuser.user);





  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);



  return (
    <div
  className={`w-[100%] ${
    theme === "dark" ? "" : "bg-gray-100 "
  } h-[40px] flex justify-between px-[10px] sm:px-[40px] items-center mt-[20px]`}
>
 
  <div
    style={{ fontFamily: "Righteous" }}
    className={`flex tracking-wide transition-all duration-300 animate-gradient-x h-[53px] relative sm:text-5xl text-2xl font-normal ${theme==="dark"?"text-white":"text-[#0A0C2C]"}`}
  >
    busybox
  </div>

  <div className="flex items-center gap-[20px]">
    <Link to={"/dashboard/addmoney"}>
      <button className="bg-blue-500 hover:ring-2 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/50 text-[12px] text-white rounded w-[100px] h-[30px] transition duration-300">
        + Add Money
      </button>
    </Link>

    <i className="fa-regular fa-bell"></i>
    <img
      onClick={handelOpen}
      className="w-[30px] h-[30px] rounded-full cursor-pointer border-2 border-lime-400 hover:scale-105 transition"
      src={i5}
      alt=""
    />
  </div>


  <div
  className={`absolute right-10 top-[65px] w-[260px] flex flex-col z-40 backdrop-blur-xl 
  ${
    theme === "dark"
      ? "bg-gray-900/85 border-gray-700 text-gray-100"
      : "bg-white/80 border-gray-200 text-gray-800"
  }
  border shadow-xl rounded-xl p-4 transform transition-all duration-300
  ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  animate-fadeIn`}
>

  {/* PROFILE */}
  <div className="flex flex-col items-center text-center border-b border-gray-300/30 pb-3">
    <img
      src={i5}
      alt="Avatar"
      className="w-[55px] h-[55px] rounded-full shadow-md border-2 border-transparent bg-lime-200 p-[2px]"
    />

    <h1 className="mt-2 text-sm font-semibold bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
      {getoneuser?.name || "User Name"}
    </h1>

    <p className="text-[11px] text-gray-500">{getoneuser?.email}</p>
  </div>

  {/* OPTIONS */}
  <div className="mt-3 flex flex-col gap-1.5">

    {[
      { icon: "fa-solid fa-gear", label: "Settings",rout:"/dashboard/settings/accounts" },
      { icon: "fa-solid fa-bolt-lightning", label: "Dev Tools",rout:"/dashboard/settings/developertooles" },
      { icon: "fa-solid fa-user", label: "Profie",rout:"/dashboard/profile" },
      
    ].map((item, i) => (
      <div onClick={()=>{navigate(item.rout)}}
        key={i}
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] transition-all 
        ${
          theme === "dark"
            ? "hover:bg-gray-800 hover:text-violet-300"
            : "hover:bg-gray-100 hover:text-violet-600"
        }`}
      >
        <i  className={`${item.icon} text-[13px]`}></i>
        <p>{item.label}</p>
      </div>
    ))}

  </div>

  {/* LOGOUT */}
  <div className="flex justify-center mt-4">
    <button
      onClick={logOut}
      className="px-6 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
      text-white text-sm font-medium rounded-lg shadow-md transition-transform hover:scale-105"
    >
      Logout
    </button>
  </div>
</div>



</div>

  );
};

export default Navbar;
