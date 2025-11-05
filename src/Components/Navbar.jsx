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
  className={`absolute right-10 top-[70px] w-[320px] flex flex-col z-40 backdrop-blur-md ${
    theme === "dark"
      ? "bg-gray-900/90 border-gray-700 text-gray-100"
      : "bg-white/80 border-gray-200 text-gray-800"
  } border shadow-2xl rounded-2xl p-5 transform transition-all duration-300 ${
    open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
  }`}
>
  {/* Profile Header */}
  <div className="flex flex-col items-center text-center border-b border-gray-300/40 pb-4">
    <img
      src={i5}
      alt="User Avatar"
      className="w-[70px] h-[70px] rounded-full border-2 border-gradient-to-r from-lime-400 to-pink-400 shadow-md"
    />
    <h1 className="mt-3 text-lg font-bold bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
      {getoneuser?.name || "User Name"}
    </h1>
    <p className="text-sm text-gray-500">{getoneuser?.email}</p>
  </div>

  {/* Edit Profile */}
  <div className="flex justify-center mt-5">
    <button
      onClick={() => navigate("/dashboard/profile")}
      className="px-5 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-md transition-transform transform hover:scale-105"
    >
      Edit Profile
    </button>
  </div>

  {/* Theme Toggle */}
  <div className="flex justify-center items-center mt-5 gap-3">
    <button className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:to-pink-500/20 transition">
      {theme === "dark" ? (
        <svg
          onClick={() => setTheme("light")}
          className="fill-yellow-400 cursor-pointer"
          viewBox="0 0 20 20"
          width="24"
          height="24"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 
            11-2 0V3a1 1 0 011-1zm4 
            8a4 4 0 11-8 0 4 4 0 
            018 0zm-.464 4.95l.707.707a1 
            1 0 001.414-1.414l-.707-.707a1 
            1 0 00-1.414 1.414zm2.12-10.607a1 
            1 0 010 1.414l-.706.707a1 1 0 
            11-1.414-1.414l.707-.707a1 1 0 
            011.414 0zM17 11a1 1 0 100-2h-1a1 
            1 0 100 2h1zm-7 4a1 1 0 011 
            1v1a1 1 0 11-2 0v-1a1 1 0 
            011-1zM5.05 6.464A1 1 0 106.465 
            5.05l-.708-.707a1 1 0 00-1.414 
            1.414l.707.707zm1.414 8.486l-.707.707a1 
            1 0 01-1.414-1.414l.707-.707a1 1 
            0 011.414 1.414zM4 11a1 1 0 
            100-2H3a1 1 0 000 2h1z"
          />
        </svg>
      ) : (
        <svg
          onClick={() => setTheme("dark")}
          className="fill-violet-600 cursor-pointer"
          viewBox="0 0 20 20"
          width="24"
          height="24"
        >
          <path d="M17.293 13.293A8 8 0 
          016.707 2.707a8.001 8.001 0 
          1010.586 10.586z" />
        </svg>
      )}
    </button>
    <span className="text-sm font-medium">
      {theme === "dark" ? "Dark Mode" : "Light Mode"}
    </span>
  </div>

  {/* Logout */}
  <div className="flex justify-center items-center mt-6">
    <button
      onClick={logOut}
      className="px-8 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
    >
      Logout
    </button>
  </div>
</div>

</div>

  );
};

export default Navbar;
