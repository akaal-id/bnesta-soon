"use client";

import React from "react";
import styles from "./Button.module.css";

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "menu"
  | "book";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  wide?: boolean;
};

export function Button({ variant = "primary", wide = false, className = "", children, ...rest }: Props) {
  const cls = [
    variant === "primary" ? styles.primaryButton : "",
    variant === "secondary" ? styles.outlineButton : "",
    variant === "tertiary" ? styles.tertiaryButton : "",
    variant === "menu" ? styles.menuButton : "",
    variant === "book" ? styles.bookButton : "",
    variant === "book" && wide ? `${styles.bookButton} ${styles.wide}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export default Button;







