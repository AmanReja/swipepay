import { React, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protectedroute = () => {
  const [authenticated, setAuthenticated] = useState(true);

  async function fetchData() {
    const token = localStorage.getItem("token");
    console.log(token, 22);

    const res = await fetch("http://localhost:3000/v1/user/check-auth", {
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
