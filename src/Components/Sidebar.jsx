import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Theme } from "../Contexts/Theme";

import {
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState({
    sales: false,
    purchases: false,
    quotations: false,
    expenses: false,
    products: false,
    inventory: false,
    payments: false,
  });

 const {theme} =useContext(Theme);


 
 const logOut = async () => {





  localStorage.removeItem("token")
  navigate("/")
}


  // ⭐ AUTO-CLOSE TOGGLE LOGIC ⭐
  const toggle = (menu) => {
    setOpenMenu((prev) => {
      const newState = {};

      // close all first
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });

      // toggle clicked one
      newState[menu] = !prev[menu];

      return newState;
    });
  };

  return (
    <div
      className={`fixed  left-0 top-[52px] h-screen  2xl:h-screen w-53 p-4 
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100 border-gray-700"
            : "bg-[#f9f9f9] text-gray-900 border-gray-200"
        }`}
    >
      {/* Scrollable Content */}
      <div className="overflow-y-auto bar sm:max-h-[400px] 2xl:max-h-[800px] pr-1">
        <nav  className="flex  flex-col gap-3">

          {/* ---------- SALES ---------- */}
          <MenuSection 
            title="Sales"
            icon="fa-solid fa-money-bills text-gray-500 font-bold"
            isOpen={openMenu.sales}
            onClick={() => toggle("sales")}
            theme={theme}
          >
            <SubItem to="/dashboard/sales">Invoices</SubItem>
            <SubItem to="/dashboard/creditnotes">Credit Notes</SubItem>
            <SubItem to="/dashboard/einvoices">E-invoices</SubItem>
            <SubItem to="/dashboard/Subscriptions">Subscriptions</SubItem>
          </MenuSection>

          {/* ---------- PURCHASES ---------- */}
          <MenuSection theme={theme}
            title="Purchases"
            icon="fa-solid fa-cart-shopping text-gray-500 font-bold"
            isOpen={openMenu.purchases}
            onClick={() => toggle("purchases")}
          >
            <SubItem to="/dashboard/purchase">Bills</SubItem>
            <SubItem to="/dashboard/bills">Purchase Orders</SubItem>
            <SubItem to="/dashboard/debitnotes">Debit Notes</SubItem>
          </MenuSection>

          {/* ---------- QUOTATIONS ---------- */}
          <MenuSection theme={theme}
            title="Quotations+"
            icon="fa-solid fa-pen text-gray-500 font-bold"
            isOpen={openMenu.quotations}
            onClick={() => toggle("quotations")}
          >
            <SubItem to="/dashboard/quotations">Quotations</SubItem>

            <div className="flex items-center gap-2">
              <SubItem to={"/dashboard/salesorders"}>Sales Orders</SubItem>
              <span className="text-[10px] bg-blue-600 text-white px-1 py-0.5 rounded">
                NEW
              </span>
            </div>

            <SubItem to={"/dashboard/proformainvoices"}>Pro Forma Invoices</SubItem>
            <SubItem to={"/dashboard/deliverychallan"}>Delivery Challans</SubItem>
            <SubItem to={"/dashboard/packinglists"}>Packing Lists</SubItem>
          </MenuSection>

          {/* ---------- EXPENSES ---------- */}
          <MenuSection theme={theme}
            title="Expenses+"
            icon="fa-solid fa-tag text-gray-500 font-bold"
            isOpen={openMenu.expenses}
            onClick={() => toggle("expenses")}
          >
            <SubItem to="/dashboard/expenses">Expenses</SubItem>
            <SubItem>Categories</SubItem>
          </MenuSection>
          <MenuSection theme={theme}
            title="Customer"
            icon="fa-regular fa-user text-gray-500 font-bold"
         
            onClick={() =>{navigate("/dashboard/customer")}}
          >
            
          </MenuSection>
          <MenuSection theme={theme}
            title="Vendors"
            icon="fa-regular fa-user text-gray-500 font-bold"
         
            onClick={() =>{navigate("/dashboard/vendor")}}
          >
            
          </MenuSection>

          {/* ---------- PRODUCTS / INVENTORY / PAYMENTS ---------- */}
          <MenuSection
            title="Products & Services"
            isOpen={openMenu.products}
            icon="fa-solid fa-qrcode"
            onClick={() => {()=>toggle("products"),navigate("/dashboard/productandservices")}}
          />

          <MenuSection theme={theme}
            title="Inventory"
            isOpen={openMenu.inventory}
            icon="fa-solid fa-boxes-stacked"
            onClick={() => toggle("inventory")}
          >
 <SubItem to="/dashboard/warehouses">Warehouses</SubItem>

          </MenuSection>

          <MenuSection 
            title="payments"
            icon="fa-solid fa-indian-rupee-sign text-gray-500 font-bold"
            isOpen={openMenu.payments}
            onClick={() => toggle("payments")}
            theme={theme}
          >
            <SubItem to="/dashboard/timeline">Timeline</SubItem>
            <SubItem to="/dashboard/creditnotes">Payment Links</SubItem>
            <SubItem to="/dashboard/einvoices">Journals</SubItem>
            <SubItem to="/dashboard/Subscriptions">Bank Reconcilation</SubItem>
          </MenuSection>

        </nav>
      </div>

      {/* Promo */}
      <div className="mt-6 p-3 text-center bg-blue-100 dark:bg-blue-900 rounded-lg shadow-sm">
        <p className="text-[12px] font-semibold">Quick E-way bills! Web & Mobile</p>
        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs shadow">
          Subscribe Now 🚀
        </button>
      </div>
      <button onClick={logOut} className="p-2 ">
      <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  );
};

export default Sidebar;

/* ---------------------------------
   REUSABLE UI COMPONENTS BELOW
----------------------------------- */

const MenuSection = ({ title, icon, isOpen, onClick, children, theme }) => (
  <div>
    <button
      onClick={onClick}
      className={`group flex w-full justify-between px-2 py-1 rounded-lg items-center
      transition font-medium  text-[13px]
      ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
    >
      {/* LEFT SIDE */}
      <span
        className={`flex items-center gap-2 text-[12px] 
        text-gray-800 group-hover:text-black
        ${theme === "dark" && "group-hover:text-white"}`}
      >
        <i
          className={`${icon} 
          text-gray-600 
          group-hover:text-black  text-[10px]
          ${theme === "dark" && "group-hover:text-white"}`}
        ></i>
        {title}
      </span>

      {/* RIGHT ICON */}
      {isOpen ? (
        <FaChevronDown
          size={9}
          className="text-gray-400 group-hover:text-black"
        />
      ) : (
        <FaChevronRight
          size={9}
          className="text-gray-400 group-hover:text-black"
        />
      )}
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="ml-6 mt-1 flex flex-col gap-1 text-[13px]"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SubItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `transition hover:font-bold hover:text-gray-800
       ${isActive ? "text-gray-600 font-extrabold" : "text-gray-600 font-normal"}`
    }
  >
    {children}
  </NavLink>
);

const SimpleMenu = ({ title, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full justify-between px-2 py-2 rounded-lg items-center 
    hover:bg-gray-200  transition font-semibold text-[13px]"
  >
    <span>{title}</span>
    {isOpen ? <FaChevronDown color="#BDBDBD" size={9} /> : <FaChevronRight color="#BDBDBD" size={9} />}
  </button>
);
