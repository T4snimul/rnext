import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  useDebugValue("auth", (auth) =>
    auth?.user ? "User Logged In" : "User not Logged In",
  );

  return useContext(AuthContext);
};
