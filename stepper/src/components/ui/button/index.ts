import { tags } from "@tentjs/tent";
import * as styles from "./button.module.css";

function button(
  text: string,
  onclick: () => void,
  attrs?: Record<string, unknown>,
) {
  const { className, ...rest } = attrs || {};
  const cn = `${styles.button} ${className || ""}`;

  return tags.button(text, { onclick, className: cn, ...rest });
}

export { button };
