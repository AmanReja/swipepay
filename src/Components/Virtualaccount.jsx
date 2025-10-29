import React, { useEffect, useRef, useState } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { DateRangePicker } from "@heroui/react";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";

const Virtualaccount = () => {
  const [date, setDate] = useState({ startDate: null, endDate: null });

  const dateRangeRef = useRef(null);

  useEffect(() => {
    flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "d-m-y",
      defaultDate: ["15-07-2025", "16-07-2025"],
      value: date,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          setDate({ startDate: start, endDate: end });
        }
      },
    });
  }, []);

  // const getalldata = async () => {
  //   const res = await fetch(`https://api.busybox.in/payment/payment`);
  //   const data = await res.json();
  //   console.log(12, data);
  // };

  // useEffect(() => {
  //   getalldata();
  // }, []);

  console.log(date, 22);

  const transactions = [
    {
      status: "Success",
      date: "2025-07-24",
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
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] h-[80%] flex flex-col">
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full px-5 mt-5">
          <div className="w-full h-[80px]  bg-white flex items-center px-5 ">
            <div className="flex gap-[5px] h-full items-center w-full">
              <h1 className="text-xl content-center font-semibold text-gray-800">
                {" "}
                Virtual Account
              </h1>

              <div className="flex items-center text-sm text-gray-500 space-x-1 mt-1 sm:mt-0">
                <a href="#" className="hover:underline text-gray-400">
                  Home
                </a>
                <span>/</span>
                <a href="#" className="hover:underline text-gray-400">
                  Collection
                </a>
                <span>/</span>
                <span className="text-gray-700 font-medium">
                  VA Master Data
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full px-[20px] mt-[20px]">
          <div className="flex w-[100%] h-full flex-col border-gray-400 border-[1px] bg-white rounded-xl   overflow-y-auto">
            <div className="flex justify-between items-center p-4 w-full flex-wrap gap-4 bg-white shadow-sm rounded-md">
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800">
                Virtual Account
              </h2>

              {/* Controls */}
              <div className="flex gap-3 flex-wrap items-center">
                <div className="border-gray-300 pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2">
                  <i class="fa-solid fa-calendar-days text-gray-300"></i>
                  <input
                    className="w-[180px] text-[14px]  content-center justify-center text-gray-400 outline-none  rounded"
                    type="text"
                    ref={dateRangeRef}
                  />
                </div>

                {/* Search with icon */}
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

                {/* Select dropdown */}
                <div className="border border-gray-300 px-4 py-1 rounded-lg bg-white">
                  <select className="text-sm text-gray-700 bg-transparent outline-none">
                    <option value="All Transactions">All Transactions</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed" selected>
                      Failed
                    </option>
                  </select>
                </div>

                {/* Download button */}
                <button className="text-sm font-medium text-gray-700  hover:shadow-xl border-gray-300 border-1  px-4 py-1 rounded-lg transition">
                  <span>
                    <i class="fa-solid fa-download text-gray-400"></i>
                  </span>
                  Download
                </button>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-[11px] text-gray-400 uppercase border-b bg-gray-50 border-gray-300 border-t">
                <tr>
                  <th className="px-4 py-3">Customer Details</th>
                  <th className="px-4 py-3">
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
                          fill="#1f1f1f"
                          className="-mt-[4px]"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </div>
                    </div>
                  </th>

                  <th className="px-4 py-3">
                    {" "}
                    <div className="flex items-center space-x-1">
                      <p>Created</p>
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
                  <th className="px-4 py-3">
                    {" "}
                    <div className="flex items-center space-x-1">
                      <p>Validity</p>
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
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <p>#Status</p>
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
                {transactions.map((txn, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <span
                        className={`text-white rounded-[3px] px-[13px] py-[2px] text-center content-center min-w-[80px] h-[5px] w-[80px] font-bold text-[12px] ${
                          txn.status === "Success"
                            ? "bg-green-400"
                            : txn.status === "Pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-5">{txn.date}</td>
                    <td className="px-4 py-5">{txn.utr}</td>
                    <td className="px-4 py-5">{txn.account}</td>
                    <td className="px-4 py-5">
                      ₹{txn.amount.toLocaleString()}
                    </td>
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

export default Virtualaccount;
