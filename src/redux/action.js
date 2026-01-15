import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";


export const LOGIN = "LOGIN";
export const GLOGIN = "GLOGIN";
export const SENDOTP = "SENDOTP";
export const VERIFY_OTP = "VERIFY_OTP";



export const ADD_COMPANY = "ADD_COMPANY";
export const GET_COMPANY = "GET_COMPANY";


export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const GET_CUSTOMER = "GET_CUSTOMER";

export const ADD_MERCHANT = "ADD_MERCHANT";
export const GET_MERCHANT = "GET_MERCHANT";
export const GET_BANK_BY_IFSC = "GET_BANK_BY_IFSC";
export const SEARCH_VENDOR_CX = "SEARCH_VENDOR_CX";



export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";



export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";






export const GET_EXPENSE = "GET_EXPENSE";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const ADD_EXP_CATEGORY = "ADD_EXP_CATEGORY";
export const GET_EXP_CATEGORY = "GET_EXP_CATEGORY";



export const GET_PAYMENTS = "GET_PAYMENTS";




export const ADD_BANK = "ADD_BANK";
export const GET_BANK = "GET_BANK";



export const GET_WAREHOUSE = "GET_WAREHOUSE";
export const UPDATE_WAREHOUSE_STOCK = "UPDATE_WAREHOUSE_STOCK";
export const DELETE_WAREHOUSE_STOCK = "DELETE_WAREHOUSE_STOCK";


export const GET_INVENTORY_TIMELINE = "GET_INVENTORY_TIMELINE";



export const ADD_INVOICE = "ADD_INVOICE";
export const GET_INVOICE = "GET_INVOICE";




export const ADD_SIGNATURE = "ADD_SIGNATURE";











// import.meta.env.VITE_PRODUCTION_URL;
// import.meta.env.VITE_LOCAL_URL;
// console.log(31,import.meta.env.VITE_LOCAL_URL);
// console.log(31,import.meta.env.VITE_GOOGLE_CLIENT_ID);

// https://acs.busybox.in //
// http://192.168.1.43:3000 //
// http://192.168.1.45:3000 //

const baseUrl = import.meta.env.VITE_LOCAL_URL;




export const send_otp =
  (mobnum,setLoad,setIsotpsended) => async (dispatch) => {
    setLoad(true);

    const res = await fetch(`${baseUrl}/v1/user/login/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile: mobnum }),
    });

    const data = await res.json();

    if (res.status === 200) {
      // navigate("/dashboard/sales");
      
      // alert("otp sended")
      setIsotpsended(true)
      localStorage.setItem("otpsended", "true");
      toast.success("🚀otp send!", {
       
        duration: 2500,
      });
      

      setLoad(false);
    } else {
    
      setLoad(false);
    }
    // dispatch({ type: "SENDOTP", payload: data });
  };






export const verify_otp =
  (details, setLoad, navigate) => async (dispatch) => {
    setLoad(true);
    console.log(details);

    const res = await fetch(`${baseUrl}/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const data = await res.json();
    console.log(72,data);


        if (res.status===400) {
          // localStorage.setItem("otpsended", "true");
          toast.error("wrong otp!", {
           
            duration: 2500,
          });
          
        }


    if (res.status === 200) {
    
      localStorage.setItem("showLoginToast", "true");
      setLoad(false);
      localStorage.setItem("token", data.token);
     

      navigate("/dashboard/sales");
    } else {
      setLoad(false);
    
    }
    // dispatch({ type: "VERIFY_OTP", payload: data });
  };


export const addcompany = (formdata) => async (dispatch) => {
  console.log(106,formdata);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/company`, {
    method: "POST",
    headers: {
     
      Authorization: `Bearer ${token}`,
    },
    body:formdata
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("addcompany successfull")
    dispatch(get_company())
  }
   

  const data = await res.json();
  console.log(data);
  dispatch({ type: "ADD_COMPANY", payload: data });
};
export const addcustomer = (formdata,corp_id) => async (dispatch) => {
  console.log(106,formdata,corp_id);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/customerData/${corp_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(formdata)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("addcustomer successfull")
    dispatch(get_customer(corp_id))
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_COMPANY", payload: data });
};


export const get_company = () => async (dispatch) => {
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/company`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();
  dispatch({ type: "GET_COMPANY", payload: data });
};
export const get_customer = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/customerData/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_CUSTOMER", payload: data });
};




export const addmerchant = (payload,company) => async (dispatch) => {
  console.log(244,payload);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/vendor/add/merchant/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(payload)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("addmerchant successfull")
    dispatch(getmerchant(company))
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_MERCHANT", payload: data });
};
export const getmerchant = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/vendor/see/merchant/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_MERCHANT", payload: data });
};



export const addproduct = (product,company) => async (dispatch) => {
  console.log(345,product);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/product-service/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(product)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("add product successfull")
    dispatch(getproducts(company))
    
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_PRODUCT", payload: data });
};


export const getproducts = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/product-service/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_PRODUCTS", payload: data });
};




export const search_vendor_cx = () => async (dispatch) => {
  // console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/vendor/customers/search`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "SEARCH_VENDOR_CX", payload: data });
};


export const addcategory = (category,company) => async (dispatch) => {
  console.log(244,category);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/categories/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(category)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("add category successfull")
    dispatch(getcategory(company))
    
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_CATEGORY", payload: data });
};

export const getcategory = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/categories/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_CATEGORY", payload: data });
};


export const getinvoice = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/invoice/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_INVOICE", payload: data });
};


export const addinvoice = (invoicedata,company_name) => async (dispatch) => {
  console.log(244,invoicedata);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/invoice/${company_name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(invoicedata)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("invoice created")
    dispatch(getinvoice(company_name))
    
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_INVOICE", payload: data });
};




export const getexpense = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/expenses/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();


  // console.log(541,data);
  dispatch({ type: "GET_EXPENSE", payload: data });
};

////addexp////


export const addexpense = (expanse,company) => async (dispatch) => {
  console.log(244,expanse);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/expenses/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(expanse)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("add expanse successfull")
    dispatch(getexpense(company))
    
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_EXPENSE", payload: data });
};




  
export const getpayments = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/payments/timeline/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();


  console.log(541,data);
  dispatch({ type: "GET_PAYMENTS", payload: data });
};



export const addexpcategory = (category,company) => async (dispatch) => {
  console.log(244,category);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/expense-category/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(category)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("add expcategory successfull")
    // dispatch(getcategory(company))
    
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_EXP_CATEGORY", payload: data });
};

export const getexpcategory = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/expense-category/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_EXP_CATEGORY", payload: data });
};



export const getbank = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/bank/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_BANK", payload: data });
};



export const addbank = (bankdetails,company) => async (dispatch) => {
  console.log(244,bankdetails);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/bank/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(bankdetails)
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("add Bank successfull")
    // dispatch(getcategory(company))
    
  }
   

  const data = await res.json();
  dispatch({ type: "ADD_BANK", payload: data });
};



export const getwarehouse = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/warehouse/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "GET_WAREHOUSE", payload: data });
};
export const updatewarehousestock = (company_name,productid,stockdata) => async (dispatch) => {
  console.log(205,company_name,stockdata);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/inventory/stock-add/${company_name}/${productid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(stockdata)
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===200) {
    alert("add-stock successfull")
    dispatch(getwarehouse(company_name))
    
  }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "UPDATE_WAREHOUSE_STOCK", payload: data });
};
export const deletewarehousestock = (company_name,productid,stockdata) => async (dispatch) => {
  console.log(205,company_name,productid);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/inventory/stock-remove/${company_name}/${productid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(stockdata)
   
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===200) {
    alert("remove-stock succesfull")
    dispatch(getwarehouse(company_name))
    
  }
   

  const data = await res.json();

  console.log(232,data);
  dispatch({ type: "DELETE_WAREHOUSE_STOCK", payload: data });
};





export const getinventorytimeline = (company_name) => async (dispatch) => {
  console.log(205,company_name);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/inventory/timeline/${company_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(899,data);
  dispatch({ type: "GET_INVENTORY_TIMELINE", payload: data });
};



export const addsignature = (formdata,company_name) => async (dispatch) => {
  console.log(106,formdata);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/signature/${company_name}`, {
    method: "POST",
    headers: {
     
      Authorization: `Bearer ${token}`,
    },
    body:formdata
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("addcompany successfull")
    dispatch(get_company())
  }
   

  const data = await res.json();
  console.log(data);
  dispatch({ type: "ADD_SIGNATURE", payload: data });
};


export const getbankbyifsc = (ifsc) => async (dispatch) => {
  console.log(205,ifsc);
 
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/user/ifsc/${ifsc}
  `, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
      Authorization: `Bearer ${token}`,
    },
  
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  // if (res.status===200) {
  //   // alert("addcompany successfull")
    
  // }
   

  const data = await res.json();

  console.log(899,data);
  dispatch({ type: "GET_BANK_BY_IFSC", payload: data });
};