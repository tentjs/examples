import { type Component, tags } from "@tentjs/tent";
import { on } from "@tentjs/helpers";
import { type State } from "./types";

const { div, p, ul, li, input, button } = tags;

const TodoList: Component<State> = {
  state: { todos: [], input: "", error: false },
  view: ({ state }) =>
    div([
      input([], {
        placeholder: "Title of the Todo",
        value: state.input,
        oninput: ({ target }) => {
          state.input = target.value;

          if (state.error && state.input !== "") state.error = false;
        },
        /**
         * This is a helper function from the `@tentjs/helpers` package.
         * It is not required, and there is no magic behind it.
         *
         * It is just shorter to write than:
         * ```ts
         * onkeyup: (e) => {
         *   if (e.key === "Enter") {
         *     handleAdd(state);
         *   }
         *   if (e.key === "Escape") {
         *     state.input = "";
         *   }
         * }
         */
        onkeydown: on({
          Enter: () => handleAdd(state),
          Escape: () => (state.input = ""),
        }),
      }),
      button("Add", { onclick: () => handleAdd(state) }),
      viewError(state),
      ul(state.todos.map((todo) => li(todo))),
    ]),
};

function viewError(state: State) {
  if (!state.error) {
    return "";
  }

  if (state.input === "") {
    return p("Title cannot be empty");
  }

  if (state.todos.find((t) => t === state.input)) {
    return p(`"${state.input}" already exists`);
  }

  return "";
}

function handleAdd(state: State) {
  if (state.input === "" || state.todos.find((t) => t === state.input)) {
    state.error = true;

    return;
  }

  state.todos = [...state.todos, state.input];
  state.input = "";
  state.error = false;
}

export { TodoList };
