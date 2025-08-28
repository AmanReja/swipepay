import React, { useEffect, useState,useRef } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { useSelector, useDispatch } from "react-redux";
import { getall_ledgerwallet_data } from "../redux/action";
import "../App.css"
import "flatpickr/dist/themes/airbnb.css"; 
import flatpickr from "flatpickr"

const Ledger = () => {
  const [searchdate, setSearchdate] = useState("");
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  const [load, setLoad] = useState(false);
  const [formdatastr,setFormdatastr]=useState("")
  const [formdataend,setFormdataend]=useState("")







  const[date,setDate] =useState({startDate:null,endDate:null})


  const formatDate = (date) => new Intl.DateTimeFormat("en-CA").format(date);


  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);

  console.log(formdatastr,formdataend);







  
  const dateRangeRef = useRef(null);

  useEffect(() => {
    flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "d-m-y", 
      defaultDate: ["15-07-2025", "16-07-2025"],
      value:date,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          setDate({ startDate: start, endDate: end });
        }
      }
    });
  }, []);



  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  console.log(token);

  const trdata = useSelector(
    (state) => state.ledgerwallet.ledgerwallet.transactions
  );

  console.log(55, trdata);

  useEffect(() => {

    setLoad(true)
    dispatch(getall_ledgerwallet_data(searchtr, trstatus,formdatastr,formdataend));
    setLoad(false)
  }, [dispatch, searchtr, trstatus,formdatastr,formdataend]);

  const downloadexcel = ()=>{
    dispatch(getall_ledgerwallet_data(searchtr, trstatus,formdatastr,formdataend,true))
  }

 

  return (
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] h-[80%] flex flex-col">
      <main className="w-fullh-[600px] h-full flex flex-col overflow-y-scroll">
        <section className="w-full px-5 mt-5">
          <div className="w-full h-[80px]  bg-white flex items-center px-5 ">
            <div className="flex gap-[5px] h-full items-center w-full">
              <h1 className="text-xl content-center font-semibold text-gray-800">
                Wallet Ledger
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

        <div className="w-full  px-[20px] mt-[20px]">
          <div className="flex w-[100%] h-full flex-col border-gray-100 border-[1px] bg-white rounded-xl   overflow-y-auto">
            <div className="flex justify-between items-center p-4 py-6  w-full flex-wrap gap-4 bg-white shadow-sm ">
              <h2 className="text-lg font-semibold text-gray-800">
                Wallet Ledger
              </h2>

              <div className="flex gap-3 flex-wrap items-center">
              <div className="border-gray-300 pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2" >
    <i class="fa-solid fa-calendar-days text-gray-300"></i>
    <input className="w-[180px] text-[14px]  content-center justify-center text-gray-400 outline-none  rounded" type="text" ref={dateRangeRef} />
    </div>

                <div className="relative border border-gray-300 px-2 py-1 rounded-lg bg-white">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    onChange={(e) => {
                      setSearchtr(e.target.value);
                    }}
                    type="text"
                    placeholder="Search transaction"
                    className="pl-8 pr-2 outline-none text-sm text-gray-700 bg-transparent"
                  />
                </div>

                <div className="border border-gray-300 px-4 py-1 rounded-lg bg-white">
                  <select
                    onChange={(e) => {
                      setTrstatus(e.target.value);
                    }}
                    className="text-sm text-gray-700 bg-transparent outline-none"
                  >
                    <option selected value="All">
                      All Transactions
                    </option>
                    <option value="SUCCESS">Success</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>

                <button onClick={downloadexcel} className="text-sm font-medium text-gray-700  hover:shadow-xl border-gray-300 border-1  px-4 py-1 rounded-lg transition">
                  <span>
                    <i class="fa-solid fa-download text-gray-400"></i>
                  </span>
                  Download
                </button>
              </div>
            </div>
               

{!load?    <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-md overflow-hidden">
              <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3">#Txn Details</th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <p>#Txn Date</p>
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
                      <p>Txn Charges</p>
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
                  <th className="px-4 py-3">Closing Balance</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>

              

              <tbody className="text-[13px] font-medium">
                {trdata?.map((txn, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 font-medium">
                          REQUEST ID:{txn.order_id}
                          <span className="font-semibold text-gray-900">
                            {txn.utr}
                          </span>
                        </p>
                        <div className="flex items-center space-x-2 text-xs font-semibold">{
                          txn.txn_mode =="DR"?<span className="flex items-center justify-center w-6 h-6 bg-red-100 border border-red-300 text-red-700 rounded">
                          DR
                        </span>:<span className="flex items-center justify-center w-6 h-6 bg-green-100 border border-green-300 text-green-700 rounded">
                            CR
                          </span>
                        }
                          
                          <span className="text-gray-400">|</span>
                          <span className="flex items-center justify-center w-[80px] h-6 bg-gray-100 border border-gray-300 text-gray-700 rounded">
                            {txn.txn_type}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">{txn.date_time}</td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <p className="font-bold">TXN Amount:{txn.txn_amount}</p>
                        <p className="font-bold">
                          TXN Charges:{txn.commission_amount}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">{txn.post_balance}</td>

                    <td className="px-4 py-4">
                      {txn.remark}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`text-white rounded-[4px] px-3 py-1 min-w-[80px] text-center inline-block font-bold text-[12px] ${
                          txn.txn_status === "SUCCESS"
                            ? "bg-green-500"
                            : txn.txn_status === "PENDING"
                            ? "bg-yellow-400 text-black"
                            : "bg-red-400"
                        }`}
                      >
                        {txn.txn_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>:<div className="w-full justify-center flex items-center">
              
            <div className="loader"></div>
              </div>}

        {trdata?.length!==0?<div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white text-sm text-gray-600">
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
            </div>:<div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white text-sm text-gray-600">
                <h1 className="text-2xl w-full text-center">
                  No data found
                </h1>

             
            </div>


        }

            
          </div>
        </div>

        {/* <footer className="w-full min-h-[60px] flex px-[20px] justify-between items-center">
          <h1 className="text-gray-500 text-[14px]">2024© Busybox.</h1>
          <div
            style={{ fontFamily: "montserrat" }}
            className="flex min-w-[235px] text-[14px] w-[235px] h-full items-center gap-[10px] text-gray-500 justify-between"
          >
            <a href="">Docs</a>
            <a href="">FAQ</a>
            <a href="">Support</a>
            <a href="">License</a>
          </div>
        </footer> */}
      </main>
    </div>
  );
};

export default Ledger;
