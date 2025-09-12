import React, { useEffect, useState, useRef, useContext } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data, Payout_report, get_collections } from "../redux/action";
import "../App.css";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import { Theme } from "../Contexts/Theme";




const collection = () => {

  const { theme, setTheme } = useContext(Theme)
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
  const collectionsdata = useSelector((state) => state.collections.collections.transactions
  );

  console.log(22, collectionsdata);



  const handeldownload = () => {
    dispatch(getall_payoutlog_data(searchtr, trstatus, formdatastr, formdataend, true));
  };





  useEffect(() => {

    async function fetchdata() {
      setLoad(true)

      await dispatch(getall_payoutlog_data(searchtr, trstatus, formdatastr, formdataend));
      await dispatch(Payout_report())
      await dispatch(get_collections())
      setLoad(false)
    } fetchdata()

  }, [dispatch, searchtr, trstatus, formdatastr, formdataend]);




  return (
    <div
    className={`w-[100%] 2xl:h-[85%] h-[80%] flex flex-col ${
      theme === "dark"
        ? "bg-gray-900 text-gray-300"
        : "bg-white text-gray-800"
    }`}
  >
    <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="w-full px-5 mt-5 flex flex-col gap-[10px]">
        {/* Header */}
        <div
          className={`w-full h-[80px] flex items-center px-5 ${
            theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <div className="flex gap-[5px] h-full items-center w-full">
            <h1
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Collection Report
            </h1>
  
            <div
              className={`flex items-center text-sm space-x-1 mt-1 sm:mt-0 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <a
                href="#"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Home
              </a>
              <span>/</span>
              <a
                href="#"
                className={`hover:underline ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Report
              </a>
              <span>/</span>
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Collection Report
              </span>
            </div>
          </div>
        </div>
  
        {/* Stats Cards */}
        <div
          className={`flex flex-col sm:flex-row gap-5 rounded-xl p-5 ${
            theme === "dark"
              ? "text-gray-100 bg-gray-900"
              : "text-gray-800 bg-white"
          }`}
        >
          {[
            { label: "Payout Value", value: payoutreportdata?.total_payout_value || "00" },
            {
              label: "Success Rate",
              value: `${
                payoutreportdata.success_rate === undefined
                  ? "00"
                  : payoutreportdata.success_rate + "%"
              }`,
            },
            { label: "Pending Payouts", value: payoutreportdata.pending_value || "00" },
            { label: "Failure", value: payoutreportdata.failed_value || "00" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-800"
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
  
      {/* Table Section */}
      <div className="w-full px-[20px] mt-[20px]">
        <div
          className={`flex w-[100%] h-full flex-col border-[1px] rounded-xl overflow-y-auto ${
            theme === "dark"
              ? "border-gray-700 bg-gray-900 text-gray-200"
              : "border-gray-100 bg-white text-gray-800"
          }`}
        >
          {/* Toolbar */}
          <div
            className={`flex justify-between items-center p-4 w-full flex-wrap gap-4 shadow-sm rounded-md ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Collection Report
            </h2>
  
            <div className="flex gap-3 flex-wrap items-center">
              {/* Date Picker */}
              <div
                className={`pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-800 text-gray-300"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                <i className="fa-solid fa-calendar-days text-gray-400"></i>
                <input
                  className={`w-[180px] text-[14px] outline-none rounded ${
                    theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white text-gray-400"
                  }`}
                  type="text"
                  ref={dateRangeRef}
                />
              </div>
  
              {/* Search */}
              <div
                className={`relative border px-2 py-1 rounded-lg ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-800 text-gray-300"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  onChange={(e) => setSearchtr(e.target.value)}
                  type="text"
                  placeholder="Search transaction"
                  className={`pl-8 pr-2 outline-none text-sm bg-transparent ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                />
              </div>
  
              {/* Select */}
              <div
                className={`px-4 py-1 rounded-lg ${
                  theme === "dark"
                    ? "border border-gray-600 bg-gray-800 text-gray-300"
                    : "border border-gray-300 bg-white text-gray-700"
                }`}
              >
                <select
                  onChange={(e) => setTrstatus(e.target.value)}
                  className={`text-sm outline-none bg-transparent ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <option value="All">All Transactions</option>
                  <option value="SUCCESS">Success</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
  
              {/* Download */}
              <button
                onClick={handeldownload}
                className={`text-sm font-medium px-4 py-1 rounded-lg transition flex items-center gap-2 ${
                  theme === "dark"
                    ? "border border-gray-600 text-gray-300 hover:shadow-lg bg-gray-800"
                    : "border border-gray-300 text-gray-700 hover:shadow-xl bg-white"
                }`}
              >
                <i className="fa-solid fa-download text-gray-400"></i> Download
              </button>
            </div>
          </div>
  
          {/* Table */}
          {!load ? (
            <table
              className={`w-full text-sm text-left ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <thead
                className={`text-[11px] uppercase border-t border-b ${
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
                </tr>
              </thead>
              <tbody className="text-[12px] font-semibold">
                {collectionsdata?.map((txn, i) => (
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
                        className={`text-white rounded-[3px] px-[13px] py-[2px] font-bold text-[12px] ${
                          txn.status === "success"
                            ? "bg-green-400"
                            : txn.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-5">{txn.date}</td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <p>UTR: {txn.utr}</p>
                        <p>[request ID: #{txn.transaction_id}]</p>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <p>A/C: {txn.remitter_acc_number}</p>
                        <p>[IFSC Code: {txn.remitter_ifsc_code}]</p>
                      </div>
                    </td>
                    <td className="px-4 py-5">{txn.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex w-full h-[200px] justify-center items-center">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
  
  );
};

export default collection;
