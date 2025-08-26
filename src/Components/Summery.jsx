import { React, useEffect } from "react";
import Hdfc from "../assets/images/HDFC.png";
import Chart from "./Chart";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import bg3 from "../assets/images/bg-3.png";
import Subfooter from "./Subfooter";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data,getall_wallet_company_data } from "../redux/action";
import {BadgeCheck,ArrowDownLeft,ArrowUpRight,CreditCard} from "lucide-react"



const Summery = () => {



  const dispatch = useDispatch();
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  const walletdata = useSelector((state) => state.walletcompany.walletcompany.total);
  console.log(18,walletdata);
  



  useEffect(() => {
    dispatch(getall_payoutlog_data())
    dispatch(getall_wallet_company_data())
    
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
      <ToastContainer></ToastContainer>
      <div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%]   flex flex-col">
        <main className="w-full  h-full flex flex-col overflow-y-scroll">
          <div className="w-full sm:h-[50px] h-[90px] sm:flex-row flex-col px-[20px]   flex items-center justify-between mt-[2px] sm:mt-[30px] ">
            <h1 className="text-[23px] font-semibold">Dashboard Summary</h1>
            <div className="h-full w-full sm:w-[360px] gap-[10px] flex">
              <div className="border-dashed rounded flex flex-col w-[105px] border-gray-400 border-[1px] text-center gap-[2px] p-[5px]">
                <p className="text-[12px]  font-semibold">₹ {walletdata}</p>
                <p className="text-[12px] font-normal text-gray-500">
                  Wallet Balance
                </p>
              </div>
              <div className="border-dashed rounded flex flex-col text-center border-gray-400 border-[1px] w-[105px] gap-[2px] p-[5px]">
                <p className="text-[12px] font-semibold">₹ 0</p>
                <p className="text-[12px] font-normal text-gray-500">
                  Unsettled
                </p>
              </div>
              <div className="border-dashed rounded flex flex-col text-center border-gray-400 border-[1px] w-[105px] gap-[2px] p-[5px]">
                <p className="text-[12px] font-semibold">₹ 0</p>
                <p className="text-[12px] font-normal text-gray-500">Settled</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[676px]  justify-between flex mt-[5px] p-2 px-[20px]">
            <div className="bg-gradient-to-r hover:translate-y-[-5px]  duration-300 from-violet-500  to-indigo-500  text-white p-8 rounded-lg shadow-lg w-full sm:w-[590px] h-full">
              <div className="w-full h-[60px] font-semibold mb-4 flex items-center gap-[20px]">
                <div className=" w-[70%]">
                  <h1 className="text-[20px]">Virtual Account</h1>
                  <p className="text-blue-200 font-normal text-[14px]">
                    HDFC Bank
                  </p>
                </div>
                <div className="border h-[60px] w-[22%] bg-white rounded-[5px] p-1 flex justify-center items-center">
                  <img
                    className="object-contain w-[50px] h-[50px]"
                    src={Hdfc}
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full  h-[60px]">
                <p className="font-semibold text-[12px]">Account Number</p>
                <h1 className="font-bold text-[18px]"> BB559900000036</h1>
              </div>
              <div className="w-full  h-[60px]">
                <p className="font-semibold text-[12px]">IFSC Code</p>
                <h1 className="font-bold text-[18px]">HDFC0000060</h1>
              </div>
              
            </div>
            <div className="flex w-full z-0 sm:w-[60%] h-full">
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-4">
                {icons.map(({ icon, num, text, deg }) => (
                  <div
                    style={{ backgroundImage: `url(${bg3})` }}
                    className="flex bg-no-repeat bg-left-top bg-contain flex-col  items-center justify-between  rounded-xl p-4   shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-full  flex justify-center items-center h-[40%]">
                      
                     {icon}
                    </div>
                    <div className="w-full text-center h-[60%]">
                      <h1 className="text-4xl font-semibold text-gray-800">
                        {num}
                      </h1>
                      <p className="text-base text-gray-500">{text}</p>
                    </div>
                  </div>
                ))}

                
              </div>
            </div>
          </div>
          <section className="w-full flex flex-col sm:flex-row  gap-[20px]   sm:min-h-[400px] sm:h-[400px]  px-[20px]">
        

            <div className="flex w-full  h-[100%]  flex-col justify-center items-center">
              <header className="w-full h-[18%] flex justify-around items-center border border-gray-200 bg-gradient-to-r from-sky-50 to-sky-100 rounded-t-2xl shadow-sm">
                <h1 className="text-[20px] font-semibold text-gray-700">
                  Earnings
                </h1>
                <select className="text-[12px] text-gray-600 border-gray-300 rounded-lg w-[130px] outline-none px-[12px] border py-[8px] bg-white shadow-sm">
                  <option value="1 month">1 month</option>
                  <option value="3 month">2 month</option>
                  <option value="6 month">6 month</option>
                  <option selected value="12 month">
                    12 month
                  </option>
                </select>
              </header>
              <div className=" shadow-xl shadow-sky-100 h-[80%] px-[5px]  border w-full border-gray-300 flex justify-center items-center">
                <Chart></Chart>
              </div>
            </div>
          </section>
         
        </main>
      </div>
    </>
  );
};

export default Summery;
