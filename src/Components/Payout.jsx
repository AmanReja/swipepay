import React, { useEffect, useState,useContext } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { Outlet ,Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data } from "../redux/action";
import { Theme } from "../Contexts/Theme";

const Payout = () => {
  const {theme,setTheme} =useContext(Theme)
  const dispatch = useDispatch();
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  console.log(payoutdata, 55);
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  



  useEffect(() => {
    async function fetchdata() {
   

   await dispatch(getall_payoutlog_data());
  
    }fetchdata();
  }, [dispatch]);

  return (
    <div
    className={`w-[100%]  2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
      theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
    }`}
  >
    <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="w-full flex flex-col sm:flex-row gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
  
        {/* Single Payout Form */}
        <form
          className={`sm:w-[30%] w-full flex flex-col gap-4 rounded-xl border ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className={`border-b w-full p-4 ${theme === "dark" ? "border-b-gray-700" : "border-b-gray-200"}`}>
            <h2 className={`text-[16px] font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Single Payout Transaction
            </h2>
          </div>
  
          <div className="w-full px-[30px] flex flex-col gap-[20px]">
            {["Select Debit Account", "Account Number", "IFSC Code", "Beneficiary Name"].map((placeholder, idx) => (
              <div key={idx} className="flex flex-col font-sans">
                <input
                  type="text"
                  placeholder={placeholder}
                  className={`border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200 placeholder:font-semibold placeholder:text-[14px] ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 placeholder:text-gray-400 text-gray-200"
                      : "bg-[#fcfcfc] border-gray-300 placeholder:text-gray-400 text-gray-800"
                  }`}
                />
              </div>
            ))}
  
            <div className="flex justify-between text-[14px] font-semibold text-gray-400">
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
  
            <p className={`text-xs pl-[10px] ${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}>
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
  
        {/* Transactions Table */}
        <div
          className={`flex sm:w-[68%] w-full h-full flex-col rounded-xl overflow-y-auto border ${
            theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-100 text-gray-800"
          }`}
        >
          <div className="flex justify-between items-center p-4 h-[60px] w-full">
            <h2 className="text-[16px] font-semibold">Last 10 Transactions</h2>
            <div
              className={`border-[1px] p-1 px-[20px] rounded-[8px] duration-300 ${
                theme === "dark" ? "border-gray-600 hover:shadow-gray-700" : "border-gray-300 hover:shadow-gray-300"
              }`}
            >
              <Link to={"/dashboard/report"} className="text-[12px] font-medium text-gray-500">
                See More Transaction
              </Link>
            </div>
          </div>
  
          <table className="w-full text-sm text-left">
            <thead
              className={`text-[11px] uppercase border-b border-t ${
                theme === "dark"
                  ? "text-gray-400 border-gray-600 bg-gray-700"
                  : "text-gray-400 border-gray-300 bg-[#fcfcfc]"
              }`}
            >
              <tr>
                <th className="px-4 py-4">#Status</th>
                <th className="px-4 py-4">Txn Date</th>
                <th className="px-4 py-4">UTR</th>
                <th className="px-4 py-4">Account Details</th>
                <th className="px-4 py-4">Amount</th>
              </tr>
            </thead>
  
            <tbody className="text-[12px] font-semibold">
              {payoutdata?.map((txn, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-gray-50 ${
                    theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2">
                    <span
                      className={`text-white rounded-[3px] px-[13px] py-[2px] text-center min-w-[80px] font-bold text-[12px] ${
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
                  <td className="px-4 py-5">{txn.txn_date}</td>
                  <td className="px-4 py-5">{txn.txn_id}</td>
                  <td className="px-4 py-5">{txn.account_no}</td>
                  <td className="px-4 py-5">{txn.settlement_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
      </section>
    </main>
  </div>
  
  );
};

export default Payout;
