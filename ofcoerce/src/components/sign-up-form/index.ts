import { type Component, tags } from "@tentjs/tent";
import { Input } from "@tentjs/ui";
import { coercer } from "ofcoerce";

const { form } = tags;

type User = {
  username: string;
  email: string;
  firstname: string;
  lastname?: string;
  age?: number;
};

const coerceUser = coercer<User>(($) => ({
  username: String,
  email: String,
  firstname: String,
  lastname: $.Optional(String),
  age: $.Optional(Number),
}));

type FormType<T> = Event & {
  target: T;
};

const SignUpForm: Component = {
  view: () =>
    form(
      [
        Input("text", { name: "username" }),
        Input("text", { name: "email" }),
        Input("submit", { value: "Submit" }),
      ],
      {
        onsubmit: (e: FormType<HTMLFormElement>) => {
          e.preventDefault();

          // Create a new FormData object from the form element.
          // We have to cast the target to an HTMLFormElement because TypeScript
          // does not know that the target is an HTMLFormElement.
          const formData = new FormData(e.target);

          // Coerce using the `coerceUser` function.
          // `firstname` will be set to empty string, because it's required and not provided.
          // `lastname` and `age` won't be set, because they are optional.
          const user = coerceUser({
            username: formData.get("username"),
            email: formData.get("email"),
          });

          console.log(user);
          // => { username: formData.get("username"), email: formData.get("email"), firstname: "" }
        },
      },
    ),
};

export { SignUpForm };
