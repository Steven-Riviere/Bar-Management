import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export function useAuthContext() {
  return useContext(AuthContext);
}