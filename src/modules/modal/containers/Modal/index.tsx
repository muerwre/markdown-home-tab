import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type ModalProps = PropsWithChildren & {
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, onClose }) => (
  <div className={styles.modal}>
    <div className={styles.overlay} onClick={onClose} />
    <div className={styles.content}>
      <div className={styles.page}>{children}</div>
    </div>
  </div>
);
export { Modal };
