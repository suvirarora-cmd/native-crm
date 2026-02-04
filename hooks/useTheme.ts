import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { THEME_MESSAGES } from "@/common/constants";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(THEME_MESSAGES.THEME_CONTEXT_ERROR);
  }
  return context;
};
