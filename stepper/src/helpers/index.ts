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
function ifelse(
  condition: boolean,
  truthy: TentNode | string,
  falsey?: TentNode | string,
) {
  return condition ? truthy : falsey ?? "";
}

/**
 * @description
 * This is a helper function to concatenate classes together. It's
 * useful when you want to conditionally add classes to an element.
 *
 * ```typescript
 * classes("foo", "bar", "baz"); // "foo bar baz"
 * classes("foo", falsey && "bar", "baz"); // "foo baz"
 * classes("foo", truthy && "bar", "baz"); // "foo bar baz"
 * ```
 */
function classes(...args: string[]) {
  return args.filter(Boolean).join(" ");
}

export { ifelse, classes };
