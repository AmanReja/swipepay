import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ theme }) => {
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
      className={`fixed left-0 top-[52px] h-[590px] w-60 p-4 border-r
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100 border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"
        }`}
    >
      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[400px] pr-1">
        <nav className="flex flex-col gap-3">

          {/* ---------- SALES ---------- */}
          <MenuSection
            title="Sales"
            icon="fa-solid fa-money-bills text-gray-500 font-bold"
            isOpen={openMenu.sales}
            onClick={() => toggle("sales")}
          >
            <SubItem to="/dashboard/sales">Invoices</SubItem>
            <SubItem to="/dashboard/creditnotes">Credit Notes</SubItem>
            <SubItem to="/dashboard/einvoices">E-invoices</SubItem>
            <SubItem to="/dashboard/Subscriptions">Subscriptions</SubItem>
          </MenuSection>

          {/* ---------- PURCHASES ---------- */}
          <MenuSection
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
          <MenuSection
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
            <SubItem>Packing Lists</SubItem>
          </MenuSection>

          {/* ---------- EXPENSES ---------- */}
          <MenuSection
            title="Expenses+"
            icon="fa-solid fa-tag text-gray-500 font-bold"
            isOpen={openMenu.expenses}
            onClick={() => toggle("expenses")}
          >
            <SubItem to="/dashboard/expenses">Expenses</SubItem>
            <SubItem>Categories</SubItem>
          </MenuSection>

          {/* ---------- PRODUCTS / INVENTORY / PAYMENTS ---------- */}
          <SimpleMenu
            title="Products & Services"
            isOpen={openMenu.products}
            onClick={() => {()=>toggle("products"),navigate("/dashboard/productandservices")}}
          />

          <MenuSection
            title="Inventory"
            isOpen={openMenu.inventory}
            onClick={() => toggle("inventory")}
          >
 <SubItem to="/dashboard/warehouses">Warehouses</SubItem>

          </MenuSection>

          <SimpleMenu
            title="Payments"
            isOpen={openMenu.payments}
            onClick={() => toggle("payments")}
          />

        </nav>
      </div>

      {/* Promo */}
      <div className="mt-6 p-3 text-center bg-blue-100 dark:bg-blue-900 rounded-lg shadow-sm">
        <p className="text-[12px] font-semibold">Quick E-way bills! Web & Mobile</p>
        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs shadow">
          Subscribe Now 🚀
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

/* ---------------------------------
   REUSABLE UI COMPONENTS BELOW
----------------------------------- */

const MenuSection = ({ title, icon, isOpen, onClick, children }) => (
  <div>
    <button
      onClick={onClick}
      className="flex w-full justify-between px-2 py-2 rounded-lg items-center
      hover:bg-gray-200 dark:hover:bg-gray-800 transition font-semibold text-[13px]"
    >
      <span className="flex items-center gap-2"><i className={icon}></i> {title}</span>
      {isOpen ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />}
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
  <Link
    to={to}
    className="hover:font-bold hover:text-gray-800 dark:hover:text-blue-300 transition"
  >
    {children}
  </Link>
);

const SimpleMenu = ({ title, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full justify-between px-2 py-2 rounded-lg items-center 
    hover:bg-gray-200 dark:hover:bg-gray-800 transition font-semibold text-[13px]"
  >
    <span>{title}</span>
    {isOpen ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />}
  </button>
);
