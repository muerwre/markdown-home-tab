import {
  Theme,
  defaultDarkTheme,
  defaultLightTheme,
} from "~/modules/theme/constants/theme";
import { useDetectTheme } from "~/modules/theme/hooks/useDetectTheme";

export const useDefaultTheme = () => {
  const theme = useDetectTheme();
  return theme === Theme.Dark ? defaultDarkTheme : defaultLightTheme;
};
