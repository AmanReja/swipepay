import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import {useDispatch, useSelector } from "react-redux";
import { getall_wallet_company_data,Payout_report } from "../redux/action";

const Addmoney = () => {
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
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] h-[80%] flex flex-col">
      <main className="w-full  h-full flex-col overflow-y-scroll">
        <section className="w-full flex gap-5 sm:min-h-[900px] h-auto  sm:h-[900px] mt-5 px-5">
          <div className="w-full  flex-col sm:flex-row flex  h-full gap-5 bg-white p-5 rounded-xl ">
            <form className="sm:w-[30%] border-gray-200 border w-full  flex flex-col gap-4 rounded-xl bg-white">
              <div className="border-b-gray-200 border-b-[1px] w-full p-4">
                <h2 className="text-[16px] font-semibold text-gray-800 ">
                  Add Money
                </h2>
              </div>
              <div className="w-full px-[30px] flex flex-col gap-[20px]">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="border bg-[#fcfcfc] placeholder:font-semibold placeholder:text-gray-400 placeholder:text-[14px] border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200"
                    placeholder="Amount"
                  />
                </div>

                <div className="flex flex-col">
                  <input
                    type="date"
                    className="border bg-[#fcfcfc] placeholder:font-semibold placeholder:text-gray-400 placeholder:text-[14px] text-gray-800 text-[14px] border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200"
                  />
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    className="border bg-[#fcfcfc] placeholder:font-semibold placeholder:text-gray-400 placeholder:text-[14px] border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-blue-200"
                    placeholder="UTR No"
                  />
                </div>
                <div className="flex justify-between text-[14px] font-semibold text-gray-400 ">
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
                <p className="text-xs text-gray-800 pl-[3px]">
                  Note: Max ₹5 lakh per transaction, real-time credit, works
                  24x7.
                </p>

                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:shadow-lg transition"
                >
                  Process
                </button>
              </div>
            </form>

            <div className="sm:w-2/5 w-full flex flex-col  gap-5">
              <div className="flex items-center justify-between bg-white shadow rounded-xl p-5 h-[120px]">
                <div className="flex items-center gap-3">
                  <div className=" bg-gray-300 rounded-3xl w-[60px] h-[60px] flex items-center justify-center">
                    <i className="fa-solid fa-wallet text-white text-xl"></i>
                  </div>

                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      Payout Fund
                    </h1>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                </div>
                <h1 className="text-lg font-bold text-gray-800">
                 {payoutdata?.total_payout_value
} ₹
                </h1>
              </div>

              <div className="flex items-center justify-between bg-white shadow rounded-xl p-5 h-[120px]">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-300 rounded-3xl w-[60px] h-[60px] flex items-center justify-center">
                    <i className="fa-solid fa-credit-card text-white text-xl"></i>
                  </div>

                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      Card Balance
                    </h1>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                </div>
                <h1 className="text-lg font-bold text-gray-800">
                  ₹ 
                </h1>
              </div>

              <div className="bg-white shadow rounded-xl ">
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm text-gray-700">
                  {/* Table Row */}
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <h1 className="text-lg font-semibold text-gray-800 ">
                      Account Details
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <p className="font-medium text-gray-600">Account Name:</p>
                    <p className="text-right font-semibold text-gray-800">
                      Aakash
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <p className="font-medium text-gray-600">A/C No:</p>
                    <p className="text-right font-semibold text-gray-800">
                      BB559900000036
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <p className="font-medium text-gray-600">IFSC Code:</p>
                    <p className="text-right font-semibold text-gray-800">
                      HDFC0000060
                    </p>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-4">
                    <p className="font-medium text-gray-600">Bank Name:</p>
                    <p className="text-right font-semibold text-gray-800">
                      HDFC Bank Ltd
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-xl ">
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm text-gray-700">
                  {/* Table Row */}
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <h1 className="text-lg font-semibold text-gray-800 ">
                      Account Details
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <p className="font-medium text-gray-600">Account Name:</p>
                    <p className="text-right font-semibold text-gray-800">
                      Busybox Payout Account
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <p className="font-medium text-gray-600">A/C No:</p>
                    <p className="text-right font-semibold text-gray-800">
                      016081300000116
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-300 px-4 py-4">
                    <p className="font-medium text-gray-600">IFSC Code:</p>
                    <p className="text-right font-semibold text-gray-800">
                      YESB0000160
                    </p>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-4">
                    <p className="font-medium text-gray-600">Bank Name:</p>
                    <p className="text-right font-semibold text-gray-800">
                      Yes Bank Ltd
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full px-[20px] mt-[20px]">
          <div className="flex w-[100%] h-full flex-col border-gray-100 border-[1px] bg-white rounded-xl   overflow-y-auto">
            <div className="text flex justify-between items-center p-4  h-full w-full">
              <h2 className="text-[16px]  font-semibold text-gray-800 ">
                Last 10 Transactions
              </h2>
              <div className="border-gray-300 border-[1px] p-2 px-[20px] rounded-[8px] ">
                <p className="text-[12px]  font-medium text-gray-500 ">
                  See More Transaction
                </p>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-[11px] text-gray-400 uppercase border-b bg-[#fcfcfc] border-gray-300 border-t">
                <tr>
                  <th className="px-4 py-4">#Status</th>
                  <th className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <p>Txn Date</p>
                      <div className="flex flex-col justify-center items-center leading-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#1f1f1f"
                          className="-mb-[4px]"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#1f1f1f"
                          className="-mt-[4px]"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>

                  <th className="px-4 py-4">
                    {" "}
                    <div className="flex items-center space-x-1">
                      <p>AEPS WALLET
</p>
                      <div className="flex flex-col justify-center items-center leading-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#dbdad7"
                          className="-mb-[4px]"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#1f1f1f"
                          className="-mt-[4px]"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="px-4 py-4">
                    {" "}
                    <div className="flex items-center space-x-1">
                      <p>Account Details</p>
                      <div className="flex flex-col justify-center items-center leading-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#1f1f1f"
                          className="-mb-[4px]"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#dbdad7"
                          className="-mt-[4px]"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <p>hold balance
</p>
                      <div className="flex flex-col justify-center items-center leading-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#1f1f1f"
                          className="-mb-[4px]"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14px"
                          viewBox="0 -960 960 960"
                          width="14px"
                          fill="#dbdad7"
                          className="-mt-[4px]"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-[12px] font-semibold">
                {walletcompanydata?.map((txn, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50"
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
