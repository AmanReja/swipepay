
import { React, useEffect ,useContext} from "react";
import Hdfc from "../assets/images/HDFC.png";
import Chart from "./Chart";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import bg3 from "../assets/images/bg-3.png";
import Subfooter from "./Subfooter";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data,getall_wallet_company_data,get_vertualaccountdetails} from "../redux/action";
import {BadgeCheck,ArrowDownLeft,ArrowUpRight,CreditCard} from "lucide-react"

import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { verify_aadhar } from "../redux/action";
import { Theme } from "../Contexts/Theme";




const Keys = ({
  type = "Virtual Debit Card",
  holder = "John Doe",
  number = "**** **** **** 1234",
  expiry = "12/27",
  network = "Visa",
  color = "from-indigo-500 to-purple-600",
}) => {

  const {theme,setTheme}=useContext(Theme)



  const dispatch = useDispatch();
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  const walletdata = useSelector((state) => state.walletcompany.walletcompany.total);
  const vaaccountdata = useSelector((state) => state.vaaccount.vaaccount);
  console.log(18,vaaccountdata);
  



  useEffect(() => {
    dispatch(getall_payoutlog_data())
    dispatch(getall_wallet_company_data())
    dispatch(get_vertualaccountdetails())
    
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
      icon: <ArrowUpRight size={44}  className="text-gray-600"/>,
      num: totallpayouts,
      text: "Payouts",
      deg: "-50deg",
    },
    {
      icon: <ArrowDownLeft size={44}  className="text-gray-600"/>,
      num: 0,
      text: "Collection",
      deg: "130deg",
    },
    {
      icon: <CreditCard size={44} className="text-gray-600" />,
      num: 0,
      text: "Cards Created",
      deg: "0deg",
    },
    {
      icon: <BadgeCheck size={44} className="text-gray-600"/>,
      num: 0,
      text: "Identity Verified",
      deg: "0deg",
    },
  ];

  return (
    
    <>
      
      <div className="w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
    <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="flex flex-col w-full h-[900px] p-6 sm:min-h-[800px] 2xl:h-[780px] gap-10">
        
        {/* Secret Key Box */}
        <div className="flex items-center justify-between p-5 bg-white/60 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-xl">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secret Key</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-56 font-mono">
              sk_live_abcdef1234567890
            </p>
          </div>
          <button className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition">
            Copy
          </button>
        </div>
  
        {/* Generate Key */}
        <div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition">
            Generate New Key
          </button>
        </div>
  
        {/* Virtual Card */}
       
      </section>
    </main>
  </div>
    </>
  );
};

export default Keys;


