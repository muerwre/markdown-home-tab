import { FC, PropsWithChildren, useCallback, useState } from "react";
import { Modal } from "~/modules/modal/containers/Modal";
import { SettingsContainer } from "../../containers/SettingsContainer";
import {
  SettingsContext,
  SettingsValue,
  defaultSettings,
} from "../../context/SettingsContext";
import { ModalPage } from "~/modules/modal/components/ModalPage";
import { useDetectTheme } from "~/modules/theme/hooks/useDetectTheme";
import {
  Theme,
  defaultDarkTheme,
  defaultLightTheme,
} from "~/modules/theme/constants/theme";
import { Button } from "~/components/buttons/Button";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const theme = useDetectTheme();
  const defaultColors =
    theme === Theme.Dark ? defaultDarkTheme : defaultLightTheme;

  const [settings, setSettings] = useState({
    ...defaultSettings,
    ...defaultColors,
  });
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
