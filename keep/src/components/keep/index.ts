import { type Component, tags } from "@tentjs/tent";
import { keep } from "@tentjs/helpers";

const { div, p, button } = tags;

type State = { count: number };

const Keep: Component<State> = {
  state: { count: 0 },
  view({ state }) {
    return div([
      p(`Count: ${state.count}`),
      keep([
        p(`Count: ${state.count}`),
        button("Increment", { onclick: () => state.count++ }),
      ]),
    ]);
  },
};

export { Keep };
