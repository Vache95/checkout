import React, { createContext, useState, useContext } from "react";

export const ExpensesContext = createContext(null);

const ExpensesContextProvider = ({ children }) => {
  const [state, setState] = useState("");
  const [information, setinformation] = useState({});

  return <ExpensesContext.Provider value={{ state, setState, information, setinformation }}>{children}</ExpensesContext.Provider>;
};

export const useExpensesData = () => useContext(ExpensesContext);

export default ExpensesContextProvider;
