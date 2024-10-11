import React, { createContext, useState } from "react";

// Create the context
export const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
