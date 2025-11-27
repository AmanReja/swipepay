import React from "react";


import {
  Routes,
  Route,
  BrowserRouter,
  Router,
  Outlet,
  useLocation,
} from "react-router-dom";


import { ToastContainer, toast } from "react-toastify";


const App = () => {
 
  return (
    <>
    
    <ToastContainer></ToastContainer>
      <Outlet></Outlet>
   
     
    </>
  );
};

export default App;
