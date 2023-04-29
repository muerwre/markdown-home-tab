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
  h1Color: "#f66151",
  h2Color: "#ffbe6f",
  h3Color: "#f9f06b",
  h4Color: "#8ff0a4",
  h5Color: "#99c1f1",
};

export const defaultLightTheme: ColorSettings = {
  backgroundColor: "#deddda",
  textColor: "#2e2e2e",
  linkColor: "#1c71d8",
  codeColor: "#ff3344",
  h1Color: "#6b5554",
  h2Color: "#4f403f",
  h3Color: "#3d302f",
  h4Color: "#2e2625",
  h5Color: "#2c2322",
};
