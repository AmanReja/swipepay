import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaShoppingCart,
  FaShoppingBag,
  FaFileInvoice,
  FaListAlt,
  FaDollarSign,
  FaBox,
  FaWarehouse,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronRight,
  FaTags,
  FaClipboardList,
  FaRegFileAlt,
  FaTruck,
} from "react-icons/fa";

const Sidebar = ({ theme }) => {

  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState({
    sales: false,
    purchases: false,
    quotations: true,
    expenses: false,
    products: false,
    inventory: false,
    payments: false,
  });

  const toggle = (menu) => {
    setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] });
  };

  return (
    <>
      <div
        className={`fixed left-0 top-[52px] h-[590px] w-60 p-4 
          ${
            theme === "dark"
              ? "bg-gray-900 text-gray-100 border-gray-700"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
      >
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[400px]">
          <nav className="flex flex-col gap-2">

            {/* SALES */}
          {/* SALES */}
<div>
  <button
    onClick={() => toggle("sales")}
    className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
  >
    <span className="flex items-center gap-2 text-[13px] font-bold">
      <i className="fa-solid fa-money-bills"></i> Sales
    </span>
    {openMenu.sales ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />}
  </button>

  <AnimatePresence>
    {openMenu.sales && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <div className="ml-6 flex flex-col gap-1 text-sm py-1">
          <Link to={"/dashboard/sales"} className="hover:font-bold">Invoices</Link>
          <Link to={"/dashboard/creditnotes"} className="hover:font-bold">Credit Notes</Link>
          <Link to={"/dashboard/einvoices"} className="hover:font-bold">E-invoices</Link>
          <Link to={"/dashboard/Subscriptions"} className="hover:font-bold">Subscriptions</Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

            {/* PURCHASES */}
            <div>
              <button
                onClick={() => toggle("purchases")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span  className="flex items-center gap-2 text-[13px] font-bold">
                <i class="fa-solid fa-cart-shopping"></i> Purchases
                </span>
                {openMenu.purchases ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>
     <AnimatePresence>

     {openMenu.purchases && (
                <motion.div    initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}  className="ml-6 flex flex-col gap-1 text-sm">
                  <Link to={"/dashboard/purchase"} className="flex items-center gap-2 hover:font-bold ">
                    Bills
                  </Link>
                  <Link to={"/dashboard/bills"} className="flex items-center gap-2 hover:font-bold ">
                   Purchase Orders
                  </Link>
                  <Link to={"/dashboard/debitnotes"} className="flex items-center gap-2 hover:font-bold ">
                    Debit Notes
                  </Link>
                </motion.div>
              )}
     </AnimatePresence>
          
            </div>

            {/* QUOTATIONS+ */}
            <div>
              <button
                onClick={() => toggle("quotations")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center font-medium"
              >
                <span className="flex items-center gap-2 text-[13px] font-bold">
                <i class="fa-solid fa-pen"></i> Quotations+
                </span>
                {openMenu.quotations ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>


       <AnimatePresence>

       {openMenu.quotations && (
                <motion.div  initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }} className="ml-6 mt-1 flex flex-col gap-1 text-sm">
                  <Link className="flex items-center gap-2  hover:font-bold ">
                     Quotations
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link className="flex items-center gap-2 hover:font-bold ">
                       Sales Orders
                    </Link>
                    <span className="text-[10px] bg-blue-600 text-white px-1 py-0.5 rounded">
                      NEW
                    </span>
                  </div>

                  <Link className="flex items-center gap-2 hover:font-bold ">
                     Pro Forma Invoices
                  </Link>

                  <Link className="flex items-center gap-2  hover:font-bold ">
                     Delivery Challans
                  </Link>

                  <Link className="flex items-center gap-2  hover:font-bold ">
                    Packing Lists
                  </Link>
                </motion.div>
              )}

       </AnimatePresence>
            
            </div>

            {/* EXPENSES */}
            <div>
              <button
                onClick={() => toggle("expenses")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span className="flex items-center gap-2 text-[13px] font-bold ">
                <i class="fa-solid fa-tag"></i> Expenses+
                </span>
                {openMenu.expenses ? <FaChevronDown size={8}  /> : <FaChevronRight  size={8}  />}
              </button>

              {openMenu.expenses && (
                <div className="ml-6 flex flex-col gap-1 text-sm">
                  <Link to={"/dashboard/expenses"} className="flex items-center gap-2  hover:font-bold ">
                    Expenses
                  </Link>
                  <Link className="flex items-center gap-2 hover:font-bold">
                     Categories
                  </Link>
                </div>
              )}
            </div>

            {/* PRODUCTS & SERVICES */}
            <div>
              <button
                onClick={() => toggle("products")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span className="flex items-center gap-2 text-[13px] font-bold">
                  Products & Services
                </span>
                {openMenu.products ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>
            </div>

            {/* INVENTORY */}
            <div>
              <button
                onClick={() => toggle("inventory")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span className="flex items-center gap-2 text-[13px] font-bold ">
                 Inventory
                </span>
                {openMenu.inventory ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>
            </div>

            {/* PAYMENTS */}
            <div>
              <button
                onClick={() => toggle("payments")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span className="flex items-center gap-2 text-[13px] font-bold">
                   Payments
                </span>
                {openMenu.payments ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>
            </div>

          </nav>
        </div>

        {/* Promo Footer */}
        <div className="mt-6 p-3 text-center bg-blue-50 dark:bg-blue-900 rounded">
          <p className="text-[12px] font-semibold">Quick E-way bills! Web & Mobile</p>
          <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs">
            Subscribe Now 🚀
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
