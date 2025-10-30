
import { jwtDecode } from "jwt-decode";
export const GETALL_LEDGER_WALLET = "GETALL_LEDGER_WALLET";
export const GETALL_PAYOUTLOG_DATA = "GETALL_PAYOUTLOG_DATA";
export const GETALL_BULKPAY_DATA = "GETALL_BULKPAY_DATA";
export const GETALL_WALLET_COMPANY_DATA = "GETALL_WALLET_COMPANY_DATA";
export const GETONE_USER = "GETONE_USER";
export const PAYOUT_REPORT = "PAYOUT_REPORT";
export const GETENTITY_CALLBACK = "GETENTITY_CALLBACK";
export const ADDENTITY_CALLBACK = "ADDENTITY_CALLBACK";
export const UPDATEENTITY_CALLBACK = "UPDATEENTITY_CALLBACK";
export const DELETEENTITY_CALLBACK = "DELETEENTITY_CALLBACK";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const GETCOLLECTIONS = "GETCOLLECTIONS";
export const GETVERTUAL_ACCOUNT = "GETVERTUAL_ACCOUNT";
export const VERIFY_AADHAR = "VERIFY_AADHAR";
export const LOGIN = "LOGIN";
export const GLOGIN = "GLOGIN";
export const SENDOTP = "SENDOTP";
export const VERIFY_OTP = "VERIFY_OTP";
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
export const COLLECTION_REPORT = "COLLECTION_REPORT";
export const SUMMARY = "SUMMARY";
export const GETALL_VIRTUAL_ACCOUNT_TXN = "GETALL_VIRTUAL_ACCOUNT_TXN";




// https://acs.busybox.in //
// http://192.168.1.43:3000 //


const baseUrl = "http://192.168.1.45:3000";





export const update_user_details =(updatedinfo)=>async(dispatch)=>{
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/update-details`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(updatedinfo)
     
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===200) {
        alert("user details updated")
       
  const res = await fetch(
    `${baseUrl}/v1/user/get-details`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }
  const data = await res.json();
  dispatch({ type: "GETONE_USER", payload: data });

  }

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  dispatch({ type: "UPDATE_USER_DETAILS", payload: data });
    
    
  }

  
  



export const google_login = (navigate,accessToken)=>async(dispatch)=>{

  const res = await fetch(`${baseUrl}/v1/user/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
  });

  const data = await res.json();


  if (res.status === 200) {
   
    localStorage.setItem("token", data.token);
    navigate("/dashboard/summery?login=success");
   
    localStorage.setItem("user", JSON.stringify(data.user));
  
  } dispatch({ type: "GLOGIN", payload: data });

}
export const send_otp = (forgetpassemail,seterror,navigate,setLoad)=>async(dispatch)=>{


  setLoad(true)
  

  const res = await fetch(`${baseUrl}/v1/user/forgot-password/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:forgetpassemail}),
  });

  const data = await res.json();
 

  if (res.status === 200) {
 
    
    navigate("/otpverification")
   
    setLoad(false)
    
  
  } else{
   
    seterror(true)
    setLoad(false)
  }
  dispatch({ type: "SENDOTP", payload: data });
}
export const verify_otp = (otp,setLoad,setError,navigate)=>async(dispatch)=>{
 

  setLoad(true)
  

  const res = await fetch(`${baseUrl}/v1/user/forgot-password/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({otp:otp}),
  });

  const data = await res.json();


  if (res.status === 200) {
    
   alert("otp verified")
   setLoad(false)
   
   navigate("/resetpassword")
   
   
   
    
  
  } else{

    setLoad(false)
    setError(true)
   
  }
  dispatch({ type: "VERIFY_OTP", payload: data });
}


export const login = (olduser, navigate, setWrong) => async (dispatch) => {
  try {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(olduser),
      credentials: "include",
    };

    const res = await fetch(`${baseUrl}/v1/user/login`, request);
    const data = await res.json();
 

    if (!res.ok) {
      setWrong(true);
      alert(data?.message || "Invalid email or password!");
      return; // Stop further execution
    }

    // ✅ On Success
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setWrong(false);
    navigate("/dashboard/summery");
    localStorage.setItem("showLoginToast", "true");
 

    dispatch({ type: "LOGIN", payload: data });
  } catch (error) {
    console.error("Login Error:", error);
    setWrong(true);
    alert("Something went wrong! Please try again later.");
  }
};




export const getall_ledgerwallet_data =
  (searchtr, trstatus,searchdate_start,searchdate_end,downloadexcl=false,page,pagelimit) => async (dispatch) => {



    
  

 
  

    const token = localStorage.getItem("token") || {};
    const   decoded = jwtDecode(token);
    
  

    const params = new URLSearchParams();
  if (searchtr) params.append("search", searchtr);
  if (trstatus) params.append("status", trstatus);
  if (searchdate_start) params.append("start_date", searchdate_start);
  if (searchdate_end) params.append("end_date", searchdate_end);
  if(downloadexcl) params.append("download", "excel");
  if (page) params.append("page", page);
  if (pagelimit) params.append("limit", pagelimit);


  const res = await fetch(
    `${baseUrl}/v1/user/wallet-ledger?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }


  if (downloadexcl==true) {
    const blob = await res.blob();
    const fileURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `${decoded.corpID
    }_${searchdate_start} - ${searchdate_end}_pool_ledger_report.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    return; 
  }
    const data = await res.json();
    dispatch({ type: "GETALL_LEDGER_WALLET", payload: data });
  };

export const getall_payoutlog_data = (searchtr,trstatus,searchdate_start,searchdate_end,downloadexcl=false,page,pagelimit) => async (dispatch) => {



  try {
    const token = localStorage.getItem("token") || {};
    const decoded = jwtDecode(token);


    const params = new URLSearchParams();
    if (searchtr) params.append("search", searchtr);
    if (trstatus) params.append("status", trstatus);
    if (searchdate_start) params.append("start_date", searchdate_start);
    if (searchdate_end) params.append("end_date", searchdate_end);
    if(downloadexcl) params.append("download", "excel");
    if(page) params.append("page", page);
    if(pagelimit) params.append("limit", pagelimit);
  
  
    const res = await fetch(
      `${baseUrl}/v1/user/payouts-logs?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }
  
  
    if (downloadexcl==true) {
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download",` ${decoded.corpID}_${searchdate_start} - ${searchdate_end}_payout_transaction_report.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return; 
    }
  
  
    const data = await res.json();
    dispatch({ type: "GETALL_PAYOUTLOG_DATA", payload: data });
    
  } catch (error) {

    console.error("something wet worng");
    alert("something wet worng")
    
  }
 
};







export const getall_bulkpay_data = () => async (dispatch) => {


try {
  
} catch (error) {
  
}


  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/bulk-pay`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "GETALL_BULKPAY_DATA", payload: data });
};

export const getall_wallet_company_data = () => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/wallet-company`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "GETALL_WALLET_COMPANY_DATA", payload: data });
  
};
export const collection_report = (date) => async (dispatch) => {

 


  const params =new URLSearchParams();
  if (date) params.append("filter_type",date);

  


  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/col-transactions-report?${params.toString}
    `,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "COLLECTION_REPORT", payload: data })


  
};


export const getone_user = () => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/get-details`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "GETONE_USER", payload: data });
};

///summary report ///


export const summaryreport = (date) => async (dispatch) => {

  

  const params = new URLSearchParams();
  if (date) params.append("filter_type",date);


  
 const token = localStorage.getItem("token") || {};
 const res = await fetch(
   `${baseUrl}/v1/user/summary-report?${params.toString()}`,
   {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   }
 );

 if (res.status === 401) {
   localStorage.removeItem("token");
   window.location.href = "/";
   return;
 }

 const data = await res.json();
 dispatch({ type: "SUMMARY", payload: data });
};













export const Payout_report = (date) => async (dispatch) => {

  

   const params = new URLSearchParams();
   if (date) params.append("filter_type",date);

 
   
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/payouts-report?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "PAYOUT_REPORT", payload: data });
};


export const get_collections = (searchtr,trstatus,searchdate_start,searchdate_end,downloadexcl=false,page,pagelimit) => async (dispatch) => {

 

 


  const token = localStorage.getItem("token") || {};
  const decoded = jwtDecode(token);

  const params = new URLSearchParams();
if (searchtr) params.append("search", searchtr);
if (trstatus) params.append("status", trstatus);
if (searchdate_start) params.append("start_date", searchdate_start);
if (searchdate_end) params.append("end_date", searchdate_end);
if(downloadexcl) params.append("download", "excel");
if (page) params.append("page", page);
if (pagelimit) params.append("limit", pagelimit);


const res = await fetch(
  `${baseUrl}/v1/user/col-transactions?${params.toString()}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);

if (res.status === 401) {
  localStorage.removeItem("token");
  window.location.href = "/";
  return;
}


if (downloadexcl==true) {
  const blob = await res.blob();
  const fileURL = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = fileURL;
  link.setAttribute("download", `${decoded.corpID}_${searchdate_start}-${searchdate_end}_collection_transactions_report.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  return; 
}
  const data = await res.json();
  dispatch({ type: "GETCOLLECTIONS", payload: data });
};



///entity callback get///


export const getentitycallbackevent = () => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/entity-callback`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "GETENTITY_CALLBACK", payload: data });
};

///ent callback add///

export const addentitycallbackevent = (entdata) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/entity-callback`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(entdata)
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===201) {
    alert("entity creation sucess")
    
  } else{
    alert("not created")
  }


 


  const data = await res.json();
  dispatch({ type: "ADDENTITY_CALLBACK", payload: data });
};


///ent callback delete///////


export const deleteentitycallbackevent = (corpid,eventname,entstatus) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/entity-callback/${encodeURIComponent(corpid)}/${encodeURIComponent(eventname)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===200) {
    alert("entity hasbeen deleted")


  const res = await fetch(
    `${baseUrl}/v1/user/entity-callback`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "GETENTITY_CALLBACK", payload: data });
    
    
  }

  const data = await res.json();
  
  dispatch({ type: "DELETEENTITY_CALLBACK", payload: data });
};

///ent callback update//////
export const updateeteentitycallbackevent = (upentdata,corpid,eventname,status) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/entity-callback/${encodeURIComponent(corpid)}/${encodeURIComponent(eventname)}/${encodeURIComponent(status)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(upentdata)
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  if (res.status===200) {
    alert("entity hasbeen updated")
    
  }
 

  const data = await res.json();
  dispatch({ type: "UPDATEENTITY_CALLBACK", payload: data });
};
export const forgotpassword = (uppassword,navigate, setLoad,setError) => async (dispatch) => {


  if (window.confirm("Are you sure you want to update your password")) {

    setLoad(true)

 
    const res = await fetch(
      `${baseUrl}/v1/user/forgot-password/reset`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        
        },
        body:JSON.stringify({newPassword:uppassword})
      }
    );
  
   
  
    if (res.status===200) {
      alert("password hasbeen updated")
     
      navigate("/");
      setLoad(false)

      
    } if (res.status===400) {
      
      setLoad(false)
      setError("verified email not found")
    }
  
    const data = await res.json();
    dispatch({ type: "FORGOT_PASSWORD", payload: data });
  }

 
};
export const get_vertualaccountdetails = () => async (dispatch) => {

  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/get-va`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  const data = await res.json();
  dispatch({ type: "GETVERTUAL_ACCOUNT", payload: data });
 
};
export const verify_aadhar = (file,setResult) => async (dispatch) => {
  

  const token = localStorage.getItem("token") || {};
  let res;

  try {
    if (file) {
      // Upload Aadhaar file
      const formData = new FormData();
      formData.append("aadhaarFile", file);

      res = await fetch(`${baseUrl}/v1/user/aadhaar/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
        body: formData,
      });
    } 

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await res.json();

    if (res.ok) {
      setResult({aadhaar: "Valid"})
    }

    if (res.status===500) {
      setResult({aadhaar: "invalid"})
    }

    dispatch({ type: "VERIFY_AADHAR", payload: data });
  } catch (err) {
    console.error("Verification error:", err);
  }
};






///vartual Acount data////

export const getall_virtual_account_txn =
  (searchtr, trstatus,searchdate_start,searchdate_end,downloadexcl=false,page,pagelimit) => async (dispatch) => {



 

    const token = localStorage.getItem("token") || {};
    const decoded = jwtDecode(token);
    const params = new URLSearchParams();
  if (searchtr) params.append("search", searchtr);
  if (trstatus) params.append("status", trstatus);
  if (searchdate_start) params.append("start_date", searchdate_start);
  if (searchdate_end) params.append("end_date", searchdate_end);
  if(downloadexcl) params.append("download", "excel");
  if (page) params.append("page", page);
  if (pagelimit) params.append("limit", pagelimit);


  const res = await fetch(
    `${baseUrl}/v1/user/customer/master?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }


  if (downloadexcl==true) {
    const blob = await res.blob();
    const fileURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `${decoded.corpID}_${searchdate_start}_${searchdate_end}_Virtual Account.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    return; 
  }
    const data = await res.json();
    dispatch({ type: "GETALL_VIRTUAL_ACCOUNT_TXN", payload: data });
  };