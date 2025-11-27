import React, { useState } from "react";

const Invoices = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const invoices = [
    {
      id: "INV-001",
      customer: "John Doe",
      amount: 4500,
      date: "2025-01-12",
      status: "Paid",
    },
    {
      id: "INV-002",
      customer: "Amit Sharma",
      amount: 1200,
      date: "2025-01-15",
      status: "Pending",
    },
    {
      id: "INV-003",
      customer: "Sarah Wilson",
      amount: 8900,
      date: "2025-01-20",
      status: "Overdue",
    },
  ];

  const filteredInvoices =
    filterStatus === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filterStatus);

  return (
    <div className="w-full h-full overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Invoices</h1>

        <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
          + Create Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>

        <input
          type="date"
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="py-3 px-4 text-left">Invoice ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="py-3 px-4 font-medium">{inv.id}</td>
                <td className="py-3 px-4">{inv.customer}</td>
                <td className="py-3 px-4">₹{inv.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{inv.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded 
              ${
                inv.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : inv.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
              `}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="py-3 px-4 flex justify-center gap-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredInvoices.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="py-3 px-4 text-left">Invoice ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="py-3 px-4 font-medium">{inv.id}</td>
                <td className="py-3 px-4">{inv.customer}</td>
                <td className="py-3 px-4">₹{inv.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{inv.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded 
              ${
                inv.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : inv.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
              `}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="py-3 px-4 flex justify-center gap-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredInvoices.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="py-3 px-4 text-left">Invoice ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="py-3 px-4 font-medium">{inv.id}</td>
                <td className="py-3 px-4">{inv.customer}</td>
                <td className="py-3 px-4">₹{inv.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{inv.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded 
              ${
                inv.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : inv.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
              `}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="py-3 px-4 flex justify-center gap-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredInvoices.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
