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
export const SEARCH_VENDOR_CX = "SEARCH_VENDOR_CX";



export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";



export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";


export const GET_INVOICE = "GET_INVOICE";







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




export const addmerchant = (vendor,company,id) => async (dispatch) => {
  console.log(244,vendor);
  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/vendor/add/merchant/${company}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({vendor,linked_customer_id:id?id:null})
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
  console.log(244,product);
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