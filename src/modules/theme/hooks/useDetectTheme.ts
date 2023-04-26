import { useEffect, useState } from "react";
import { Theme } from "../constants/theme";

const isDark = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const useDetectTheme = () => {
  const [theme, setTheme] = useState(isDark() ? Theme.Dark : Theme.Light);

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? Theme.Dark : Theme.Light);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
  }, []);

  return theme;
};
