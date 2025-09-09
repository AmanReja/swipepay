import { React, useEffect,useContext } from "react";
import Hdfc from "../assets/images/HDFC.png";
import Chart from "./Chart";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import bg3 from "../assets/images/bg-3.png";
import Subfooter from "./Subfooter";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data,getall_wallet_company_data,get_vertualaccountdetails,get_collections} from "../redux/action";
import {BadgeCheck,ArrowDownLeft,ArrowUpRight,CreditCard} from "lucide-react"
import Chart2 from "./Chart2";

import { Theme } from "../Contexts/Theme";



const Summery = () => {
  const {theme,setTheme} =useContext(Theme)



  const dispatch = useDispatch();
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  const walletdata = useSelector((state) => state.walletcompany.walletcompany.total);
  const vaaccountdata = useSelector((state) => state.vaaccount.vaaccount);
  const collectiondata = useSelector((state) => state.collections.collections.count);
  console.log(18,collectiondata);
  



   
  
    






  useEffect(() => {
    dispatch(getall_payoutlog_data())
    dispatch(getall_wallet_company_data())
    dispatch(get_vertualaccountdetails())
    dispatch(get_collections())
    
  }, [dispatch]);


  const totallpayouts = payoutdata?.length;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const loginSuccess = params.get("login");

  const sucesslog = () => {
    if (loginSuccess === "success") {
      toast.success("🦄 log success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };
  useEffect(() => {
    sucesslog();
  }, [loginSuccess]);

  const icons = [
    {
      icon: <ArrowUpRight size={44}  className={`${theme==="dark"?"text-white":"text-gray-600"}`}/>,
      num: totallpayouts,
      text: "Payouts",
      deg: "-50deg",
    },
    {
      icon: <ArrowDownLeft size={44} className={`${theme==="dark"?"text-white":"text-gray-600"}`}/>,
      num: collectiondata,
      text: "Collection",
      deg: "130deg",
    },
    {
      icon: <CreditCard size={44} className={`${theme==="dark"?"text-white":"text-gray-600"}`} />,
      num: 0,
      text: "Cards Created",
      deg: "0deg",
    },
    {
      icon: <BadgeCheck size={44} className={`${theme==="dark"?"text-white":"text-gray-600"}`}/>,
      num: 0,
      text: "Identity Verified",
      deg: "0deg",
    },
  ];

  return (
    
    <>
      <ToastContainer></ToastContainer>
      <div
  className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col 
  ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
>
  <main className="w-full h-full flex flex-col overflow-y-scroll">
   
    <div className="w-full sm:h-[50px] h-[90px] sm:flex-row flex-col px-[20px] flex items-center justify-between mt-[2px] sm:mt-[30px]">
      <h1
        className={`text-[23px] font-semibold ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Dashboard Summary
      </h1>

      <div className="h-full w-full sm:w-[360px] gap-[10px] flex">
       
        <div
          className={`border-dashed rounded flex flex-col w-[105px] text-center gap-[2px] p-[5px] 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
        >
          <p
            className={`text-[12px] font-semibold ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            ₹ {walletdata}
          </p>
          <p
            className={`text-[12px] font-normal ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Wallet Balance
          </p>
        </div>

 
        <div
          className={`border-dashed rounded flex flex-col w-[105px] text-center gap-[2px] p-[5px] 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
        >
          <p
            className={`text-[12px] font-semibold ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            ₹ 0
          </p>
          <p
            className={`text-[12px] font-normal ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Unsettled
          </p>
        </div>

      
        <div
          className={`border-dashed rounded flex flex-col w-[105px] text-center gap-[2px] p-[5px] 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
        >
          <p
            className={`text-[12px] font-semibold ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            ₹ 0
          </p>
          <p
            className={`text-[12px] font-normal ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Settled
          </p>
        </div>
      </div>
    </div>

  
    <div className="w-full h-[676px] justify-between sm:flex-row gap-[10px] flex-col flex mt-[5px] p-2 px-[20px]">
    
      <div className="bg-gradient-to-r hover:translate-y-[-5px] duration-300 from-violet-500 to-indigo-500 text-white p-8 rounded-lg shadow-lg w-full sm:w-[590px] h-full">
        <div className="w-full h-[60px] font-semibold mb-4 flex items-center gap-[20px]">
          <div className="w-[70%]">
            <h1 className="text-[20px]">Virtual Account</h1>
            <p className="text-blue-200 font-normal text-[14px]">HDFC Bank</p>
          </div>
          <div
            className={`border h-[60px] w-[22%] rounded-[5px] p-1 flex justify-center items-center 
            ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}
          >
            <img
              className="object-contain w-[50px] h-[50px]"
              src={Hdfc}
              alt=""
            />
          </div>
        </div>

        <div className="w-full h-[60px]">
          <p className="font-semibold text-[12px] text-gray-100">
            Account Number
          </p>
          <h1 className="font-bold text-[18px] text-white">
            {vaaccountdata[0]?.account_number}
          </h1>
        </div>

        <div className="w-full h-[60px]">
          <p className="font-semibold text-[12px] text-gray-100">IFSC Code</p>
          <h1 className="font-bold text-[18px] text-white">
            {vaaccountdata[0]?.ifsc_code}
          </h1>
        </div>
      </div>

     
      <div className="flex w-full z-0 sm:w-[60%] h-full">
        <div className="grid grid-cols-2 grid-rows-2 text-left w-full h-full gap-4">
          {icons.map(({ icon, num, text }) => (
            <div
              key={text}
              style={{ backgroundImage: `url(${bg3})`,
            backgroundSize:"200px" }}
              className={`flex bg-no-repeat  bg-left-top bg-contain flex-col items-center justify-between rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
              ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="w-full flex justify-center items-center h-[40%]">
                {icon}
              </div>
              <div className="w-full text-center h-[60%]">
                <h1
                  className={`text-4xl font-semibold ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {num}
                </h1>
                <p
                  className={`text-base ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

   
    <section className="w-full flex flex-col sm:flex-row gap-[20px] sm:min-h-[400px] sm:h-[400px] px-[20px]">
 
      <div className="flex w-full sm:w-[50%] h-[100%] flex-col justify-center items-center">
        <div
          className={`p-2 rounded-2xl h-[89%] px-[5px] border w-full flex justify-center items-center 
          ${theme === "dark" ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white border-gray-300 shadow-sky-100"} shadow-xl`}
        >
          <Chart2 />
        </div>
      </div>

     
      <div className="rounded-2xl flex w-full sm:w-[50%] h-[100%] flex-col justify-center items-center">
        <header
          className={`w-full h-[18%] flex justify-around items-center rounded-t-2xl shadow-sm border 
          ${theme === "dark" ? "border-gray-700 bg-gradient-to-r from-gray-700 to-gray-800" : "border-gray-200 bg-gradient-to-r from-sky-50 to-sky-100"}`}
        >
          <h1
            className={`text-[20px] font-semibold ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Earnings
          </h1>
          <select
            className={`text-[12px] rounded-lg w-[130px] outline-none px-[12px] border py-[8px] shadow-sm 
            ${theme === "dark" ? "text-gray-300 border-gray-600 bg-gray-700" : "text-gray-600 border-gray-300 bg-white"}`}
          >
            <option value="1 month">1 month</option>
            <option value="3 month">2 month</option>
            <option value="6 month">6 month</option>
            <option selected value="12 month">
              12 month
            </option>
          </select>
        </header>
        <div
          className={`rounded-bl-2xl rounded-br-2xl h-[80%] px-[5px] border w-full flex justify-center items-center shadow-xl 
          ${theme === "dark" ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white border-gray-300 shadow-sky-100"}`}
        >
          <Chart />
        </div>
      </div>
    </section>
  </main>
</div>


    </>
  );
};

export default Summery;
