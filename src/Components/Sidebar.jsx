import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
            <div>
              <button
                onClick={() => toggle("sales")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span className="flex items-center gap-2">
                  <FaShoppingCart /> Sales
                </span>
                {openMenu.sales ? <FaChevronDown size={8} /> : <FaChevronRight size={8}  />}
              </button>

              {openMenu.sales && (
                <div className="ml-6 flex flex-col gap-1 text-sm">
                  <Link to={"/dashboard/sales"} className="flex items-center gap-2 hover:underline">
                    <FaFileInvoice size={13} /> Invoices
                  </Link>
                  <Link className="flex items-center gap-2 hover:underline">
                    <FaTags size={13} /> Credit Notes
                  </Link>
                </div>
              )}
            </div>

            {/* PURCHASES */}
            <div>
              <button
                onClick={() => toggle("purchases")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span  className="flex items-center gap-2">
                  <FaShoppingBag /> Purchases
                </span>
                {openMenu.purchases ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>

              {openMenu.purchases && (
                <div className="ml-6 flex flex-col gap-1 text-sm">
                  <Link to={"/dashboard/purchase"} className="flex items-center gap-2 hover:underline">
                    <FaFileInvoice size={13} /> Bills
                  </Link>
                  <Link className="flex items-center gap-2 hover:underline">
                    <FaClipboardList size={13} /> Purchase Orders
                  </Link>
                </div>
              )}
            </div>

            {/* QUOTATIONS+ */}
            <div>
              <button
                onClick={() => toggle("quotations")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center font-medium"
              >
                <span className="flex items-center gap-2">
                  ✏️ Quotations+
                </span>
                {openMenu.quotations ? <FaChevronDown size={8}  /> : <FaChevronRight size={8}  />}
              </button>

              {openMenu.quotations && (
                <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
                  <Link className="flex items-center gap-2 hover:underline">
                    <FaRegFileAlt size={13} /> Quotations
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link className="flex items-center gap-2 hover:underline">
                      <FaListAlt size={13} /> Sales Orders
                    </Link>
                    <span className="text-[10px] bg-blue-600 text-white px-1 py-0.5 rounded">
                      NEW
                    </span>
                  </div>

                  <Link className="flex items-center gap-2 hover:underline">
                    <FaRegFileAlt size={13} /> Pro Forma Invoices
                  </Link>

                  <Link className="flex items-center gap-2 hover:underline">
                    <FaTruck size={13} /> Delivery Challans
                  </Link>

                  <Link className="flex items-center gap-2 font-semibold hover:underline">
                    <FaBox size={13} /> Packing Lists
                  </Link>
                </div>
              )}
            </div>

            {/* EXPENSES */}
            <div>
              <button
                onClick={() => toggle("expenses")}
                className="flex w-full justify-between px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded items-center"
              >
                <span className="flex items-center gap-2">
                  <FaDollarSign /> Expenses+
                </span>
                {openMenu.expenses ? <FaChevronDown size={8}  /> : <FaChevronRight  size={8}  />}
              </button>

              {openMenu.expenses && (
                <div className="ml-6 flex flex-col gap-1 text-sm">
                  <Link className="flex items-center gap-2 hover:underline">
                    <FaMoneyBillWave size={13} /> Expenses
                  </Link>
                  <Link className="flex items-center gap-2 hover:underline">
                    <FaTags size={13} /> Categories
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
                <span className="flex items-center gap-2">
                  <FaBox /> Products & Services
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
                <span className="flex items-center gap-2">
                  <FaWarehouse /> Inventory
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
                <span className="flex items-center gap-2">
                  <FaMoneyBillWave /> Payments
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
