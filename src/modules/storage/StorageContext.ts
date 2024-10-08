import { createContext, useContext } from "react";
import { SerializedDockview } from "dockview";
import { noop } from "~/utils/noop";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";

export const StorageContext = createContext({
  layout: null as SerializedDockview | null,
  panels: {} as Record<string, string>,
  settings: {} as Partial<SettingsValue>,
  hydrated: false,
  setPanel: noop as (uuid: string, content: string) => void,
  setLayout: noop as (layout: SerializedDockview) => void,
  setSettings: noop as (layout: Partial<SettingsValue>) => void,
});

export const useStorage = () => useContext(StorageContext);
