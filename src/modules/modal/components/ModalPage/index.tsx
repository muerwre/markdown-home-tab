import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { IconButton } from "~/components/buttons/IconButton";

interface ModalPageProps extends PropsWithChildren {
  title?: string;
  onClose: () => void;
}

const ModalPage: FC<ModalPageProps> = ({ children, title, onClose }) => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.close}>
        <IconButton onClick={onClose} role="button">
          x
        </IconButton>
      </div>
    </div>

    {children}
  </div>
);

export { ModalPage };
