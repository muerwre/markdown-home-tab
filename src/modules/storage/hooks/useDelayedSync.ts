import { useCallback, useRef } from "react";
import { storeLayoutInSync, storePanelInSync } from "~/utils/hydrate";
import { DebouncedFunc } from "lodash";
import { SerializedDockview } from "dockview";
import debounce from "lodash.debounce";

export const useDelayedSync = (debounceDelay: number) => {
  const layoutTimer = useRef<DebouncedFunc<typeof storeLayoutInSync>>();
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

  return { storeLayout, storePanel };
};
