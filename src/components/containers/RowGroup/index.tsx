import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface RowGroupProps {
  children: ReactNode[];
}

const RowGroup: FC<RowGroupProps> = ({ children }) => (
  <div className={styles.group}>
    {children.map((item, key) => (
      <div key={key} className={styles.row}>
        {item}
      </div>
    ))}
  </div>
);

export { RowGroup };
