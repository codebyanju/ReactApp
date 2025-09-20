import { createContext } from "react";

const UserContext = createContext({
  loggedinUserName: "Default User",
});

export default UserContext;
