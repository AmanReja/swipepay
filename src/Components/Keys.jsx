
import { React, useEffect } from "react";
import Hdfc from "../assets/images/HDFC.png";
import Chart from "./Chart";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import bg3 from "../assets/images/bg-3.png";
import Subfooter from "./Subfooter";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data,getall_wallet_company_data,get_vertualaccountdetails} from "../redux/action";
import {BadgeCheck,ArrowDownLeft,ArrowUpRight,CreditCard} from "lucide-react"



const Keys = () => {



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
      
      <div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%]   flex flex-col">
        <main className="w-full  h-full flex flex-col overflow-y-scroll">
          
        <section className="flex flex-col w-full p-4 sm:min-h-[600px] 2xl:h-[780px]  sm:h-[600px] gap-[30px]">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div>
      <p className="text-sm font-medium text-gray-700">Public Key</p>
      <p className="text-xs text-gray-500 truncate w-52">
        pk_live_1234567890abcdef
      </p>
    </div>
    <button className="px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
      Copy
    </button>
  </div>

  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div>
      <p className="text-sm font-medium text-gray-700">Secret Key</p>
      <p className="text-xs text-gray-500 truncate w-52">
        sk_live_abcdef1234567890
      </p>
    </div>
    <button className="px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
      Copy
    </button>
  </div>

<div className="mt-6">
  <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
    Generate New Key
  </button>
</div>
        </section>

         
        </main>
      </div>
    </>
  );
};

export default Keys;


