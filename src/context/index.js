import React, { createContext, useContext, useState } from 'react';

export const ExpensesContext = createContext(null);

const ExpensesContextProvider = ({ children }) => {
	const [state, setState] = useState('');
	const [information, setinformation] = useState({});
	const [alert, setAlert] = useState(false);

	return (
		<ExpensesContext.Provider
			value={{ state, setState, information, setinformation, alert, setAlert }}
		>
			{children}
		</ExpensesContext.Provider>
	);
};

export const useExpensesData = () => useContext(ExpensesContext);

export default ExpensesContextProvider;
