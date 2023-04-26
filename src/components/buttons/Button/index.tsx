import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "solid" | "outline";
  size?: "normal" | "small";
}

const Button: FC<ButtonProps> = ({
  variant = "solid",
  size = "normal",
  className,
  ...rest
}) => (
  <button
    className={classNames(
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      className
    )}
    {...rest}
  />
);

export { Button };
