import { useEffect, useState } from "react";

const safelyGetStringValue = (key: string) => {
  try {
    return localStorage.getItem(key) ?? "";
  } catch (error) {
    console.warn(error);
    return "";
  }
};
const safelySetStringValue = (key: string, value: string) => {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {
    console.warn(error);
  }
};

export const usePersistedValue = (
  id: string,
  prefix: string
): [string, (val: string) => void] => {
  const key = `${prefix}${id}`;
  const [value, setValue] = useState(safelyGetStringValue(key));

  useEffect(() => {
    setValue(safelyGetStringValue(key));
  }, [id, key]);

  useEffect(() => {
    safelySetStringValue(key, value);
  }, [key, value]);

  return [value, setValue];
};
