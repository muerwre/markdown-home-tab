import { hasBrowserStorage, hasChromeStorage } from "./storage";

export class BrowserSyncStorage {
  constructor(private globalPrefix = "") {}

  get engine() {
    if (hasBrowserStorage()) {
      return "browser";
    } else if (hasChromeStorage()) {
      return "chrome";
    }

    return "local";
  }

  makeKey = (key: string) => `${this.globalPrefix}${key}`;

  set = async <T>(key: string, value: T) => {
    switch (this.engine) {
      case "browser":
        await browser.storage.sync.set({ [this.makeKey(key)]: value });
        return;
      case "chrome":
        await chrome.storage.sync.set({ [this.makeKey(key)]: value });
        return;
      default:
        localStorage.setItem(this.makeKey(key), JSON.stringify(value));
        return;
    }
  };

  get = async <T>(key: string): Promise<T | undefined> => {
    if (this.engine === "browser") {
      const value = await browser.storage.sync
        .get([this.makeKey(key)])
        .then((result) => result[this.makeKey(key)] as T | undefined);

      if (value) {
        return value;
      }
    } else if (this.engine === "chrome") {
      const value = await chrome.storage.sync
        .get(this.makeKey(key))
        .then((result) => result[this.makeKey(key)] as T | undefined);

      if (value) {
        return value;
      }
    }

    try {
      const value = localStorage.getItem(this.makeKey(key));
      return value ? (JSON.parse(value) as T) : undefined;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };
}
