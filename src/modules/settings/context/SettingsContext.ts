import { createContext, useContext } from "react";
import { noop } from "~/utils/noop";

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
  update: noop as (value: Partial<SettingsValue>) => void,
  show: noop,
  hide: noop,
});

export const useSettings = () => useContext(SettingsContext);
