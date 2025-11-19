import { React, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protectedroute = () => {
  const [authenticated, setAuthenticated] = useState(true);

  async function fetchData() {
    const token = localStorage.getItem("token");

    

    ("192.168.1.43");


  

    const res = await fetch("https://acs.busybox.in/v1/user/check-auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    
    if (res.status === 401) {
      setAuthenticated(false);
      localStorage.removeItem("token");
      return;
    }
  }

  useEffect(() => {
    fetchData();
  }, [authenticated]);

  return <div>{authenticated ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default Protectedroute;
