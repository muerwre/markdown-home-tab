import { FC, PropsWithChildren, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/buttons/Button";
import { ModalPage } from "~/modules/modal/components/ModalPage";
import { Modal } from "~/modules/modal/containers/Modal";
import { SettingsContainer } from "../../containers/SettingsContainer";
import { SettingsContext } from "../../context/SettingsContext";
import { useSettings } from "../../hooks/usePersistSettings";
import styles from "./styles.module.scss";

const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  const { settings, update } = useSettings();

  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const show = useCallback(() => setSettingsModalVisible(true), []);
  const hide = useCallback(() => setSettingsModalVisible(false), []);

  return (
    <SettingsContext.Provider value={{ settings, update, show, hide }}>
      {settingsModalVisible && (
        <Modal onClose={hide}>
          <ModalPage onClose={hide} title={t("Settings")}>
            <SettingsContainer />

            <div className={styles.buttons}>
              <div className={styles.filler} />
              <Button onClick={hide}>{t("Ok")}</Button>
              <div className={styles.filler} />
            </div>
          </ModalPage>
        </Modal>
      )}

      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider };
