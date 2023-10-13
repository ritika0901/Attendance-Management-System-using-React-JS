import React, { useState } from "react";
  
export const Context = React.createContext();


export const ContextProvider = ({ children }) => {
    const [login, setLogin] = useState("");
  
    return (
        <Context.Provider value={{login, setLogin}}>
            {children}
        </Context.Provider>
    );
};