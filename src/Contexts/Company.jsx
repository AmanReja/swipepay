import { createContext, useEffect, useState } from "react";

export const Company = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(() => {
    const saved = localStorage.getItem("selectedCompany");
    return saved ? JSON.parse(saved) : null;
  });

  // 🔹 persist to localStorage
  useEffect(() => {
    if (company) {
      localStorage.setItem("selectedCompany", JSON.stringify(company));
    }
  }, [company]);

  return (
    <Company.Provider value={{ company, setCompany }}>
      {children}
    </Company.Provider>
  );
};
