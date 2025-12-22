import { React, useState, useContext,useEffect } from "react";


import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
// import { getone_user, update_user_details } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {Sun, Moon} from "lucide-react";
import { motion,AnimatePresence  } from "framer-motion";
import { FaShareAlt, FaEdit, FaPlus } from "react-icons/fa";
import { get_company } from "../redux/action";
import { Company } from "../Contexts/Company";



const Navbar = () => {
  const { setCompany ,company} = useContext(Company);
  
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const { theme, setTheme } = useContext(Theme)

  const [open, setOpen] = useState(false);
  const [isaddcom,setIsaddcom]=useState(false)
  const [companyList, setCompanyList] = useState([]);
  const [selectedaccount,setSelectedaccount]=useState(null)
  


  const handelSelect = (data) => {

    // 1) Update selected account
    // setSelectedaccount({
    //   companyName: data.company_name,
    //   orgName: data.organization_name,
    //   country: data.country,
    //   phone: data.company_phone,
    //   email: data.company_email,
    //   gst: data.gstin,
    //   address1: data.address_line1,
    //   address2: data.address_line2,
    //   city: data.city,
    //   state: data.state,
    //   pincode: data.pincode,
    //   logourl: data.logo_url,
    // });
  
    setCompany({ companyName: data.company_name,
      orgName: data.organization_name,
      country: data.country,
      phone: data.company_phone,
      email: data.company_email,
      gst: data.gstin,
      address1: data.address_line1,
      address2: data.address_line2,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      logourl: data.logo_url})
    
   setIsaddcom(false);
  };
  

  const dropdownCompanies = companyList.filter(
    (item) => item.company_name !== company?.companyName
  );




    // console.log(62,selectedaccount);


   const companydata = useSelector((state)=>state.addcompany.addcompany)
   const companyrecRedux = useSelector(
    (state) => state.addcompany.addcompany?.data
  );
  
  
  
  //  console.log(27,companyrecRedux);



  const handelOpen = () => {
    setOpen((prev) => !prev)
  }




useEffect(() => {
  if (companyrecRedux) {
    setCompanyList(companyrecRedux)
  }


}, [companyrecRedux])




useEffect(() => {
  const saved = localStorage.getItem("selectedCompany");
  if (saved) {
    setSelectedaccount(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  if (company) {
    localStorage.setItem(
      "selectedCompany",
      JSON.stringify(company)
    );
  }
}, [company]);

const selectedCompany = JSON.parse(localStorage.getItem("selectedCompany"));
console.log("json",selectedCompany);







  const logOut = async () => {





    localStorage.removeItem("token")
    navigate("/")
  }

  
  


  useEffect(() => {
    dispatch(get_company())
  
   
  }, [dispatch])
  


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

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div
    className={`fixed top-0 left-0 z-50 w-full ${
      theme === "dark" ? "" : "bg-white"
    } h-[50px] flex justify-between px-[10px] sm:px-[50px] items-center`}
  >
  
 

 <div className="flex justify-center items-center h-full gap-[30px]">
 <div
    style={{ fontFamily: "Righteous" }}
    className={`flex text-center justify-center tracking-wide transition-all duration-300 animate-gradient-x h-[42px] relative sm:text-3xl text-2xl font-normal ${theme==="dark"?"text-white":"text-[#0A0C2C]"}`}
  >
    busype
  </div>
  {selectedaccount?
  
  <AnimatePresence mode="wait">
  <motion.div
    key={company?.companyName || "default"}
    initial={{ opacity: 0, y: -8, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.95 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="rounded-full gap-[5px] flex"
  >
    <div className="w-8 h-8 rounded-full  text-gray-800 font-bold flex justify-center items-center">
      <img className="rounded-full w-full h-full object-cover" src={company?.logourl||""} alt="" />
    </div>

    <div>
      <h3 className="font-bold text-[12px]">
        {company?.companyName || "YOUR BUSINESS NAME"}
      </h3>

      <p
        onClick={() => setIsaddcom((prev) => !prev)}
        className="font-bold text-[9px] cursor-pointer text-gray-600 flex items-center gap-[4px]"
      >
        <i className="fa-solid fa-shuffle text-[8px]" />
        {companyList?.length ? "Change Company" : "+ Add Another Company"}
      </p>
    </div>
  </motion.div>
</AnimatePresence>
:<div className=" rounded-full gap-[5px]  flex">
  <div className="w-8 h-8 rounded-full bg-orange-300 text-center text-gray-800 font-bold flex justify-center items-center content-center">YB</div>
  <div className="">
    <h3 className="font-bold text-[12px]">YOUR BUSINESS NAME</h3>
    {companyList?.length>0?<div  onClick={()=>{
  setIsaddcom((prev)=>!prev)
}}  className="flex gap-[5px] items-center"><i class="fa-solid text-[8px] text-gray-600 fa-shuffle"></i><p className="font-bold text-[9px] cursor-pointer text-gray-600">Change Company</p></div>:    <p onClick={()=>{
  setIsaddcom((prev)=>!prev)
}}  className="font-bold text-[9px] cursor-pointer text-gray-600">+ Add Another Company</p>} 

  </div>
  </div>}
 
  
  
 </div>
 

 {isaddcom&&  <div className="fixed w-[342px] h-auto  top-[53px] rounded-[5px] shadow-md overflow-x-hidden left-[150px] z-50">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-[5px] shadow-lg w-full "
    >
     <div className="flex flex-col w-full bg-green-50 h-[63px]">
     <div className="flex items-center gap-2 ml-[10px] mt-[5px]">
        <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center font-semibold text-gray-800 text-sm">
          YB
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-tight">
            YOUR BUSINESS NAME
          </h2>
          <p className="text-[10px] text-gray-500">YOUR BUSINESS NAME</p>
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center gap-4  text-xs text-gray-600 ml-[15px] mt-[5px]">
        <button className="flex items-center gap-1 hover:text-black transition">
          <FaEdit className="text-[11px]" /> Edit
        </button>
        <button className="flex items-center gap-1 hover:text-black transition">
          <FaShareAlt className="text-[11px]" /> Share
        </button>
      </div>
     </div>
     

     
     <div className="w-full max-h-[300px] overflow-y-auto">
  {dropdownCompanies?.map((data, index) => (
    <div onClick={()=>{handelSelect(data)}} key={index} className="flex cursor-pointer flex-col w-full bg-white h-[63px] py-2">

      {/* Logo + Name */}
      <div className="flex items-center gap-2 ml-[10px]">
        <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={data.logo_url}
            alt={data.company_name}
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold leading-tight">
            {data.company_name}
          </h2>
          <p className="text-[10px] text-gray-500">
            {data.organization_name}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center gap-4 text-xs text-gray-600 ml-[15px] mt-[4px]">
        <button className="flex items-center gap-1 hover:text-black transition">
          <FaEdit className="text-[11px]" /> Edit
        </button>

        <button className="flex items-center gap-1 hover:text-black transition">
          <FaShareAlt className="text-[11px]" /> Share
        </button>
      </div>

    </div>
  ))}
</div>

      
   
 
      {/* Add new company */}
      <button onClick={()=>{
          navigate("/dashboard/addnewcompany"),setIsaddcom(false)
        }} className=" w-full h-[40px] hover:text-blue-600 bg-white hover:bg-gray-200 py-2  flex items-center justify-center gap-2 text-xs font-medium transition">
        <FaPlus  className="text-[18px]" /> Add new Company
      </button>



  
    </motion.div>
  </div>}



 

  <div className="flex items-center gap-[20px]">

  <div className="flex items-center w-[400px] h-[36px]  rounded-md bg-white 
                hover:ring-2 hover:ring-gray-900 transition-all duration-150 border-gray-300 border-[1px]">

  {/* Icon */}
  <div className="w-8 h-full flex justify-center items-center text-gray-500">
    <i className="fa-solid fa-wand-magic-sparkles"></i>
  </div>

  {/* Input */}
  <input
    placeholder="Ask Swip AI"
    className="flex-1 h-full text-sm px-1 outline-none bg-transparent"
    type="text"
  />

  {/* Shortcut */}
  <div className="px-2 text-xs text-gray-600 bg-gray-100 rounded mr-2">
    + CTRL
  </div>
</div>




    <div className="  w-[150px] h-[30px] justify-between  flex items-center">

<div className=" rounded-full w-7 h-7 flex justify-center items-center hover:bg-gray-200 duration-300"><i   class="fa-solid fa-bolt "></i></div>
<div className=" rounded-full w-7 h-7 flex justify-center items-center hover:bg-gray-200 duration-300"><i class="fa-solid fa-bell"></i></div>
<div className=" rounded-full w-7 h-7 flex justify-center items-center hover:bg-gray-200 duration-300">  <i class="fa-solid fa-bullhorn"></i></div>
<div className=" rounded-full w-7 h-7 flex justify-center items-center hover:bg-gray-200 duration-300">   <i onClick={()=>{setOpen((prev)=>!prev)}} class="fa-solid fa-user"></i></div>
    
    
  
   
    
    </div>
  

    
    {/* <Link to={"/dashboard/addmoney"}>
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
    /> */}
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
  {/* <div className="flex flex-col items-center text-center border-b border-gray-300/30 pb-3">
    <img
      src={""}
      alt="Avatar"
      className="w-[55px] h-[55px] rounded-full shadow-md border-2 border-transparent bg-lime-200 p-[2px]"
    />

    <h1 className="mt-2 text-sm font-semibold bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
      {getoneuser?.name || "User Name"}
    </h1>

    <p className="text-[11px] text-gray-500">{getoneuser?.email}</p>
  </div> */}

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
<div className="w-full p-2  flex items-center justify-between">
      <span className="font-medium">Mode</span>

      {/* Icon Switch Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow
                 hover:shadow-md transition-all"
      >
        {theme === "light" ? (
          <div className="flex items-center gap-1">
            <Sun size={18} className="text-yellow-500" />
            <span className="text-sm">Light</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Moon size={18} className="text-blue-400" />
            <span className="text-sm text-gray-800">Dark</span>
          </div>
        )}
      </button>
    </div>
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
