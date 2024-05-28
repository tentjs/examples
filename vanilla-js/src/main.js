import { mount, tags } from "@tentjs/tent";

const { p } = tags;

mount(document.querySelector(".target"), {
  state: { count: 0 },
  view: ({ state }) => p(`Count: ${state.count}`),
  mounted: ({ state }) => {
    state.count = 10;
  },
});
