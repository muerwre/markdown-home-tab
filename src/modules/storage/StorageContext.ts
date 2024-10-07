import { createContext, useContext } from "react";
import { SerializedDockview } from "dockview";
import { noop } from "~/utils/noop";

export const StorageContext = createContext({
  layout: null as SerializedDockview | null,
  panels: {} as Record<string, string>,
  hydrated: false,
  setPanel: noop as (uuid: string, content: string) => void,
  setLayout: noop as (layout: SerializedDockview) => void,
});

export const useStorage = () => useContext(StorageContext);
