import { SerializedDockview } from "dockview";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";
import { hasBrowserStorage, hasChromeStorage } from "~/utils/storage";

interface Result {
  layout: SerializedDockview;
  panels: Record<string, string>;
  settings: Partial<SettingsValue>;
}

const layoutKey = "dockview_persistance_layout";
const settingsKey = "settings";
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

  const settings =
    typeof result[settingsKey] === "object" &&
    Object.keys(result[settingsKey]).length
      ? result[settingsKey]
      : {};

  return {
    layout,
    panels,
    settings,
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

  const settings =
    typeof result[settingsKey] === "object" &&
    Object.keys(result[settingsKey]).length
      ? result[settingsKey]
      : {};

  return {
    layout,
    panels,
    settings,
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

  const rawSettings = localStorage.getItem(settingsKey);
  const parsedSettings =
    rawSettings && (JSON.parse(rawSettings) as Partial<SettingsValue>);
  const settings =
    parsedSettings &&
    typeof parsedSettings === "object" &&
    Object.keys(parsedSettings).length
      ? parsedSettings
      : {};

  return {
    layout,
    panels,
    settings,
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

export const storeSettingsLocally = (settings: Partial<SettingsValue>) =>
  localStorage.setItem(settingsKey, JSON.stringify(settings));

export const storeSettingsInSync = (settings: Partial<SettingsValue>) => {
  if (hasBrowserStorage()) {
    return browser.storage.sync.set({ [settingsKey]: settings });
  }

  if (hasChromeStorage()) {
    return chrome.storage.sync.set({ [settingsKey]: settings });
  }
};
