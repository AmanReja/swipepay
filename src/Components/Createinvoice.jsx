import React, { useState } from "react";

const Createinvoice = () => {
  const [invoiceDate, setInvoiceDate] = useState("2026-01-05");
  const [dueDate, setDueDate] = useState("2026-01-05");
  const [customer, setCustomer] = useState("");
  const [reference, setReference] = useState("");
  const [products, setProducts] = useState([]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">Type</p>
          <button className="flex items-center gap-1 font-semibold text-gray-800">
            Bill of Supply
            <span className="text-gray-400">▼</span>
          </button>
        </div>

        <button className="text-sm text-gray-600 flex items-center gap-1">
          ⚙ Settings
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Customer + Other Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold text-gray-700">
                Customer details
              </p>
              <button className="text-xs text-blue-600">
                + Add new Customer?
              </button>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <input
                type="text"
                placeholder="Search your Customers, Company Name, GSTIN, tags..."
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs">
                Default Customer ✕
              </span>
            </div>
          </div>

          {/* Other Details */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Other details
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500">
                  Bill of Supply Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full border rounded-md px-2 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border rounded-md px-2 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Reference</label>
                <input
                  type="text"
                  placeholder="PO Number, Sales Person..."
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full border rounded-md px-2 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-700">
                Products & Services
              </p>
              <button className="text-xs text-blue-600">
                + Add new Product?
              </button>
            </div>

            <label className="text-xs flex items-center gap-1 text-gray-600">
              <input type="checkbox" />
              Show description
            </label>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-3">
            <input
              type="text"
              placeholder="Sample Product"
              className="flex-1 border rounded-md px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Qty"
              className="w-24 border rounded-md px-3 py-2 text-sm"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              + Add to Bill
            </button>
            <button className="text-blue-600 text-sm">
              ✨ Create Invoices with AI
            </button>
          </div>

          {/* Products Table */}
          <div className="mt-4 border rounded-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">Product Name</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Unit Price</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-gray-400"
                  >
                    No products added
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button className="px-4 py-2 rounded-md border text-sm">
            Save as Draft
          </button>
          <button className="px-4 py-2 rounded-md border text-sm">
            Save and Print
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
            Save →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createinvoice;
