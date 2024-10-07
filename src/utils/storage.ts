export const hasBrowserStorage = () =>
  typeof browser !== "undefined" && browser?.storage;

export const hasChromeStorage = () =>
  typeof chrome !== "undefined" && chrome?.storage;
