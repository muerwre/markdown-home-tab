import { SerializedDockview } from "dockview";
import { SettingsValue } from "~/modules/settings/context/SettingsContext";
import { hasBrowserStorage } from "~/utils/storage";
import { joinTextFromChunks, makeChunks } from "./chunks";

interface Result {
  layout: SerializedDockview;
  panels: Record<string, string>;
  settings: Partial<SettingsValue>;
}

export const layoutKey = "dockview_persistance_layout";
export const settingsKey = "settings";
const panelPrefix = "MarkdownEditorContainerMarkdownEditorContainer";

const reservedKeys = [layoutKey, settingsKey];

// that's a limitation of firefox and chrome
export const chunkSize = 8192 - 96;
export const makePanelKey = (uuid: string) => `${panelPrefix}${uuid}`;
export const makePanelChunkKey = (uuid: string) => (index: number) =>
  index === 0 ? makePanelKey(uuid) : `${makePanelKey(uuid)}_${index}`;

const getFromBrowserStorage = async (): Promise<Result | null> => {
  const result = await browser.storage.sync.get();
  const layout = result[layoutKey] as SerializedDockview | undefined;

  if (!layout) {
    return null;
  }

  const panels = Object.keys(layout.panels).reduce(
    (acc, uuid) => ({
      ...acc,
      [uuid]: joinTextFromChunks(makePanelChunkKey(uuid), result) ?? "",
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

  return null;
};

export const storeLayoutLocally = (layout: SerializedDockview) =>
  localStorage.setItem(layoutKey, JSON.stringify(layout));

export const storeLayoutInSync = async (layout: SerializedDockview) => {
  if (!hasBrowserStorage()) {
    return;
  }

  await browser.storage.sync.set({ [layoutKey]: layout });

  const currentKeys = Object.keys(await browser.storage.sync.get());
  const obsoleteKeys = currentKeys.filter(
    (key) =>
      !reservedKeys.includes(key) &&
      !Object.keys(layout.panels).some((panel) =>
        key.startsWith(makePanelKey(panel))
      )
  );

  if (obsoleteKeys.length) {
    await browser.storage.sync.remove(obsoleteKeys);
  }
};

export const storePanelLocally = (uuid: string, value: string) =>
  localStorage.setItem(`${panelPrefix}${uuid}`, value);

export const storePanelInSync = async (
  uuid: string,
  value: string,
  splitSize = chunkSize
) => {
  if (!hasBrowserStorage()) {
    return;
  }

  const chunks = makeChunks(value, makePanelChunkKey(uuid), splitSize);

  if (!Object.keys(chunks).length) {
    return;
  }

  console.log(
    Object.entries(chunks).map(([key, value]) => new Blob([key + value]).size)
  );

  await browser.storage.sync.set(chunks);

  const currentPanelChunks = Object.keys(
    await browser.storage.sync.get()
  ).filter((chunk) => chunk.startsWith(makePanelKey(uuid)));

  const unusedPanelChunks = currentPanelChunks.filter(
    (chunk) => !Object.keys(chunks).includes(chunk)
  );

  if (!unusedPanelChunks.length) {
    return;
  }

  await browser.storage.sync.remove(unusedPanelChunks);
};

export const storeSettingsLocally = (settings: Partial<SettingsValue>) =>
  localStorage.setItem(settingsKey, JSON.stringify(settings));

export const storeSettingsInSync = (settings: Partial<SettingsValue>) => {
  if (!hasBrowserStorage()) {
    return;
  }
  return browser.storage.sync.set({ [settingsKey]: settings });
};
