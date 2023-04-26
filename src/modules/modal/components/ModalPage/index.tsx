import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface ModalPageProps extends PropsWithChildren {
  onClose: () => void;
}

const ModalPage: FC<ModalPageProps> = ({ children }) => (
  <div className={styles.page}>{children}</div>
);

export { ModalPage };
