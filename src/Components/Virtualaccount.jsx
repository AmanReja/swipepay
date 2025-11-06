import React, { useEffect, useState, useRef, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getall_ledgerwallet_data } from "../redux/action";
import { getall_virtual_account_txn } from "../redux/action";
import "../App.css";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import { Theme } from "../Contexts/Theme";
import Contentloader from "./Contentloader";
import { Check, ChevronDown } from "lucide-react";

const Virtualaccount = () => {
  const { theme, setTheme } = useContext(Theme);

  const [searchdate, setSearchdate] = useState("");
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  const [load, setLoad] = useState(false);
  const [formdatastr, setFormdatastr] = useState("");
  const [formdataend, setFormdataend] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);

  const options = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

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

  const dateRangeRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "d-m-y",
      defaultDate: [today, today],
      value: date,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          setDate({ startDate: start, endDate: end });
        }
      },
    });
  }, []);

  const dispatch = useDispatch();

  const trdata = useSelector(
    (state) => state.ledgerwallet.ledgerwallet.transactions
  );
  const virtualdata = useSelector(
    (state) => state.virtualaccount.virtualaccount?.data
  );


  

  const totalvirdatarecord = useSelector(
    (state) => state.virtualaccount.virtualaccount.pagination?.totalRecords
  );
  const virtotalpages = useSelector(
    (state) => state.virtualaccount.virtualaccount.pagination?.totalPages
  );

  const totaldata = useSelector(
    (state) => state.ledgerwallet.ledgerwallet.total
  );

  const currentpage = useSelector(
    (state) => state.ledgerwallet.ledgerwallet.page
  );

  const totalpage = useSelector(
    (state) => state.ledgerwallet.ledgerwallet.totalPages
  );

  const limit = useSelector((state) => state.ledgerwallet.ledgerwallet.limit);

  useEffect(() => {
    if (!formdatastr || !formdataend) return;
    async function fetch() {
      setLoad(true);

      await dispatch(
        getall_virtual_account_txn(
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
    fetch();
  }, [dispatch, searchtr, trstatus, formdatastr, formdataend, page, perPage]);

  const downloadexcel = () => {
    dispatch(
      getall_virtual_account_txn(
        searchtr,
        trstatus,
        formdatastr,
        formdataend,
        true
      )
    );
  };


  useEffect(()=>{

    const handleClickOutside =(event)=>{
      if (!event.target.closest(".dropdown-wraper")) {
        setOpen(false)
      }
     

    }
    document.addEventListener("click", handleClickOutside)
    return () =>document.removeEventListener("click",handleClickOutside)
  },[])

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
                Virtual Account Report
              </h1>

              {/* Subtitle */}
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Overview of all Virtual transactions including transaction ID,
                amount, status, and date.
              </p>

              {/* Decorative Divider */}
              <div
                className={`mt-3 h-[1px] w-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
            </div>
          </div>

          <div className="w-full px-[20px] mt-[20px]">
            <div
              className={`flex w-full h-full flex-col rounded-xl overflow-y-auto border-[1px] ${
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
                  Virtual Account
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
                      className={`dropdown-wraper flex justify-between w-full items-center px-4 py-2 rounded-lg border text-sm transition-all ${
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
                        className={`fixed open top-[48%] w-[200px] left-[400px]  right-0 mt-2 rounded-lg shadow-lg border z-20 max-h-60 overflow-y-auto ${
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
                        selected
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="All"
                      >
                        All
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="active"
                      >
                        ACTIVE
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="inactive"
                      >
                        INACTIVE
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
                    <th className="px-4 py-3">Customer Details</th>
                    <th className="px-4 py-3">Account Details</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3">Validity</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="text-[13px] font-medium">
                  {load ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <Contentloader key={i} />
                    ))
                  ) : Array.isArray(virtualdata) && virtualdata.length > 0 ? (
                    virtualdata.map((txn, i) => (
                      <tr
                        key={i}
                        className={`border-b hover:transition ${
                          theme === "dark"
                            ? "border-gray-700 hover:bg-gray-800"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-4 align-top ">
                          <div className="space-y-2">
                            <p
                              className={`text-sm font-medium flex flex-col ${
                                theme === "dark"
                                  ? "text-gray-200"
                                  : "text-gray-700"
                              }`}
                            >
                              Name : {txn.name}{" "}
                            </p>
                            <p
                              className={`text-sm font-medium flex flex-col ${
                                theme === "dark"
                                  ? "text-gray-200"
                                  : "text-gray-700"
                              }`}
                            >
                              AccId : {txn.account_id}{" "}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-2">
                            <p
                              className={`text-sm font-medium flex flex-col ${
                                theme === "dark"
                                  ? "text-gray-200"
                                  : "text-gray-700"
                              }`}
                            >
                              A/C : {txn.account_number}{" "}
                            </p>
                            <p
                              className={`text-sm font-medium flex flex-col ${
                                theme === "dark"
                                  ? "text-gray-200"
                                  : "text-gray-700"
                              }`}
                            >
                              IFSC code : {txn.ifsc_code}{" "}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">{txn.create_on}</td>
                        <td className="px-4 py-4">{txn.validity}</td>

                        <td className="px-4 py-4">
                          <span
                            className={`text-white uppercase rounded-[4px]   min-w-[80px] text-center px-[5px] py-[2px] font-bold text-[12px] ${
                              txn.status?.toLowerCase() === "active"
                                ? "bg-green-500"
                                : txn.status?.toLowerCase() === "inactive"
                                ? "bg-yellow-500 text-black"
                                : "bg-red-400"
                            }`}
                          >
                            {txn.status}
                          </span>
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

              {virtotalpages > 0 ? (
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
                    {/* Showing range */}
                    <p>
                      {(page - 1) * perPage + 1}-
                      {Math.min(page * perPage, totalvirdatarecord)} of{" "}
                      {totalvirdatarecord}
                    </p>

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

                    {Array.from({ length: 3 }, (_, i) => page + i).map(
                      (num) =>
                        num <= virtotalpages && (
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

                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === virtotalpages}
                      className={`px-3 py-1  rounded-md ${
                        page === virtotalpages
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

export default Virtualaccount;
