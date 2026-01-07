import React, { useState,useEffect,useContext } from "react";
import {get_customer,getproducts,addinvoice,getinvoice} from "../redux/action";
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
  const [invoicenumberprefix, setInvoicenumberprefix] = useState({fx1:"INV-",fx2:""});
  const [reference, setReference] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [iscxopen, setIscxopen] = useState(false);
  const [isproductopen, setIsproductopen] = useState(false);
  const [product, setProduct] = useState(null);
const [qty,setQty]=useState("")


console.log(39,addedProducts);

const handleAddProduct = () => {
  const newItem = {
    rowId: Date.now(),       
    product_id: product.id,  
    product_name: product.name,
    quantity: qty,
    unit_price: product.selling_price,
    discount: product.discount || 0,
    total: qty * product.selling_price
  };

  setAddedProducts((prev) => [...prev, newItem]);
};

const updateRow = (rowId, field, value) => {
  setAddedProducts((prev) =>
    prev.map((row) =>
      row.rowId === rowId
        ? {
            ...row,
            [field]: value,
            total:
              field === "quantity"
                ? value * row.unit_price
                : field === "unit_price"
                ? row.quantity * value
                : row.total
          }
        : row
    )
  );
};



  
  console.log(38,selectedcx);
  console.log(42,invoicenumberprefix);


const handelsubmit =()=>{


  const selectedCxIds = selectedcx.map((cx) => cx.id);
  console.log("ides",selectedCxIds);



   
   const invoicedata ={

    invoice_number_prefix:invoicenumberprefix.fx1+invoicenumberprefix.fx2,
    customer_ids : selectedCxIds,
    product_service_id:product.id,
    
    invoice_date:invoiceDate,
    due_date:dueDate,
    reference:reference,
    invoice_type : "regular",
    payments : [],
    item:""
    
    
  } 
  // invoice_number_prefix,
  // customer_ids,
  // invoice_date,
  // due_date,
  // reference,

  // product: {
  //   product_service_id: items[0].product_service_id,
  //   quantity: items[0].quantity
  // },




 


  dispatch(addinvoice(invoicedata,company.companyName))
}


const invoicedata = useSelector((state)=>state.invoice.invoice);
console.log("inv",invoicedata);

useEffect(() => {
  dispatch(getinvoice(company.companyName))

 
}, [company,dispatch])

 
  

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
          <div className="flex items-center w-fit border rounded-lg overflow-hidden bg-white shadow-sm">
  <select value={invoicenumberprefix.fx1} onChange={(e)=>{setInvoicenumberprefix({...invoicenumberprefix,fx1:e.target.value})}}
    className="px-3 py-2 text-sm bg-gray-100 border-r focus:outline-none cursor-pointer"
  >
    <option  value="INV-">INV-</option>
    <option value="FN-">FN-</option>
    <option value="LN-">LN-</option>
  </select>

  <input onChange={(e)=>{setInvoicenumberprefix({...invoicenumberprefix,fx2:e.target.value})}}
    type="text"
    placeholder="1"
    className="px-3 py-2 text-sm w-24 focus:outline-none"
  />
</div>

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
    setSelectedcx((prev) => {
      const alreadyAdded = prev.find(p => p.id === ca.id);

      if (alreadyAdded) {
        alert("cx already added");
        return prev; // ❌ do not add again
      } else{
        return [...prev, ca];
      }

       // ✅ add new
    });

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
        className="flex items-center gap-2 bg-pink-50 text-gray-900
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
          className="text-gray-500 hover:text-blue-700 text-xs"
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
    onClick={() => setIsproductopen(true)}
    value={product?.name || ""}
    readOnly
  />

  <input
    type="number"
    // min="1"
    placeholder="Qty"
    className="w-24 border rounded-md px-3 py-2 text-sm"
    value={qty}
    onChange={(e) => setQty(e.target.value)}
  />

  <button
    onClick={handleAddProduct}
    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
  >
    + Add to Bill
  </button>
</div>

          {isproductopen&&<div className=" left-0 right-0 w-[500px] mt-2 bg-white border border-gray-200
                    rounded-lg shadow-lg z-30 max-h-56 overflow-y-auto">
      
      {Array.isArray(productdata)&&productdata.length > 0 ? (
        productdata?.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              setProduct(p);
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
          <div className="mt-4  rounded-lg overflow-hidden">
          <table className="min-w-full text-sm ">
  <thead className="bg-gray-50 text-gray-500">
    <tr>
      <th className="px-4 py-3 text-left">Product Name</th>
      <th className="px-4 py-3 text-center">Quantity</th>
      <th className="px-4 py-3 text-center">Unit Price</th>
      <th className="px-4 py-3 text-center">Discount</th>
      <th className="px-4 py-3 text-right">Total</th>
    </tr>
  </thead>

  <tbody>
  {addedProducts.map((item) => (
    <tr key={item.rowId} className="border-b text-sm">
      
      {/* Product Name */}
      <td className="px-4 py-3 align-top">
        <div className="font-medium text-gray-800">
          {item.product_name}
        </div>

        <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
          <span># Stock: {item.stock ?? 0}</span>
          <button className="text-blue-600 hover:underline">
            + HSN/SAC
          </button>
        </div>

        <button className="text-xs text-blue-600 mt-1 hover:underline">
          + Add Description
        </button>
      </td>

      {/* Quantity */}
      <td className="px-4 py-3 text-center">
        <input
          type="number"
          min="1"
          className="w-20 border rounded-md px-2 py-1 text-center focus:ring-1 focus:ring-blue-500 outline-none"
          value={item.quantity}
          onChange={(e) =>
            updateRow(item.rowId, "quantity", Number(e.target.value))
          }
        />
      </td>

      {/* Unit Price */}
      <td className="px-4 py-3 text-center">
        <input
          type="number"
          min="0"
          className="w-28 border rounded-md px-2 py-1 text-center focus:ring-1 focus:ring-blue-500 outline-none"
          value={item.unit_price}
          onChange={(e) =>
            updateRow(item.rowId, "unit_price", Number(e.target.value))
          }
        />
      </td>

      {/* Discount */}
      <td className="px-4 py-3 text-center">
        <div className="flex items-center border rounded-md overflow-hidden w-fit mx-auto">
          <input
            type="number"
            min="0"
            className="w-16 px-2 py-1 text-center outline-none"
            value={item.discount}
            onChange={(e) =>
              updateRow(item.rowId, "discount", Number(e.target.value))
            }
          />
          <select className="px-2 py-1 text-xs bg-gray-100 outline-none">
            <option value="%">%</option>
            <option value="₹">₹</option>
          </select>
        </div>
      </td>

      {/* Total */}
      <td className="px-4 py-3 text-right font-semibold">
        ₹{item.total.toFixed(2)}
      </td>

      {/* Delete */}
      <td className="px-3 py-3 text-center">
      <button   onClick={() =>
            setAddedProducts((prev) =>
              prev.filter((p) => p.rowId !== item.rowId)
            )
          } className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200">
            <i class="fa fa-sm fa-trash "></i> 
            </button>
      
      </td>
    </tr>
  ))}
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
          <button  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
            Save →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createinvoice;
