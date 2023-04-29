import { createContext, useContext } from "react";

export interface ColorSettings {
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  codeColor: string;
  h1Color?: string;
  h2Color?: string;
  h3Color?: string;
  h4Color?: string;
  h5Color?: string;
}

export type SettingsValue = ColorSettings & {
  richEditorEnabled: boolean;
};

export const defaultSettings: SettingsValue = {
  richEditorEnabled: false,
  backgroundColor: "",
  textColor: "",
  linkColor: "",
  codeColor: "",
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update: (_: Partial<SettingsValue>) => {},
  show: () => {},
  hide: () => {},
});

export const useSettings = () => useContext(SettingsContext);
