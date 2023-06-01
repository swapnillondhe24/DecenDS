// PasswordContext.js
import React, { createContext, useState } from "react";

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState("");

  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <PasswordContext.Provider value={{ password, updatePassword }}>
      {children}
    </PasswordContext.Provider>
  );
};
