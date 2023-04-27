import { ColorSettings } from "~/modules/settings/context/SettingsContext";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export const defaultDarkTheme: ColorSettings = {
  backgroundColor: "#2e2e2e",
  textColor: "#eeeeee",
  linkColor: "#25bfe6",
  codeColor: "#ff3344",
};

export const defaultLightTheme: ColorSettings = {
  backgroundColor: "#eeeeee",
  textColor: "#2e2e2e",
  linkColor: "#25bfe6",
  codeColor: "#ff3344",
};
