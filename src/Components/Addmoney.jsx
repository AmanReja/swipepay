import React, { useEffect, useState ,useContext} from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import {useDispatch, useSelector } from "react-redux";
import { getall_wallet_company_data,Payout_report } from "../redux/action";

import {Theme} from "../Contexts/Theme"


const Addmoney = () => {
const {theme,setTheme} = useContext(Theme);

  const [walldata,setWalldata] = useState([])

  const dispatch = useDispatch();
  const walletcompanydata = useSelector((state)=>state.walletcompany.walletcompany.data)
  const payoutdata = useSelector((state)=>state.payoutreport.payoutreport)
  
  console.log(55,walletcompanydata);
  





  useEffect(() => {
   dispatch(getall_wallet_company_data()),
   dispatch(Payout_report())
  }, [dispatch]);


//   const walletReducer = walletcompanydata.reduce((acc, bal) => acc + bal.wallet_balance, 0);


// console.log(18,walletReducer);
 
  return (
    <div className="w-[100%] rounded-2xl 2xl:h-[85%] h-[80%] flex flex-col">
    <main className="w-full h-full flex-col overflow-y-scroll">
      <section className="w-full flex gap-5 sm:min-h-[450px] h-auto sm:h-[450px] mt-5 px-5">
        <div
          className={`w-full flex-col sm:flex-row flex h-full gap-5 p-5 rounded-xl ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* FORM */}
          <form
            className={`sm:w-[30%] border w-full flex flex-col gap-4 rounded-xl ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <div
              className={`w-full p-4 border-b ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <h2
                className={`text-[16px] font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Add Money
              </h2>
            </div>
  
            <div className="w-full px-[30px] flex flex-col gap-[20px]">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Amount"
                  className={`border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200 placeholder:font-semibold placeholder:text-[14px] ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
                      : "bg-[#fcfcfc] text-gray-800 border-gray-300 placeholder:text-gray-400"
                  }`}
                />
              </div>
  
              <div className="flex flex-col">
                <input
                  type="date"
                  className={`border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200 text-[14px] ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-[#fcfcfc] text-gray-800 border-gray-300"
                  }`}
                />
              </div>
  
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="UTR No"
                  className={`border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200 placeholder:font-semibold placeholder:text-[14px] ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
                      : "bg-[#fcfcfc] text-gray-800 border-gray-300 placeholder:text-gray-400"
                  }`}
                />
              </div>
  
              <div
                className={`flex justify-between text-[14px] font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-400"
                }`}
              >
                {["IMPS", "NEFT", "RTGS"].map((method) => (
                  <div key={method} className="flex items-center gap-2">
                    <input
                      id={method.toLowerCase()}
                      name="type"
                      type="radio"
                      className="w-4 h-4 accent-blue-500"
                    />
                    <label htmlFor={method.toLowerCase()}>{method}</label>
                  </div>
                ))}
              </div>
  
              <p
                className={`text-xs pl-[3px] ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Note: Max ₹5 lakh per transaction, real-time credit, works 24x7.
              </p>
  
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:shadow-lg transition"
              >
                Process
              </button>
            </div>
          </form>
  
          {/* CARDS + WIDGETS */}
          <div className="w-full flex flex-col gap-5">
            <div className="flex gap-[30px]">
              {/* Payout Fund */}
              <div
                className={`flex w-[50%] items-center justify-between shadow rounded-xl p-5 h-[120px] ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-[#fcfcfc] text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-300 rounded-3xl w-[60px] h-[60px] flex items-center justify-center">
                    <i
                      className={`fa-solid fa-wallet text-xl ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    ></i>
                  </div>
                  <div>
                    <h1
                      className={`text-lg font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Payout Fund
                    </h1>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                </div>
                <h1
                  className={`text-lg font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {payoutdata?.total_payout_value} ₹
                </h1>
              </div>
  
              {/* Card Balance */}
              <div
                className={`flex items-center justify-between w-[50%] shadow rounded-xl p-5 h-[120px] ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-[#fcfcfc] text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-300 rounded-3xl w-[60px] h-[60px] flex items-center justify-center">
                    <i
                      className={`fa-solid fa-credit-card text-xl ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    ></i>
                  </div>
                  <div>
                    <h1
                      className={`text-lg font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Card Balance
                    </h1>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                </div>
                <h1
                  className={`text-lg font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  ₹
                </h1>
              </div>
            </div>
  
            {/* Account Details */}
            <div className="flex w-full gap-[30px]">
              {/* Left */}
              <div
                className={`shadow rounded-xl w-[50%] ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`w-full border rounded-lg overflow-hidden text-sm ${
                    theme === "dark"
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  <div
                    className={`grid grid-cols-2 border-b px-4 py-4 ${
                      theme === "dark"
                        ? "border-gray-700 text-white"
                        : "border-gray-300 text-gray-800"
                    }`}
                  >
                    <h1 className="text-lg font-semibold">Account Details</h1>
                  </div>
                  <div className="grid grid-cols-2 border-b px-4 py-4 border-gray-300 dark:border-gray-700">
                    <p className="font-medium">Account Name:</p>
                    <p className="text-right font-semibold">Aakash</p>
                  </div>
                  <div className="grid grid-cols-2 border-b px-4 py-4 border-gray-300 dark:border-gray-700">
                    <p className="font-medium">A/C No:</p>
                    <p className="text-right font-semibold">BB559900000036</p>
                  </div>
                  <div className="grid grid-cols-2 border-b px-4 py-4 border-gray-300 dark:border-gray-700">
                    <p className="font-medium">IFSC Code:</p>
                    <p className="text-right font-semibold">HDFC0000060</p>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-4">
                    <p className="font-medium">Bank Name:</p>
                    <p className="text-right font-semibold">HDFC Bank Ltd</p>
                  </div>
                </div>
              </div>
  
              {/* Right */}
              <div
                className={`shadow rounded-xl w-[50%] ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`w-full border rounded-lg overflow-hidden text-sm ${
                    theme === "dark"
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  <div
                    className={`grid grid-cols-2 border-b px-4 py-4 ${
                      theme === "dark"
                        ? "border-gray-700 text-white"
                        : "border-gray-300 text-gray-800"
                    }`}
                  >
                    <h1 className="text-lg font-semibold">Account Details</h1>
                  </div>
                  <div className="grid grid-cols-2 border-b px-4 py-4 border-gray-300 dark:border-gray-700">
                    <p className="font-medium">Account Name:</p>
                    <p className="text-right font-semibold">
                      Busybox Payout Account
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border-b px-4 py-4 border-gray-300 dark:border-gray-700">
                    <p className="font-medium">A/C No:</p>
                    <p className="text-right font-semibold">016081300000116</p>
                  </div>
                  <div className="grid grid-cols-2 border-b px-4 py-4 border-gray-300 dark:border-gray-700">
                    <p className="font-medium">IFSC Code:</p>
                    <p className="text-right font-semibold">YESB0000160</p>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-4">
                    <p className="font-medium">Bank Name:</p>
                    <p className="text-right font-semibold">Yes Bank Ltd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      {/* Transactions Table */}
      <div className="w-full px-[20px] mt-[20px]">
        <div
          className={`flex w-[100%] h-full flex-col border rounded-xl overflow-y-auto ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-100 text-gray-800"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-[16px] font-semibold">Last 10 Transactions</h2>
            <div
              className={`border p-2 px-[20px] rounded-[8px] ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              <p className="text-[12px] font-medium">See More Transaction</p>
            </div>
          </div>
  
          <table className="w-full text-sm text-left">
            <thead
              className={`text-[11px] uppercase border-t border-b ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-300 border-gray-600"
                  : "bg-[#fcfcfc] text-gray-400 border-gray-300"
              }`}
            >
              <tr>
                <th className="px-4 py-4">#Status</th>
                <th className="px-4 py-4">Txn Date</th>
                <th className="px-4 py-4">AEPS Wallet</th>
                <th className="px-4 py-4">Account Details</th>
                <th className="px-4 py-4">Hold Balance</th>
              </tr>
            </thead>
            <tbody
              className={`text-[12px] font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {walletcompanydata?.map((txn, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    theme === "dark"
                      ? "border-gray-700 hover:bg-gray-700/60"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2">
                    <span
                      className={`text-white rounded-[3px] px-[13px] py-[2px] text-center content-center min-w-[80px] h-[5px] w-[80px] font-bold text-[12px] ${
                        txn.status === "SUCCESS"
                          ? "bg-green-400"
                          : txn.status === "PENDING"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-5">{txn.last_update}</td>
                  <td className="px-4 py-5">{txn.aeps_wallet}</td>
                  <td className="px-4 py-5">{txn.aeps_wallet}</td>
                  <td className="px-4 py-5">{txn.hold_balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
  
  );
};

export default Addmoney;
