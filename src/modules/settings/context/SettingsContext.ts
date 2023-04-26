import { createContext, useContext } from "react";

export type SettingsValue = {
  richEditorEnabled: boolean;
};

export const defaultSettings: SettingsValue = { richEditorEnabled: false };

export const SettingsContext = createContext({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettings: (_: SettingsValue) => {},
  show: () => {},
  hide: () => {},
});
export const useSettings = () => useContext(SettingsContext);
