import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [ownerId, setOwnerId] = useState("");

  return (
    <Context.Provider value={{ ownerId, setOwnerId }}>
      {children}
    </Context.Provider>
  );
};
