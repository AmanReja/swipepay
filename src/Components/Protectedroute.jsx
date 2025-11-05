import { React, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protectedroute = () => {
  const [authenticated, setAuthenticated] = useState(true);

  async function fetchData() {
    const token = localStorage.getItem("token");

    

    ("192.168.1.43");

<<<<<<< HEAD
  

    const res = await fetch("http://192.168.1.45:3000/v1/user/check-auth", {
=======
    const res = await fetch("https://acs.busybox.in/v1/user/check-auth", {
>>>>>>> 25730d9c4e796777162ea8172b3464db3deb7773
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
