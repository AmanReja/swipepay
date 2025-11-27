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




import Invoices from "./Components/Invoices";
import Sales from "./Components/Sales";
import Purchase from "./Components/Purchase";


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
      {/* <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="/otpverification" element={<Otpverification />} />
      <Route path="/resetpassword" element={<Resetpass />} /> */}
      <Route element={<Protectedroute />}>
        <Route path="/dashboard" element={<Dashbord />}>
          
        
       
       
          <Route path="invoices" element={<Invoices />} />
          <Route path="sales" element={<Sales />} />
          <Route path="purchase" element={<Purchase />} />
       
     
        
      
      
        
       

   
       
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
