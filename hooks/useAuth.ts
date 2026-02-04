import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AUTH_MESSAGES } from "@/common/constants";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(AUTH_MESSAGES.ERRORS.AUTH_CONTEXT_ERROR);
  }
  return context;
};
