import { type Component, tags } from "@tentjs/tent";

const { ul, li } = tags;

type Todo = { userId: number; id: number; title: string; completed: boolean };
type Attrs = { todos: string };

const AsyncMount: Component<{}, Attrs> = {
  view: ({ el }) => {
    // Parse the JSON string into an array of `Todo`
    const todos: Todo[] = JSON.parse(el.dataset.todos);

    return ul(todos.map((todo) => li(todo.title)));
  },
  // It is optional to remove the `data-todos` attribute.
  // But, if the attribute contains a lot of data, it is recommended to remove it.
  mounted: ({ el }) => el.removeAttribute("data-todos"),
};

export { AsyncMount };
