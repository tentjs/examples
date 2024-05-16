type State = {
  todos: string[];
  input: string;
  error: boolean;
};

enum InputError {
  Exists = "exists",
  Empty = "empty",
}

export { State, InputError };
