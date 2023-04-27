import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type SettingsRowProps = PropsWithChildren & {
  title: string;
};

const SettingsRow: FC<SettingsRowProps> = ({ title, children }) => (
  <div className={styles.row}>
    <div className={styles.title}>{title}</div>
    <div className={styles.item}>{children}</div>
  </div>
);

export { SettingsRow };
