import React from 'react'

const Invoicepreview = () => {
    return (
      <div className="bg-white w-[794px] min-h-[1123px] shadow-lg rounded-md">
  
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-xl font-semibold">Google</h1>
          <p className="text-xs">TAX INVOICE</p>
        </div>
  
        {/* Content */}
        <div className="p-6 text-sm">
  
          {/* Company + Invoice meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Alphabet Inc.</p>
              <p>Gurugram, Haryana</p>
              <p>GSTIN: 06C...</p>
            </div>
            <div className="text-right">
              <p>Invoice #: INV-2</p>
              <p>Date: 28 Dec 2024</p>
              <p>Due Date: 28 Dec 2024</p>
            </div>
          </div>
  
          {/* Items */}
          <table className="w-full mt-6 border text-xs">
            <thead className="bg-blue-50">
              <tr>
                <th className="border p-2">Item</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  Pixel Watch 3
                  <div className="flex gap-2 mt-2">
                    <img src="/watch.png" className="w-16 h-16 rounded" />
                  </div>
                </td>
                <td className="border p-2">₹21,165</td>
                <td className="border p-2">3</td>
                <td className="border p-2 text-right">₹63,505</td>
              </tr>
            </tbody>
          </table>
  
          {/* Totals */}
          <div className="flex justify-end mt-6">
            <div className="w-64 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹1,61,355</span>
              </div>
              <div className="flex justify-between">
                <span>GST 9%</span>
                <span>₹14,521</span>
              </div>
              <div className="flex justify-between font-semibold border-t mt-2 pt-2">
                <span>Total</span>
                <span>₹1,90,399</span>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    );
  };
  

export default Invoicepreview
