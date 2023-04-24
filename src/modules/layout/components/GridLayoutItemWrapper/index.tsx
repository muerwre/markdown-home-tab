import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type GridLayoutItemWrapperProps = PropsWithChildren & {
  splitVertical: () => void;
  splitHorizontal: () => void;
  remove: () => void;
};

const GridLayoutItemWrapper: FC<GridLayoutItemWrapperProps> = ({
  children,
  splitVertical,
  splitHorizontal,
  remove,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.menu}>
      <button onClick={splitVertical} role="button">
        v
      </button>
      <button onClick={splitHorizontal} role="button">
        h
      </button>
      <button onClick={remove} role="button">
        d
      </button>
    </div>

    {children}
  </div>
);

export { GridLayoutItemWrapper };
