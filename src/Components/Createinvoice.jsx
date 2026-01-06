import React, { useState,useEffect,useContext } from "react";
import {get_customer,getproducts,addinvoice} from "../redux/action";
import { Company } from "../Contexts/Company";
import {useSelector,useDispatch} from "react-redux";



const Createinvoice = () => {
 const dispatch = useDispatch()
 const {company} = useContext(Company);
 const customerdata = useSelector((state)=>state.customers.customers?.customers);
 console.log(12,customerdata);
 const productdata = useSelector((state)=>state.products.products);
 console.log("pro",productdata);
 


 useEffect(() => {
  if (company?.companyName) {
    dispatch(get_customer(company.companyName));
    dispatch(getproducts(company.companyName));
  }
}, [company, dispatch]);


  const [invoiceDate, setInvoiceDate] = useState("2026-01-05");
  const [dueDate, setDueDate] = useState("2026-01-05");
  const [selectedcx, setSelectedcx] = useState([]);
  const [reference, setReference] = useState("");
  const [products, setProducts] = useState([]);
  const [iscxopen, setIscxopen] = useState(false);
  const [isproductopen, setIsproductopen] = useState(false);
  const [product, setProduct] = useState("");
const [qty,setQty]=useState("")


  //  const selectedcx =[];
  
  console.log(38,selectedcx);


const handelsubmit =()=>{

  const selectedCxIds = selectedcx.map((cx) => cx.id);
  console.log("ides",selectedCxIds);



   
   const invoicedata ={

    customer_ids : selectedCxIds,
    items:product,
    invoice_date:invoiceDate,
    due_date:dueDate,
    reference:reference
    
  } 


  dispatch(addinvoice(invoicedata,company.companyName))
}
 
  

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

            <div className="relative bg-blue-50 rounded-xl p-3">
  {/* Input */}
  <input
    type="text"
    placeholder="Search customers, company, GSTIN, tags..."
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    
    onClick={() => setIscxopen((prev) => !prev)}
    
  />

  {/* Dropdown */}
  {iscxopen && (
  <div
    className="absolute left-0 right-0 mt-2 bg-white border border-gray-200
               rounded-lg shadow-lg z-30 max-h-56 overflow-y-auto"
  >
    {Array.isArray(customerdata) && customerdata.length > 0 ? (
      customerdata.map((ca) => (
        <div
          key={ca.id}
          onClick={() => {
            setSelectedcx((prev)=>[...prev,ca])
            setIscxopen(false);
          }}
          className="px-4 py-2 text-sm cursor-pointer
                     hover:bg-blue-50 hover:text-blue-700
                     transition-colors"
        >
          {ca.customer_name}
        </div>
      ))
    ) : (
      <div className="px-4 py-3 text-sm text-gray-500 text-center">
        No customers found
      </div>
    )}
  </div>
)}

{Array.isArray(selectedcx) && selectedcx.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2">
    {selectedcx.map((s) => (
      <div
        key={s.id}
        className="flex items-center gap-2 bg-blue-100 text-blue-700
                   px-3 py-1.5 rounded-full text-sm font-medium"
      >
        <span>{s.customer_name}</span>

        {/* Remove button (optional) */}
        <button
          onClick={() =>
            setSelectedcx((prev) =>
              prev.filter((c) => c.id !== s.id)
            )
          }
          className="text-blue-500 hover:text-blue-700 text-xs"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}




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
              onClick={()=>{setIsproductopen((prev)=>!prev)}}
              value={product}
            />
            
            <input
              type="number"
              placeholder="Qty"
              className="w-24 border rounded-md px-3 py-2 text-sm"
              value={qty}
              onChange={(e)=>{setQty(e.target.value)}}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              + Add to Bill
            </button>
            <button className="text-blue-600 text-sm">
              ✨ Create Invoices with AI
            </button>
          </div>
          {isproductopen&&<div className=" left-0 right-0 w-[500px] mt-2 bg-white border border-gray-200
                    rounded-lg shadow-lg z-30 max-h-56 overflow-y-auto">
      
      {Array.isArray(productdata)&&productdata.length > 0 ? (
        productdata?.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              setProduct(p.name);
              setIsproductopen(false);
            }}
            className="px-4 py-2 text-sm cursor-pointer
                       hover:bg-blue-50 hover:text-blue-700
                       transition-colors"
          >
            {p.name}
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-gray-500">
          No products found
        </div>
      )}
    </div>}
          

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
          <button onClick={handelsubmit} className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
            Save →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createinvoice;
