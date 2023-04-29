import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type SettingsRowProps = PropsWithChildren & {
  title: string;
  subTitle?: string;
};

const SettingsRow: FC<SettingsRowProps> = ({ title, children, subTitle }) => (
  <div className={styles.row}>
    <div className={styles.legend}>
      <div className={styles.title}>{title}</div>
      {!!subTitle && (
        <div
          className={styles.subTitle}
          dangerouslySetInnerHTML={{ __html: subTitle }}
        />
      )}
    </div>
    <div className={styles.item}>{children}</div>
  </div>
);

export { SettingsRow };
