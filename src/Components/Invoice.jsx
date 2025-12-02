import React, { useState,useContext } from "react";
import { motion } from "framer-motion";
import { Download, Printer, FileText } from "lucide-react";
import {Theme} from "../Contexts/Theme"

const Invoice = () => {

    const {theme,setTheme} =useContext(Theme);

  const [invoiceData] = useState({
    invoiceNo: "INV-2025-001",
    date: "16 Sept 2025",
    dueDate: "30 Sept 2025",
    company: "BusyBox Pvt Ltd",
    client: "Sahil Enterprises",
    items: [
      { description: "UI Design Services", qty: 2, price: 5000 },
      { description: "React Development", qty: 5, price: 4000 },
      { description: "Hosting & Maintenance", qty: 1, price: 2000 },
    ],
  });

  const subtotal = invoiceData.items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <div className="w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="flex flex-col w-full p-4 sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] gap-[30px]">
          <main className="w-full p-6 sm:min-h-[600px] 2xl:h-[780px]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-700 text-white"
                  : "bg-white/70 border-gray-200 text-gray-900"
              }`}
            >
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FileText size={28} /> Invoice
              </h1>
              <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                Review invoice details and download/print easily.
              </p>
            </motion.div>

            {/* Invoice Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full rounded-2xl shadow-lg border p-8 mt-8 backdrop-blur-md ${
                theme === "dark"
                  ? "bg-gray-800/90 border-gray-700 text-white"
                  : "bg-white/80 border-gray-200 text-gray-800"
              }`}
            >
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Invoice No</p>
                  <h2 className="text-lg font-semibold">{invoiceData.invoiceNo}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Date</p>
                  <p>{invoiceData.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                  <h2 className="text-lg font-semibold">{invoiceData.dueDate}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Bill To</p>
                  <p>{invoiceData.client}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr
                      className={`${
                        theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-center">Price</th>
                      <th className="p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, i) => (
                      <tr
                        key={i}
                        className={`border-b ${
                          theme === "dark" ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <td className="p-3">{item.description}</td>
                        <td className="p-3 text-center">{item.qty}</td>
                        <td className="p-3 text-center">₹{item.price.toLocaleString()}</td>
                        <td className="p-3 text-right">₹{(item.qty * item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="mt-6 flex flex-col items-end gap-2 text-sm">
                <div className="flex justify-between w-64">
                  <span className="font-medium">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-64">
                  <span className="font-medium">Tax (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-64 text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 flex items-center gap-2 text-sm font-medium rounded-xl shadow-md ${
                          theme === "dark" ? "bg-gray-50 text-red-500" : "bg-lime-500 text-gray-600"
                        }`}
                >
                  <Printer className={`${theme==="dark"?"text-red-600":"text-lime-200"}`} size={16} /> Print
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 flex items-center gap-2 text-sm font-medium rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  <Download size={16} /> Download PDF
                </motion.button>
              </div>
            </motion.div>
          </main>
        </section>
      </main>
    </div>
  );
};

export default Invoice;
