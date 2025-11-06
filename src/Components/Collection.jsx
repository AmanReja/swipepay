import React, { useEffect, useState, useRef, useContext } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getall_payoutlog_data,
  get_collections,
  collection_report,
} from "../redux/action";
import "../App.css";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import Contentloader from "../Components/Contentloader";

import { Theme } from "../Contexts/Theme";
import { ChevronDown, Check } from "lucide-react";

const Collection = () => {
  const { theme, setTheme } = useContext(Theme);
  const [load, setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  const [formdatastr, setFormdatastr] = useState("");
  const [formdataend, setFormdataend] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);






  const [date, setDate] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    const today = new Date();
    setSelected("Today");
    setDate({ startDate: today, endDate: today });
    setFormdatastr(formatDate(today));
    setFormdataend(formatDate(today));
  }, []);

  const formatDate = (date) => new Intl.DateTimeFormat("en-CA").format(date);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);

  const options = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

  const dateRangeRef = useRef(null);

  useEffect(() => {
    const toady = new Date();
    flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "d-m-y",
      defaultDate: [toady, toady],
      value: date,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          setDate({ startDate: start, endDate: end });
        }
      },
    });
  }, []);

  // const totaldata = useSelector(
  //   (state) => state.ledgerwallet.ledgerwallet.totalpagerecords
  // );

  const dispatch = useDispatch();
  const collectiondata = useSelector(
    (state) => state.collections.collections.data
  );
  console.log(90,collectiondata);
  const collectiondatareport = useSelector(
    (state) => state.collections.collections.summary
  );

  const totalpage = useSelector(
    (state) => state.collections.collections.pagination?.totalPages
  );

 
  

  const totaldata = useSelector(
    (state) => state.collections.collections.pagination?.totalRecords
  );

  useEffect(() => {
    if (!formdatastr || !formdataend) return;
    async function fetchdata() {
      setLoad(true);

      await dispatch(
        get_collections(
          searchtr,
          trstatus,
          formdatastr,
          formdataend,
          false,
          page,
          perPage
        )
      );

      setLoad(false);
    }
    fetchdata();
  }, [dispatch, searchtr, trstatus, formdatastr, formdataend, page, perPage]);

  const downloadexcel = () => {
    dispatch(
      get_collections(searchtr, trstatus, formdatastr, formdataend, true)
    );
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-wrapper")) {
        setOpen(false);
        
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={`w-[100%]  2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
          <div
            className={`w-full h-[80px] flex items-center px-5 rounded-xl ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex flex-col w-full mb-4">
              {/* Title */}
              <h1
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Collection Report
              </h1>

              {/* Subtitle */}
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Overview of all collection transactions including transaction
                ID, amount, status, and date.
              </p>

              {/* Decorative Divider */}
              <div
                className={`mt-3 h-[1px] w-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-5 rounded-xl p-5 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {" "}
            {load
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    className={`flex-1 min-h-[80px] animate-pulse flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ))
              : [
                  {
                    label: "Collection Value",

                    value:
                      collectiondatareport?.total_value != null
                        ? Number(
                            collectiondatareport.total_value
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00",
                  },
                  {
                    label: "Success Rate",
                    value: `${
                      collectiondatareport?.success_rate === undefined
                        ? "00"
                        : collectiondatareport?.success_rate + "%"
                    }`,
                  },
                  {
                    label: "Pending Collections",

                    value:
                      collectiondatareport?.pending_value != null
                        ? Number(
                            collectiondatareport.pending_value
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00",
                  },
                  {
                    label: "Failure",

                    value:
                      collectiondatareport?.failed_value != null
                        ? Number(
                            collectiondatareport.failed_value
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00",
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
          <div className="w-full px-[20px] mt-[20px]">
            <div
              className={`flex w-full h-full flex-col rounded-xl overflow-y-auto border ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-300"
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
                  Collections
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

                  {/* 🔽 Dropdown for Quick Ranges */}
                  <div className="relative w-[180px]">
                    <button
                      onClick={() => setOpen(!open)}
                      className={`dropdown-wrapper flex justify-between w-full items-center px-4 py-2 rounded-lg border text-sm transition-all ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-700"
                      }`}
                    >
                      <span>{selected}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {open && (
                      <ul
                        className={`fixed open top-[48%] w-[200px] left-[400px] right-0 mt-2 rounded-lg shadow-lg border z-20 max-h-60 overflow-y-auto ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-600 text-gray-100"
                            : "bg-white border-gray-200 text-gray-800"
                        }`}
                      >
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => {
                              setSelected(option);
                              setOpen(false);

                              const today = new Date();
                              let start, end;

                              if (option === "Custom Range") {
                                setDate({ startDate: null, endDate: null });
                                setFormdatastr("");
                                setFormdataend("");
                                if (dateRangeRef.current?._flatpickr)
                                  dateRangeRef.current._flatpickr.clear();
                                return;
                              }

                              switch (option) {
                                case "Today":
                                  start = end = today;
                                  break;
                                case "Yesterday":
                                  start = end = new Date(today);
                                  start.setDate(today.getDate() - 1);
                                  break;
                                case "Last 7 Days":
                                  start = new Date(today);
                                  start.setDate(today.getDate() - 6);
                                  end = today;
                                  break;
                                case "Last 30 Days":
                                  start = new Date(today);
                                  start.setDate(today.getDate() - 29);
                                  end = today;
                                  break;
                                case "This Month":
                                  start = new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    1
                                  );
                                  end = new Date(
                                    today.getFullYear(),
                                    today.getMonth() + 1,
                                    0
                                  );
                                  break;
                                case "Last Month":
                                  start = new Date(
                                    today.getFullYear(),
                                    today.getMonth() - 1,
                                    1
                                  );
                                  end = new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    0
                                  );
                                  break;
                                default:
                                  start = end = null;
                              }

                              if (start && end) {
                                setDate({ startDate: start, endDate: end });
                                setFormdatastr(formatDate(start));
                                setFormdataend(formatDate(end));
                                if (dateRangeRef.current?._flatpickr)
                                  dateRangeRef.current._flatpickr.setDate(
                                    [start, end],
                                    true
                                  );
                              }
                            }}
                            className={`px-4 py-2 flex justify-between items-center cursor-pointer text-sm transition-colors ${
                              theme === "dark"
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-100"
                            } ${selected === option ? "font-semibold" : ""}`}
                          >
                            <span>{option}</span>
                            {selected === option && (
                              <Check
                                className={`w-4 h-4 ${
                                  theme === "dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                }`}
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* 🔍 Search Transaction */}
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

                  {/* 🔽 Status Filter */}
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
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="All"
                      >
                        All Transactions
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="SUCCESS"
                      >
                        Success
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="PENDING"
                      >
                        Pending
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="FAILED"
                      >
                        Failed
                      </option>
                    </select>
                  </div>

                  {/* ⬇️ Download Button */}
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
                    <th className="px-4 py-3">payment_mode</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] font-semibold">
                  {load ? (
                    Array.from({ length: 3 }).map((_, i) => <Contentloader />)
                  ) : Array.isArray(collectiondata) &&
                    collectiondata.length > 0 ? (
                    collectiondata.map((txn, i) => (
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
                            className={`text-white rounded-[4px] uppercase min-w-[80px] text-center px-[5px] py-[2px] font-semibold text-[11px] ${
                              txn.status?.toLowerCase() === "success"
                                ? "bg-green-400"
                                : txn.status?.toLowerCase() === "pending"
                                ? "bg-yellow-400 text-black"
                                : "bg-red-400"
                            }`}
                          >
                            {txn.status}
                          </span>
                        </td>

                        <td className="px-4 py-5">
  {txn.date
    ? (() => {
        const d = new Date(txn.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      })()
    : "-"}
</td>

                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <p>UTR: {txn.utr}</p>
                            <p>[request ID: #{txn.transaction_id}]</p>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <p>SENDER: {txn.escrow_id
}</p>
                            <p>A/C: {txn.remitter_acc_number}</p>
                            <p>[IFSC Code: {txn.remitter_ifsc_code}]</p>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          {txn.amount != null
                            ? Number(txn.amount).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : "0.00"}
                        </td>

                        <td className="px-4 py-5 text-center">
                          {txn.payment_mode}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-4 text-gray-600"
                      >
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {totalpage > 0 ? (
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
                      {(page - 1) * perPage + 1}-
                      {Math.min(page * perPage, totaldata)} of {totaldata}
                    </p>

                    {/* Prev button */}
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className={`px-3 py-1  rounded-md ${
                        page === 1
                          ? "opacity-50 cursor-not-allowed"
                          : theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: 3 }, (_, i) => page + i).map(
                      (num) =>
                        num <= totalpage && (
                          <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`px-3 py-1  rounded-md ${
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
                        )
                    )}

                    {/* Next button */}
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalpage}
                      className={`px-3 py-1  rounded-md ${
                        page === totalpage
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
                ""
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Collection;
