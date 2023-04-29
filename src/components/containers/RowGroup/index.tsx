import { FC, ReactNode, useMemo } from "react";
import styles from "./styles.module.scss";

interface RowGroupProps {
  children: ReactNode | ReactNode[];
}

const RowGroup: FC<RowGroupProps> = ({ children }) => {
  const items = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  return (
    <div className={styles.group}>
      {items.map((item, key) => (
        <div key={key} className={styles.row}>
          {item}
        </div>
      ))}
    </div>
  );
};

export { RowGroup };
