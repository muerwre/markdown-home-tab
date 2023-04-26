import { FC, PropsWithChildren, useCallback, useState } from "react";
import { Modal } from "~/modules/modal/containers/Modal";
import { SettingsContainer } from "../../containers/SettingsContainer";
import {
  SettingsContext,
  defaultSettings,
} from "../../context/SettingsContext";

const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const show = useCallback(() => setSettingsModalVisible(true), []);
  const hide = useCallback(() => setSettingsModalVisible(false), []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, show, hide }}>
      {settingsModalVisible && (
        <Modal onClose={hide}>
          <SettingsContainer />
        </Modal>
      )}

      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider };
