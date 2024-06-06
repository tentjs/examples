import { tags, type Component } from "@tentjs/tent";

const { p } = tags;

const Example1: Component = {
  view: () => p("Hello, World!"),
};

const Example2: Component = {
  view: () => p("Hello, World! #2"),
};

const Example3: Component = {
  view: () => p("Hello, World! #3"),
};

export { Example1, Example2, Example3 };
