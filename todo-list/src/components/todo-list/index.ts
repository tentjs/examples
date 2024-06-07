import { classes, on } from "@tentjs/helpers";
import { tags, type Component } from "@tentjs/tent";
import { Button, Card, Input } from "@tentjs/ui";
import * as styles from "./styles.module.css";
import type { State } from "./types";

const { div, p } = tags;

const TodoList: Component<State> = {
  state: { todos: [], input: "", error: false },
  view: ({ state }) =>
    div([
      div(
        [
          Input("text", {
            className: styles.input,
            placeholder: "Title of the to-do",
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
          Button("Add", () => handleAdd(state), {
            variant: "secondary",
            className: styles.button,
          }),
        ],
        { className: styles.container },
      ),
      viewError(state),
      div(
        state.todos.map((todo, idx) =>
          Card(todo.title, {
            className: classes(styles.card, todo.completed && styles.done),
            onclick: () => {
              const todo = state.todos[idx];
              todo.completed = !todo.completed;
            },
          }),
        ),
      ),
    ]),
};

function viewError(state: State) {
  if (!state.error) {
    return "";
  }

  if (state.input === "") {
    return p("Title cannot be empty");
  }

  if (state.todos.find((t) => t.title === state.input)) {
    return p(`"${state.input}" already exists`);
  }

  return "";
}

function handleAdd(state: State) {
  if (state.input === "" || state.todos.find((t) => t.title === state.input)) {
    state.error = true;

    return;
  }

  state.todos = [...state.todos, { title: state.input, completed: false }];
  state.input = "";
  state.error = false;
}

export { TodoList };
