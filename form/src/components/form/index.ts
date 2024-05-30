import { type Component, tags } from "@tentjs/tent";
import { type FormEvent, bind } from "@tentjs/helpers";

const { form, div, p, input } = tags;

type State = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  submitted: boolean;
};

const inputs = ["username", "email", "firstname", "lastname"];

const Form: Component<State> = {
  state: {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    submitted: false,
  },
  view: ({ state }) =>
    div([
      form(
        [
          ...inputs.map((name) =>
            div(
              input("", {
                name,
                placeholder: `Enter ${name}...`,
                value: state[name],
                oninput: bind(state, name),
              }),
            ),
          ),
          input("", {
            type: "submit",
            value: "Submit",
          }),
        ],
        {
          onsubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            state.submitted = true;
            console.log(state);
          },
        },
      ),
      isFilledOut(state) && state.submitted
        ? div(inputs.map((name) => p(`${name}: ${state[name]}`)))
        : "",
    ]),
};

function isFilledOut(state: State) {
  return inputs.every((name) => state[name].length > 0);
}

export { Form };
