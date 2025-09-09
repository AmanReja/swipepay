import React, { useEffect, useState, useRef,useContext } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { useSelector, useDispatch } from "react-redux";
import { getall_ledgerwallet_data } from "../redux/action";
import "../App.css"
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr"
import { ThemeContext } from "../Contexts/ThemeContext";
import Contentloader from "./Contentloader";


const Ledger = () => {

  
  const {theme,setTheme} =useContext(ThemeContext)
  console.log(theme,14);
  const [searchdate, setSearchdate] = useState("");
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  const [load, setLoad] = useState(false);
  const [formdatastr, setFormdatastr] = useState("")
  const [formdataend, setFormdataend] = useState("")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10);


  console.log(20, page);












  const [date, setDate] = useState({ startDate: null, endDate: null })


  const formatDate = (date) => new Intl.DateTimeFormat("en-CA").format(date);


  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);










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
      }
    });
  }, []);

 


  const dispatch = useDispatch();

 


  const trdata = useSelector(
    (state) => state.ledgerwallet.ledgerwallet.transactions
  );

  const total = trdata?.length;

const totalPages = Math.ceil(total / perPage);


const paginatedData = trdata?.slice((page - 1) * perPage, page * perPage);






  useEffect(() => {

    async function fetch() {
      setLoad(true)
      await dispatch(getall_ledgerwallet_data(searchtr, trstatus, formdatastr, formdataend));
      setLoad(false)
    } fetch()


  }, [dispatch, searchtr, trstatus, formdatastr, formdataend]);

  const downloadexcel = () => {
    dispatch(getall_ledgerwallet_data(searchtr, trstatus, formdatastr, formdataend, true ))
  }



  return (
    <div
    className={`w-[100%]  2xl:h-[85%] h-[80%] flex flex-col ${
      theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
    }`}
  >
    <main className="w-full sm:h-[600px] h-full flex flex-col overflow-y-scroll">
      <section className="w-full px-5 mt-5">
        <div
          className={`w-full h-[80px] flex items-center px-5 border-b ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex gap-[5px] h-full items-center w-full">
            <h1
              className={`text-xl content-center font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Wallet Ledger
            </h1>
  
            <div
              className={`flex items-center text-sm space-x-1 mt-1 sm:mt-0 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <a
                href="#"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Home
              </a>
              <span>/</span>
              <a
                href="#"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Report
              </a>
              <span>/</span>
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                My Ledger
              </span>
            </div>
          </div>
        </div>
      </section>
  
      <div className="w-full px-[20px] mt-[20px]">
        <div
          className={`flex w-[100%] h-full flex-col rounded-xl overflow-y-auto border ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700 text-gray-200"
              : "bg-white border-gray-100 text-gray-800"
          }`}
        >
       
          <div
            className={`flex justify-between items-center p-4 py-6 w-full flex-wrap gap-4 shadow-sm border-b ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700 text-gray-100"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Wallet Ledger
            </h2>
  
            <div className="flex gap-3 flex-wrap items-center">
    
              <div
                className={`pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-gray-300"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                <i
                  className={`fa-solid fa-calendar-days ${
                    theme === "dark" ? "text-gray-500" : "text-gray-300"
                  }`}
                ></i>
                <input
                  className={`w-[180px] text-[14px] bg-transparent outline-none rounded ${
                    theme === "dark" ? "text-gray-300" : "text-gray-400"
                  }`}
                  type="text"
                  ref={dateRangeRef}
                />
              </div>
  
              <div
                className={`relative border px-2 py-1 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                <span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  onChange={(e) => setSearchtr(e.target.value)}
                  type="text"
                  placeholder="Search transaction"
                  className={`pl-8 pr-2 outline-none text-sm bg-transparent ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                />
              </div>
  
              <div
                className={`px-4 py-1 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                <select
                  onChange={(e) => setTrstatus(e.target.value)}
                  className={`text-sm bg-transparent outline-none ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <option value="All">All Transactions</option>
                  <option value="SUCCESS">Success</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
  
              <button
                onClick={downloadexcel}
                className={`text-sm font-medium hover:shadow-xl px-4 py-1 rounded-lg transition border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                <i
                  className={`fa-solid fa-download ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                ></i>{" "}
                Download
              </button>
            </div>
          </div>
  
     

            <table
              className={`w-full text-sm text-left border rounded-md overflow-hidden ${
                theme === "dark"
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-600 border-gray-200"
              }`}
            >
              <thead
                className={`text-[11px] uppercase border-b ${
                  theme === "dark"
                    ? "text-gray-400 bg-gray-800 border-gray-600"
                    : "text-gray-500 bg-[#f9f9f9] border-gray-300"
                }`}
              >
                <tr>
                  <th className="px-4 py-3">#Txn Details</th>
                  <th className="px-4 py-3">#Txn Date</th>
                  <th className="px-4 py-3">Txn Charges</th>
                  <th className="px-4 py-3">Closing Balance</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
  
              <tbody className="text-[13px] font-medium">
                {load?Array.from({ length: 6 }).map((_, i) => (
                      <Contentloader key={i} />
                    )): paginatedData?.map((txn, i) => (
                      <tr
                        key={i}
                        className={`border-b hover:transition ${
                          theme === "dark"
                            ? "border-gray-700 hover:bg-gray-800"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-4 align-top">
                          <div className="space-y-2">
                            <p
                              className={`text-sm font-medium ${
                                theme === "dark" ? "text-gray-200" : "text-gray-700"
                              }`}
                            >
                              REQUEST ID:{txn.order_id}{" "}
                              <span
                                className={`font-semibold ${
                                  theme === "dark" ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {txn.utr}
                              </span>
                            </p>
                            <div className="flex items-center space-x-2 text-xs font-semibold">
                              {txn.txn_mode === "DR" ? (
                                <span className="flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
                                  DR
                                </span>
                              ) : (
                                <span className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 rounded">
                                  CR
                                </span>
                              )}
                              <span className="text-gray-400">|</span>
                              <span
                                className={`flex items-center justify-center w-[80px] h-6 rounded border ${
                                  theme === "dark"
                                    ? "bg-gray-800 border-gray-600 text-gray-200"
                                    : "bg-gray-100 border-gray-300 text-gray-700"
                                }`}
                              >
                                {txn.txn_type}
                              </span>
                            </div>
                          </div>
                        </td>
      
                        <td className="px-4 py-4">{txn.date_time}</td>
      
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <p className="font-bold">TXN Amount: {txn.txn_amount}</p>
                            <p className="font-bold">
                              TXN Charges: {txn.commission_amount}
                            </p>
                          </div>
                        </td>
      
                        <td className="px-4 py-4">{txn.post_balance}</td>
                        <td className="px-4 py-4">{txn.remark}</td>
      
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
            </table>
          
  
          {total > 0 ? (
            <div
              className={`flex items-center justify-between px-4 py-3 border-t text-sm ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-300 border-gray-700"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              <div>
                Show{" "}
                <select
                  className={`rounded border outline-none px-[5px] py-[5px] ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-200 border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>{" "}
                per page
              </div>
  
              <div className="flex items-center space-x-2">
                <p>
                  {(page - 1) * perPage + 1}-{Math.min(page * perPage, total)} of{" "}
                  {total}
                </p>
  
             
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`px-3 py-1 border rounded-md ${
                    page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
  
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
                  .map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`px-3 py-1 border rounded-md ${
                        num === page
                          ? theme === "dark"
                            ? "bg-gray-700 font-semibold"
                            : "bg-gray-200 font-semibold"
                          : theme === "dark"
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
  
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={`px-3 py-1 border rounded-md ${
                    page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`flex items-center justify-between px-4 py-3 border-t text-sm ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-300 border-gray-700"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              <h1 className="text-2xl w-full text-center">No data found</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
  
  
  );
};

export default Ledger;
