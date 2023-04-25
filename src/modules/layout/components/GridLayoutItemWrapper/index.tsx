import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { IconButton } from "~/components/buttons/IconButton";

import DeleteIcon from "~/assets/images/delete.svg";
import SplitVertical from "~/assets/images/split-vertical.svg";
import SplitHorizontal from "~/assets/images/split-horizontal.svg";
import Locked from "~/assets/images/locked.svg";
import Unlocked from "~/assets/images/unlocked.svg";

type GridLayoutItemWrapperProps = PropsWithChildren & {
  splitVertical: () => void;
  splitHorizontal: () => void;
  remove: () => void;
  locked: boolean;
  lock: () => void;
};

const GridLayoutItemWrapper: FC<GridLayoutItemWrapperProps> = ({
  children,
  splitVertical,
  splitHorizontal,
  remove,
  locked,
  lock,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.menu}>
      <IconButton
        onClick={splitVertical}
        role="button"
        className={styles.button}
      >
        <SplitVertical />
      </IconButton>
      <IconButton
        onClick={splitHorizontal}
        role="button"
        className={styles.button}
      >
        <SplitHorizontal />
      </IconButton>

      {!locked && (
        <IconButton onClick={remove} role="button" className={styles.button}>
          <DeleteIcon />
        </IconButton>
      )}

      <IconButton onClick={lock} role="button" className={styles.button}>
        {locked ? <Locked /> : <Unlocked />}
      </IconButton>
    </div>

    {children}
  </div>
);

export { GridLayoutItemWrapper };
