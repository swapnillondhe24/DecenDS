// UserContext.js
import { createContext } from "react";

const UserContext = createContext({
  userPassword: "",
  setUserPassword: () => {},
});

export default UserContext;
