import React, { useState } from "react";
  
export const sContext = React.createContext();


export const StudContext = ({ children }) => {
    const [rno, setRno] = useState("");
  
    return (
        <sContext.Provider value={{rno, setRno}}>
            {children}
        </sContext.Provider>
    );
};