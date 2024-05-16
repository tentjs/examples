import { TentNode } from "@tentjs/tent";

/**
 * @description
 * This function is a helper to conditionally render a node based on
 * a boolean condition. There is no magic here - it's just a function
 * that wraps the ternary operator.
 *
 * ```typescript
 * ifelse(true, "Hello, world!"); // "Hello, world!"
 * ifelse(false, "Truthy", "Falsey"); // "Falsey"
 * ifelse(false, "Truthy"); // ""
 * ```
 */
const ifelse = (
  condition: boolean,
  truthy: TentNode | string,
  falsey?: TentNode | string,
) => (condition ? truthy : falsey ?? "");

export { ifelse };
