import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ThemeContext, defaultTheme } from "../../context/ThemeContext";
import { useSettings } from "~/modules/settings/context/SettingsContext";
import { useThemeColors } from "../../hooks/useThemeColors";

type ThemeProviderProps = PropsWithChildren;

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { settings } = useSettings();
  const [theme] = useState(defaultTheme);

  useEffect(() => {
    document.body.classList.add(`font-family-${theme.font}`);
    return () => document.body.classList.remove(`font-family-${theme.font}`);
  }, [theme.font]);

  useEffect(() => {
    document.body.classList.add(`theme-${theme.theme}`);
    return () => document.body.classList.remove(`theme-${theme.theme}`);
  }, [theme.theme]);

  useThemeColors(settings);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider };
