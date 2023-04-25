import { createContext, useContext } from "react";
import { Theme } from "../../constants/theme";
import { FontFamily } from "../../constants/fonts";

export const defaultTheme = {
  theme: Theme.Dark,
  font: FontFamily.Inter,
  paddingHorizontal: 16,
  paddingVertical: 16,
};

export const ThemeContext = createContext(defaultTheme);

export const useTheme = () => useContext(ThemeContext);
