import { FC, PropsWithChildren, useCallback, useState } from "react";
import { Modal } from "~/modules/modal/containers/Modal";
import { SettingsContainer } from "../../containers/SettingsContainer";
import {
  SettingsContext,
  SettingsValue,
  defaultSettings,
} from "../../context/SettingsContext";
import { ModalPage } from "~/modules/modal/components/ModalPage";

const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const show = useCallback(() => setSettingsModalVisible(true), []);
  const hide = useCallback(() => setSettingsModalVisible(false), []);
  const update = useCallback(
    (val: Partial<SettingsValue>) => setSettings((v) => ({ ...v, ...val })),
    []
  );

  return (
    <SettingsContext.Provider value={{ settings, update, show, hide }}>
      {settingsModalVisible && (
        <Modal onClose={hide}>
          <ModalPage onClose={hide}>
            <SettingsContainer />
          </ModalPage>
        </Modal>
      )}

      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider };
