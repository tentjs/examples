import { type Component, tags } from "@tentjs/tent";

const { p } = tags;

const Example: Component = {
  view: () => p("Hello, World!"),
};

export { Example };
