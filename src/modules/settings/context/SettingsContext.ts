import { createContext, useContext } from "react";

export type SettingsValue = {
  richEditorEnabled: boolean;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
};

export const defaultSettings: SettingsValue = {
  richEditorEnabled: false,
  backgroundColor: "",
  textColor: "",
  linkColor: "",
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update: (_: Partial<SettingsValue>) => {},
  show: () => {},
  hide: () => {},
});

export const useSettings = () => useContext(SettingsContext);
