import { SerializedDockview } from "dockview";
import { hasBrowserStorage, hasChromeStorage } from "~/utils/storage";

interface Result {
  layout: SerializedDockview;
  panels: Record<string, string>;
}

const layoutKey = "dockview_persistance_layout";
const panelPrefix = "MarkdownEditorContainerMarkdownEditorContainer";

const makePanelKey = (uuid: string) => `${panelPrefix}${uuid}`;

const getFromBrowserStorage = async (): Promise<Result | null> => {
  const result = await browser.storage.sync.get();
  const layout = result[layoutKey] as SerializedDockview | undefined;

  if (!layout) {
    return null;
  }

  const panels = Object.keys(layout.panels).reduce(
    (acc, uuid) => ({
      ...acc,
      [uuid]: (result[makePanelKey(uuid)] as string) ?? "",
    }),
    {} as Record<string, string>
  );

  return {
    layout,
    panels,
  };
};

const getFromChromeStorage = async (): Promise<Result | null> => {
  const result = await chrome.storage.sync.get();
  const layout = result[layoutKey] as SerializedDockview | undefined;

  if (!layout) {
    return null;
  }

  const panels = Object.keys(layout.panels).reduce(
    (acc, uuid) => ({
      ...acc,
      [uuid]: (result[makePanelKey(uuid)] as string) ?? "",
    }),
    {} as Record<string, string>
  );

  return {
    layout,
    panels,
  };
};

const getFromLocalStorage = () => {
  const rawLayout = localStorage.getItem(layoutKey);

  if (!rawLayout) {
    return null;
  }

  const layout = JSON.parse(rawLayout) as SerializedDockview;

  if (!layout.panels) {
    return null;
  }

  const panels = Object.keys(layout.panels).reduce(
    (acc, uuid) => ({
      ...acc,
      [uuid]: localStorage.getItem(makePanelKey(uuid)) ?? "",
    }),
    {} as Record<string, string>
  );

  return {
    layout,
    panels,
  };
};

export const hydrateLayout = async (): Promise<Result | null> => {
  const local = getFromLocalStorage();

  if (local) {
    return local;
  }

  if (hasBrowserStorage()) {
    return getFromBrowserStorage();
  }

  if (hasChromeStorage()) {
    return getFromChromeStorage();
  }

  return null;
};

export const storeLayoutLocally = (layout: SerializedDockview) =>
  localStorage.setItem(layoutKey, JSON.stringify(layout));

export const storeLayoutInSync = (layout: SerializedDockview) => {
  if (hasBrowserStorage()) {
    return browser.storage.sync.set({ [layoutKey]: layout });
  }

  if (hasChromeStorage()) {
    return chrome.storage.sync.set({ [layoutKey]: layout });
  }
};

export const storePanelLocally = (uuid: string, value: string) =>
  localStorage.setItem(`${panelPrefix}${uuid}`, value);

export const storePanelInSync = (uuid: string, value: string) => {
  if (hasBrowserStorage()) {
    return browser.storage.sync.set({ [`${panelPrefix}${uuid}`]: value });
  }

  if (hasChromeStorage()) {
    return chrome.storage.sync.set({ [`${panelPrefix}${uuid}`]: value });
  }
};
