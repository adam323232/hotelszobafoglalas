import { useState, createContext, useEffect } from "react";

export const DropDownContext = createContext();

const ContextProvider = ({ children }) => {
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    const storedExtras = JSON.parse(localStorage.getItem("extrak")) || [];
    setExtras(storedExtras);
  }, []);

  useEffect(() => {
    localStorage.setItem("extrak", JSON.stringify(extras));
  }, [extras]);

  return (
    <DropDownContext.Provider value={{ extras, setExtras }}>
      {children}
    </DropDownContext.Provider>
  );
};

export default ContextProvider;