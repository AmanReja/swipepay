
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TitleController() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    
    const routeTitles = {
      "/": "Sign In",
      "/dashboard/summery": "Dashboard",
      "/dashboard/collection": "Collection",
      "/dashboard/report": "Payout",
      "/dashboard/payout": "Payout",
      "/dashboard/ledger": "Ledger",
      "/dashboard/virtualaccount": "Virtual Account",
      "/dashboard/settings": "Settings",
      "/dashboard/settings/accounts": "Accounts",
      "/dashboard/settings/security": "Security",
      "/dashboard/settings/developertooles": "Developer Tools",
      "/dashboard/profile": "Profile",
      "/dashboard/invoice": "Invoice",
      "/dashboard/settlement": "Settlement",
    };

    const defaultTitle = "busybox";
    const pageTitle = routeTitles[path] || "busybox";

    document.title = `${pageTitle} | | ${defaultTitle}`;
  }, [location]);
}
