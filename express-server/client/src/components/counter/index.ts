import { Component, tags } from "@tentjs/tent";

const { button } = tags;

type State = { count: number };

const Counter: Component<State> = {
  state: { count: 0 },
  view: ({ state }) =>
    button(`Count: ${state.count}`, {
      onclick: () => state.count++,
    }),
};

export { Counter };
