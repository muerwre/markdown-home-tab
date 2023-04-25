import classNames from "classnames";
import { FC } from "react";

import styles from "./styles.module.scss";

type IconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const IconButton: FC<IconButtonProps> = ({ children, className, ...props }) => (
  <button {...props} className={classNames(styles.button, className)}>
    {children}
  </button>
);

export { IconButton };
