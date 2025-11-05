import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";

const Transactionreport = () => {
  const [searchdate, setSearchdate] = useState("");

  const date = new Date();
  const getalldata = async () => {
    const res = await fetch(`https://api.busybox.in/payment/payment`);
    const data = await res.json();
    
  };

  useEffect(() => {
    getalldata();
  }, []);

  const transactions = [
    {
      status: "Success",
      date: "2025-07-29 17:15:51",
      utr: "UTR12345678",
      account: "Aman Reja - HDFC ****1234",
      amount: 5000,
    },
    {
      status: "Failed",
      date: "2025-07-23",
      utr: "UTR87654321",
      account: "Nisha Patel - SBI ****4321",
      amount: 2300,
    },
    {
      status: "Pending",
      date: "2025-07-22",
      utr: "UTR34984576",
      account: "Rahul Kumar - ICICI ****9876",
      amount: 1500,
    },
    {
      status: "Success",
      date: "2025-07-21",
      utr: "UTR45238765",
      account: "Priya Sharma - Axis ****1122",
      amount: 6200,
    },
    {
      status: "Success",
      date: "2025-07-20",
      utr: "UTR99887766",
      account: "Vikas Singh - Kotak ****3344",
      amount: 4800,
    },
    {
      status: "Failed",
      date: "2025-07-19",
      utr: "UTR56473829",
      account: "Sneha Roy - Yes Bank ****5566",
      amount: 1200,
    },
    {
      status: "Pending",
      date: "2025-07-18",
      utr: "UTR83726194",
      account: "Alok Mehta - BOI ****7788",
      amount: 3000,
    },
    {
      status: "Success",
      date: "2025-07-17",
      utr: "UTR26473829",
      account: "Meena Verma - Union ****9900",
      amount: 7000,
    },
    {
      status: "Success",
      date: "2025-07-16",
      utr: "UTR92736455",
      account: "Suresh Raina - PNB ****1111",
      amount: 5400,
    },
    {
      status: "Pending",
      date: "2025-07-15",
      utr: "UTR37482736",
      account: "Geeta Das - UCO ****2222",
      amount: 2500,
    },
  ];
  return (
    <div className=" w-[100%] rounded-2xl h-[80%] flex flex-col">
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full px-5 mt-5">
          <div className="w-full h-[80px]  bg-white flex items-center px-5 ">
            <div className="flex gap-[5px] h-full items-center w-full">
              <h1 className="text-xl content-center font-semibold text-gray-800">
                Debit Presentation Master
              </h1>

              <div className="flex items-center text-sm text-gray-500 space-x-1 mt-1 sm:mt-0">
                <a href="#" className="hover:underline text-gray-400">
                  Home
                </a>
                <span>/</span>
                <a href="#" className="hover:underline text-gray-400">
                  Report
                </a>
                <span>/</span>
                <span className="text-gray-700 font-medium">My Ledger</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full px-[20px] mt-[20px]">
          <div className="flex w-[100%] h-full flex-col border-gray-100 border-[1px] bg-white rounded-xl   overflow-y-auto">
            <div className="flex justify-between items-center p-4 py-6  w-full flex-wrap gap-4 bg-white shadow-sm ">
              <h2 className="text-lg font-semibold text-gray-800">
                Debit Presentation Master
              </h2>

              <div className="flex gap-3 flex-wrap items-center">
                <div className="border border-gray-300 px-4 py-1 rounded-lg bg-white flex items-center justify-between space-x-2">
                  <i className="fa-regular fa-calendar-days text-gray-400"></i>
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearchdate(e.target.value);
                    }}
                    className="text-sm text-gray-700 bg-transparent outline-none"
                    placeholder={`${date.toLocaleDateString()}-${date.toLocaleDateString()}`}
                    value={searchdate}
                  />
                </div>

                <div className="relative border border-gray-300 px-2 py-1 rounded-lg bg-white">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Search transaction"
                    className="pl-8 pr-2 outline-none text-sm text-gray-700 bg-transparent"
                  />
                </div>

                <div className="border border-gray-300 px-4 py-1 rounded-lg bg-white">
                  <select className="text-sm text-gray-700 bg-transparent outline-none">
                    <option value="All Transactions">All Transactions</option>
                    <option selected value="Success">
                      Success
                    </option>
                    <option value="Pending">initiated</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-md overflow-hidden">
              <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3">Customer Details</th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <p>Creation Date</p>
                      <div className="flex flex-col justify-center items-center leading-none">
                        <svg
                          className="-mb-[4px]"
                          xmlns="http://www.w3.org/2000/svg"
                          height="14"
                          viewBox="0 -960 960 960"
                          width="14"
                          fill="#1f1f1f"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                        <svg
                          className="-mt-[4px]"
                          xmlns="http://www.w3.org/2000/svg"
                          height="14"
                          viewBox="0 -960 960 960"
                          width="14"
                          fill="#1f1f1f"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <p>Mandate Details</p>
                      <div className="flex flex-col justify-center items-center leading-none">
                        <svg
                          className="-mb-[4px]"
                          xmlns="http://www.w3.org/2000/svg"
                          height="14"
                          viewBox="0 -960 960 960"
                          width="14"
                          fill="#dbdad7"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                        <svg
                          className="-mt-[4px]"
                          xmlns="http://www.w3.org/2000/svg"
                          height="14"
                          viewBox="0 -960 960 960"
                          width="14"
                          fill="#1f1f1f"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th className="px-4 py-3">Account Number</th>
                  <th className="px-4 py-3">Mandate Value</th>
                  <th className="px-4 py-3">#Status</th>
                </tr>
              </thead>

              <tbody className="text-[13px] font-medium">
                {transactions.map((txn, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 font-medium">
                          REQUEST ID:{" "}
                          <span className="font-semibold text-gray-900">
                            {txn.utr}
                          </span>
                        </p>
                        <div className="flex items-center space-x-2 text-xs font-semibold">
                          <span className="flex items-center justify-center w-6 h-6 bg-green-100 border border-green-300 text-green-700 rounded">
                            CR
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="flex items-center justify-center w-[80px] h-6 bg-gray-100 border border-gray-300 text-gray-700 rounded">
                            REFUND
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">{txn.date}</td>

                    <td className="px-4 py-4">{txn.utr}</td>

                    <td className="px-4 py-4">{txn.account}</td>

                    <td className="px-4 py-4">
                      ₹{txn.amount.toLocaleString()}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`text-white rounded-[4px] px-3 py-1 min-w-[80px] text-center inline-block font-bold text-[12px] ${
                          txn.status === "Success"
                            ? "bg-green-500"
                            : txn.status === "Pending"
                            ? "bg-yellow-400 text-black"
                            : "bg-red-400"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white text-sm text-gray-600">
              <div>
                Show{" "}
                <select
                  className="rounded border-[1px] outline-none border-gray-300 px-[5px] py-[5px]"
                  name=""
                  id=""
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>{" "}
                per page
              </div>

              <div className="flex items-center space-x-2">
                <p>1-10 of 7406</p>
                <button className="px-3 py-1  border-gray-300 rounded-md  hover:bg-gray-200">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-gray-200 font-medium">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                  3
                </button>
                <span className="px-2 text-gray-400">...</span>

                <button className="px-3 py-1  border-gray-300 rounded-md  hover:bg-gray-200">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactionreport;
