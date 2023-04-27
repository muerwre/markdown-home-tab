import { FC } from "react";
import { ColorSettings } from "../ColorSettings";
import styles from "./styles.module.scss";

const SettingsContainer: FC = () => {
  return (
    <div className={styles.container}>
      <ColorSettings />
    </div>
  );
};

export { SettingsContainer };
