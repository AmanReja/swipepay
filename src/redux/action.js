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

const baseUrl = "http://192.168.1.43:3000";

export const getall_ledgerwallet_data =
  (searchtr, trstatus,searchdate_start,searchdate_end,downloadexcl=false) => async (dispatch) => {
    const token = localStorage.getItem("token") || {};
    const params = new URLSearchParams();
  if (searchtr) params.append("search", searchtr);
  if (trstatus) params.append("status", trstatus);
  if (searchdate_start) params.append("start_date", searchdate_start);
  if (searchdate_end) params.append("end_date", searchdate_end);
  if(downloadexcl) params.append("download", "excel");


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
    link.setAttribute("download", "payout_logs.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return; 
  }
    const data = await res.json();
    dispatch({ type: "GETALL_LEDGER_WALLET", payload: data });
  };

export const getall_payoutlog_data = (searchtr,trstatus,searchdate_start,searchdate_end,downloadexcl=false) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};

  const params = new URLSearchParams();
  if (searchtr) params.append("search", searchtr);
  if (trstatus) params.append("status", trstatus);
  if (searchdate_start) params.append("start_date", searchdate_start);
  if (searchdate_end) params.append("end_date", searchdate_end);
  if(downloadexcl) params.append("download", "excel");


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
    link.setAttribute("download", "payout_logs.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return; 
  }


  const data = await res.json();
  dispatch({ type: "GETALL_PAYOUTLOG_DATA", payload: data });
};
export const getall_bulkpay_data = () => async (dispatch) => {
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


export const Payout_report = () => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/payouts-report`,
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


export const get_collections = () => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/col-transactions`,
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


export const deleteentitycallbackevent = (corpid,eventname) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};
  const res = await fetch(
    `${baseUrl}/v1/user/entity-callback/${encodeURIComponent(corpid)}/${encodeURIComponent(eventname)}`,
    {
      method: "DELETE",
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
export const forgotpassword = (uppassword) => async (dispatch) => {

  if (window.confirm("Are you sure you want to update your password")) {

    const token = localStorage.getItem("token") || {};
    const res = await fetch(
      `${baseUrl}/v1/user/forgot-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(uppassword)
      }
    );
  
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }
  
    if (res.status===200) {
      alert("password hasbeen updated")
      localStorage.removeItem("token")
      window.location.href = "/";
      
    }
  
    const data = await res.json();
    dispatch({ type: "FORGOT_PASSWORD", payload: data });
  }

 
};

///ent pass update///