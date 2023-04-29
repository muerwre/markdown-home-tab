import { ColorSettings } from "~/modules/settings/context/SettingsContext";

export const fillThemeHeadings = (theme: ColorSettings): ColorSettings => ({
  ...theme,
  h1Color: theme.h1Color || theme.textColor,
  h2Color: theme.h2Color || theme.textColor,
  h3Color: theme.h3Color || theme.textColor,
  h4Color: theme.h4Color || theme.textColor,
  h5Color: theme.h5Color || theme.textColor,
});
