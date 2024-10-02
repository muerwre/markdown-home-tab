import { useEffect, useMemo, useState } from "react";
import { BrowserSyncStorage } from '~/utils/index';

export const usePersistedValue = (
  id: string,
  prefix: string
) => {
  const [hydrated, setHydrated] = useState(false);
  const storage = useMemo(() => new BrowserSyncStorage(prefix), [prefix]);
  const key = `${prefix}${id}`;
  const [value, setValue] = useState('');

  useEffect(() => {
    storage.get<string>(key).then(val => setValue(val ?? '')).finally(() => setHydrated(true));
  }, [key, storage]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    storage.set(key, value);
  }, [key, value, storage, hydrated]);

  return { value, setValue, hydrated };
};
