import { jwtDecode } from "jwt-decode";

export const LOGIN = "LOGIN";
export const GLOGIN = "GLOGIN";
export const SENDOTP = "SENDOTP";
export const VERIFY_OTP = "VERIFY_OTP";






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
      alert("otp sended")
      setIsotpsended(true)

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

    if (res.status === 200) {
      alert("otp verified");
      setLoad(false);

      navigate("/dashboard/sales");
    } else {
      setLoad(false);
    
    }
    // dispatch({ type: "VERIFY_OTP", payload: data });
  };

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
    navigate("/dashboard/sales");
    localStorage.setItem("showLoginToast", "true");

    dispatch({ type: "LOGIN", payload: data });
  } catch (error) {
    console.error("Login Error:", error);
    setWrong(true);
    alert("Something went wrong! Please try again later.");
  }
};
