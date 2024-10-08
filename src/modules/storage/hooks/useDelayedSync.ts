import { useCallback, useRef } from "react";
import {
  storeLayoutInSync,
  storePanelInSync,
  storeSettingsInSync,
} from "~/utils/hydrate";
import { DebouncedFunc } from "lodash";
import { SerializedDockview } from "dockview";
import debounce from "lodash.debounce";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";

export const useDelayedSync = (debounceDelay: number) => {
  const layoutTimer = useRef<DebouncedFunc<typeof storeLayoutInSync>>();
  const settingsTimer = useRef<DebouncedFunc<typeof storeSettingsInSync>>();
  const panelTimers = useRef<
    Record<string, DebouncedFunc<typeof storePanelInSync>>
  >({});

  const storeLayout = useCallback(
    (layout: SerializedDockview) => {
      if (layoutTimer.current) {
        layoutTimer.current.cancel();
      }

      layoutTimer.current = debounce(storeLayoutInSync, debounceDelay);
      layoutTimer.current(layout);
    },
    [debounceDelay]
  );

  const storePanel = useCallback(
    (uuid: string, value: string) => {
      if (panelTimers.current[uuid]) {
        panelTimers.current[uuid].cancel();
      }

      panelTimers.current[uuid] = debounce(storePanelInSync, debounceDelay);
      panelTimers.current[uuid](uuid, value);
    },
    [debounceDelay]
  );

  const storeSettings = useCallback(
    (settings: Partial<SettingsValue>) => {
      if (settingsTimer.current) {
        settingsTimer.current.cancel();
      }

      settingsTimer.current = debounce(storeSettingsInSync, debounceDelay);
      settingsTimer.current(settings);
    },
    [debounceDelay]
  );
  return { storeLayout, storePanel, storeSettings };
};
