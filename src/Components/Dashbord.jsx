import { React, useState } from "react";
import Navbar from "./Navbar";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import Arrow from "../assets/icons/arrow.svg";
import { ToastContainer } from "react-toastify";
import Subfooter from "./Subfooter";

const Dashbord = () => {
  const [shows, setShows] = useState(false);
  const [showp, setShowp] = useState(false);
  const [showc, setShowc] = useState(false);
  const [showv, setShowv] = useState(false);
  const [showca, setShowca] = useState(false);
  const [showk, setShowk] = useState(false);
  const [showd, setShowd] = useState(false);
  const [showset, setShowset] = useState(false);
  const [showPayoutimg, setShowPayoutimg] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const items = [
    {
      to: "/dashboard/summery",
      icon: "fa-chart-simple",
      label: "Summary",
      show: shows,
      setShow: setShows,
    },
    {
      to: "/dashboard/payout",
      icon: "fa-arrow-right -rotate-[50deg]",
      label: "Payout",
      show: showp,
      setShow: setShowp,
    },
    {
      to: "/dashboard/collection",
      icon: "fa-arrow-right rotate-[130deg]",
      label: "Collection",
      show: showc,
      setShow: setShowc,
    },
    {
      to: "/dashboard/verification",
      icon: "fa-circle-check",
      label: "Verification",
      show: showv,
      setShow: setShowv,
    },
    {
      to: "/dashboard/card",
      icon: "fa-credit-card",
      label: "Card",
      show: showca,
      setShow: setShowca,
    },
    {
      to: "/dashboard/keys",
      icon: "fa-code",
      label: "Keys",
      show: showk,
      setShow: setShowk,
    },
    {
      to: "https://documenter.getpostman.com/view/2871565/2s93sZ7u6G",
      icon: "fa-file-import",
      label: "Document",
      show: showd,
      setShow: setShowd,
    },
    {
      to: "/dashboard/settings/accounts",
      icon: "fa-solid fa-gear",
      label: "Settings",
      show: showset,
      setShow: setShowset,
    },
  ];
  return (
    <>
      <div className="w-full h-screen  bg-gray-100 flex flex-col gap-[20px] items-center sm:overflow-y-hidden overflow-y-auto overflow-x-hidden ">
        <Navbar></Navbar>
        <div className="w-full flex-col  h-screen pb-0 sm:pb-[100px] sm:flex-row flex">
          <div className="flex flex-row h-full  sm:w-[4%] sm:px-0 px-[30px] sm:flex-col sm:justify-normal justify-center items-center gap-[5px]  mb-2 sm:gap-[20px] w-full">
            {items.map(({ to, icon, label, show, setShow }) => (
              <NavLink
                key={to}
                to={to}
                end
                onMouseOver={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className={({ isActive }) =>
                  `group relative p-3 transition duration-200 rounded-full ${
                    isActive ? "bg-white" : "hover:bg-white"
                  }`
                }
              >
                <i
                  className={`fa-solid ${icon} sm:text-[18px] text-[12px] text-gray-500`}
                ></i>
                <div
                  className={`absolute sm:block hidden left-[120%] top-1/2 -translate-y-1/2 bg-black text-white text-xs z-40 px-2 py-1 rounded shadow-md transition duration-200 whitespace-nowrap ${
                    show ? "visible" : "invisible"
                  }`}
                >
                  {label}
                </div>
              </NavLink>
            ))}
          </div>

          <div className="ml-0 sm:ml-1 w-full sm:w-[94%] h-full rounded-2xl border-gray-300 border-[1px] bg-white">
            <header className="w-full sm:h-[54px] h-[90px] border-b-[1px] border-gray-300">
              <div
                style={{ fontFamily: "Montserrat" }}
                className="w-full h-full flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 px-4 py-2 text-sm whitespace-nowrap"
              >
                <div className="relative group">
                  <a href="#" className="flex items-center cursor-pointer">
                    Payoutimg
                    <img
                      className="rotate-90 ml-2 w-3 h-3"
                      src={Arrow}
                      alt=""
                    />
                  </a>
                  <div className="absolute top-[30px] left-0 w-[200px] bg-white shadow-lg rounded-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="flex flex-col gap-2 text-gray-700 text-sm">
                      <NavLink
                        to={"/dashboard/payout"}
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Single payout
                      </NavLink>
                      <NavLink
                        to={"/dashboard/bulkpayout"}
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Bulk payout
                      </NavLink>
                      <NavLink
                        to={"/dashboard/report"}
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Report
                      </NavLink>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Invoices
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <a href="#" className="flex items-center cursor-pointer">
                    Collection
                    <img
                      className="rotate-90 ml-2 w-3 h-3"
                      src={Arrow}
                      alt=""
                    />
                  </a>
                  <div className="absolute top-[30px] left-0 w-[200px] bg-white shadow-lg rounded-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="flex flex-col gap-2 text-gray-700 text-sm">
                      <NavLink
                        to="/dashboard/virtualaccount"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Virtual Account
                      </NavLink>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        UPI-Static QR
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        UPI-Dynamic QR
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Report
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Invoices
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <a href="#" className="flex items-center cursor-pointer">
                    Subscription
                    <img
                      className="rotate-90 ml-2 w-3 h-3"
                      src={Arrow}
                      alt=""
                    />
                  </a>
                  <div className="absolute top-[30px] left-0 w-[200px] bg-white shadow-lg rounded-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="flex flex-col gap-2 text-gray-700 text-sm">
                      <NavLink
                        to={"/dashboard/singleenath"}
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Single eNach
                      </NavLink>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Bulk eNach
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Cancel eNach
                      </a>
                      <NavLink
                        to={"/dashboard/transactionreport"}
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Transaction Report
                      </NavLink>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Invoices
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <a href="#" className="flex items-center cursor-pointer">
                    Verification
                    <img
                      className="rotate-90 ml-2 w-3 h-3"
                      src={Arrow}
                      alt=""
                    />
                  </a>
                  <div className="absolute top-[30px] left-0 w-[230px] bg-white shadow-lg rounded-lg p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="flex flex-col gap-2 text-gray-700 text-sm">
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Aadhaar eKYC
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        PAN Verification
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Bank Account - Penny Drop
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Report
                      </a>
                      <a
                        href="#"
                        className="hover:bg-gray-100 px-3 py-2 rounded-md transition"
                      >
                        Invoices
                      </a>
                    </div>
                  </div>
                </div>

                <NavLink
                  className="flex justify-center items-center cursor-pointer"
                  to={"/dashboard/ledger"}
                >
                  Ledger
                </NavLink>
              </div>
            </header>

            <Outlet></Outlet>
            <Subfooter></Subfooter>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbord;
