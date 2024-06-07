type State = {
  todos: Todo[];
  input: string;
  error: boolean;
};

type Todo = {
  title: string;
  completed: boolean;
};

enum InputError {
  Exists = "exists",
  Empty = "empty",
}

export { State, InputError };
