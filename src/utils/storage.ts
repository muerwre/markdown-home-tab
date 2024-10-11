export const hasBrowserStorage = () =>
  typeof browser !== "undefined" && browser?.storage;
