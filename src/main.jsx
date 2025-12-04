import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signin from "./Components/Signin";
import Dashbord from "./Components/Dashbord";


import { Provider } from "react-redux";
import store from "./redux/store";

import Protectedroute from "./Components/Protectedroute.jsx";

import { GoogleOAuthProvider } from '@react-oauth/google';

import { ThemeProvider } from "./Contexts/Theme";
import Einvoices from "./Components/Einvoices";




import Invoices from "./Components/Invoices";
import Sales from "./Components/Sales";
import Purchase from "./Components/Purchase";
import Bills from "./Components/Bills";
import Creditnotes from "./Components/Creditnotes";
import Expenses from "./Components/Expenses";
import Subscriptions from "./Components/Subscriptions";
import Debitnotes from "./Components/Debitnotes";
import Quotations from "./Components/Quotations";
import Salesorders from "./Components/Salesorders";

import Proformainvoices from "./Components/Proformainvoices";
import Deliverychallan from "./Components/Deliverychallan";
import Login from "./Components/Login";


// import.meta.env.VITE_PRODUCTION_URL;
// import.meta.env.VITE_LOCAL_URL;

if(import.meta.env.PROD){
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}





const router = createBrowserRouter(
  createRoutesFromElements(
   
    <Route element={<App />}>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="/otpverification" element={<Otpverification />} />
      <Route path="/resetpassword" element={<Resetpass />} /> */}
      <Route element={<Protectedroute />}>
        <Route path="/dashboard" element={<Dashbord />}>
          
        
       
       
          <Route path="invoices" element={<Invoices />} />
          <Route path="salesorders" element={<Salesorders />} />
          <Route path="proformainvoices" element={<Proformainvoices />} />
          <Route path="deliverychallan" element={<Deliverychallan />} />
          <Route path="debitnotes" element={<Debitnotes />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="einvoices" element={<Einvoices />} />
          <Route path="sales" element={<Sales />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="bills" element={<Bills />} />
          <Route path="creditnotes" element={<Creditnotes />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="subscriptions" element={<Subscriptions />} />
       
     
        
      
      
        
       

   
       
        </Route>
      </Route>
    </Route>
    
    
  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
<ThemeProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>


    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>

    </GoogleOAuthProvider>
    </ThemeProvider>
   
  </StrictMode>
);
