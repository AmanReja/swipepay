import React, { useEffect, useState, useRef, useContext } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data, Payout_report } from "../redux/action";
import "../App.css"
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import Contentloader from "../Components/Contentloader";

import { ThemeContext } from "../Contexts/ThemeContext";



const Report = () => {
  const {theme,setTheme} =useContext(ThemeContext);
  const [load, setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  const [formdatastr, setFormdatastr] = useState("")
  const [formdataend, setFormdataend] = useState("")



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
      dateFormat: "y-m-d",
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
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  const payoutreportdata = useSelector((state) => state.payoutreport.payoutreport);

  console.log(22, payoutreportdata);



  const handeldownload = () => {
    dispatch(getall_payoutlog_data(searchtr, trstatus, formdatastr, formdataend, true));
  };





  useEffect(() => {

    async function fetchdata() {
      setLoad(true)

      await dispatch(getall_payoutlog_data(searchtr, trstatus, formdatastr, formdataend));
      await dispatch(Payout_report())
      setLoad(false)
    } fetchdata()

  }, [dispatch, searchtr, trstatus, formdatastr, formdataend]);




  return (
    <div
    className={`w-full rounded-2xl 2xl:h-[85%] h-[80%] flex flex-col ${
      theme === "dark"
        ? "bg-black text-white"
        : "bg-gray-100 text-gray-900"
    }`}
  >
    <main className="w-full h-full flex flex-col overflow-y-scroll">
   
      <section className="w-full px-5 mt-5">
        <div
          className={`w-full h-[80px] flex items-center px-5 rounded-xl ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="flex gap-[5px] h-full items-center w-full">
            <h1
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Payout Report
            </h1>

            <div
              className={`flex items-center text-sm space-x-1 mt-1 sm:mt-0 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <a
                href="#"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-400" : "text-gray-400"
                }`}
              >
                Home
              </a>
              <span>/</span>
              <a
                href="#"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-400" : "text-gray-400"
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
                Payout Transaction Report
              </span>
            </div>
          </div>
        </div>

       
        <div
          className={`flex flex-col sm:flex-row gap-5 rounded-xl p-5 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          {[
            {
              label: "Payout Value",
              value: payoutreportdata.total_payout_value || "00",
            },
            {
              label: "Success Rate",
              value: `${
                payoutreportdata.success_rate === undefined
                  ? "00"
                  : payoutreportdata.success_rate + "%"
              }`,
            },
            {
              label: "Pending Payouts",
              value: payoutreportdata.pending_value || "00",
            },
            {
              label: "Failure",
              value: payoutreportdata.failed_value || "00",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <h1 className="text-2xl font-semibold">{item.value}</h1>
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

  
      <div className="w-full px-[20px] mt-[20px]">
        <div
          className={`flex w-full h-full flex-col rounded-xl overflow-y-auto border ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >

          <div
            className={`flex justify-between items-center p-4 w-full flex-wrap gap-4 rounded-md shadow-sm ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Payout Transaction Report
            </h2>

            <div className="flex gap-3 flex-wrap items-center">
           
              <div
                className={`pl-[5px] border p-1 rounded flex items-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-300"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                <i className="fa-solid fa-calendar-days"></i>
                <input
                  className={`w-[180px] text-[14px] outline-none rounded bg-transparent ${
                    theme === "dark" ? "text-gray-300" : "text-gray-400"
                  }`}
                  type="text"
                  ref={dateRangeRef}
                />
              </div>

             
              <div
                className={`relative border px-2 py-1 rounded-lg ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-300 bg-white"
                }`}
              >
                <span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  onChange={(e) => {
                    setSearchtr(e.target.value);
                  }}
                  type="text"
                  placeholder="Search transaction"
                  className={`pl-8 pr-2 outline-none text-sm bg-transparent ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                />
              </div>

              
              <div
                className={`border px-4 py-1 rounded-lg ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-300 bg-white"
                }`}
              >
                <select
                  onChange={(e) => {
                    setTrstatus(e.target.value);
                  }}
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
                onClick={handeldownload}
                className={`text-sm font-medium hover:shadow-xl border px-4 py-1 rounded-lg transition ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-200"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                <i className="fa-solid fa-download mr-1"></i>
                Download
              </button>
            </div>
          </div>

      
          <table
            className={`w-full text-sm text-left ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <thead
              className={`text-[11px] uppercase border-b border-t ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-400 border-gray-700"
                  : "bg-gray-50 text-gray-400 border-gray-300"
              }`}
            >
              <tr>
                <th className="px-4 py-3">#Status</th>
                <th className="px-4 py-3">Txn Date</th>
                <th className="px-4 py-3">UTR</th>
                <th className="px-4 py-3">Account Details</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Txn Charges</th>
              </tr>
            </thead>
            <tbody className="text-[12px] font-semibold">
              {load
                ? Array.from({ length: 3 }).map((_, i) => <Contentloader />)
                : payoutdata?.map((txn, i) => (
                    <tr
                      key={i}
                      className={`border-b ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-800"
                          : "border-gray-100 hover:bg-gray-50"
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
                      <td className="px-4 py-5">
                        <div className="flex flex-col">
                          <p>UTR: {txn.rrn}</p>
                          <p>[request ID: #{txn.paytmOrderId}]</p>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-col">
                          <p>A/C: {txn.account_no}</p>
                          <p>[IFSC Code: {txn.ifsc_code}]</p>
                        </div>
                      </td>
                      <td className="px-4 py-5">{txn.settlement_amount}</td>
                      <td className="px-4 py-5">{txn.settlement_charge}</td>
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

export default Report;
