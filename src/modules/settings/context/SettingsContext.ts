import { createContext, useContext } from "react";

export type SettingsValue = Record<string, never>;
export const defaultSettings: SettingsValue = {};
export const SettingsContext = createContext({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettings: (_: SettingsValue) => {},
  show: () => {},
  hide: () => {},
});
export const useSettings = () => useContext(SettingsContext);
