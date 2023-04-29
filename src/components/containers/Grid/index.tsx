import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type VerticalListProps = PropsWithChildren & {
  direction?: "row" | "column";
};

const Grid: FC<VerticalListProps> = ({ children, direction = "column" }) => (
  <div className={classNames(styles.list, styles[direction])}>{children}</div>
);

export { Grid };
