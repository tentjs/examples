import { type Component, tags } from "@tentjs/tent";
import { type FormEvent, ternary } from "@tentjs/helpers";
import { z, ZodError } from "zod";
import styles from "./zod.module.css";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.coerce
    .number()
    .int()
    .positive()
    .min(18, "You must be at least 18 years old"),
  email: z.string().email(),
});

const { div, ul, li, form, input, p } = tags;

type State = { errors: ZodError[]; valid: boolean };

const Zod: Component<State> = {
  state: { errors: [], valid: false },
  view: ({ state }) =>
    div([
      form(
        [
          input("", { placeholder: "Username", name: "username" }),
          input("", { type: "email", placeholder: "Email", name: "email" }),
          input("", { type: "number", placeholder: "Age", name: "age" }),
          input("", { type: "submit", name: "Submit", value: "Submit" }),
        ],
        {
          className: styles.form,
          onsubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
              userSchema.parse(data);

              state.valid = true;
              state.errors = [];
            } catch (error) {
              state.valid = false;
              state.errors = error.issues;
            }
          },
        },
      ),
      ternary(
        state.valid,
        p("Success! No errors found.", { className: styles.success }),
      ),
      ternary(
        state.errors.length > 0,
        ul(
          state.errors.map((error) => li(error.message)),
          { className: styles.errors },
        ),
      ),
    ]),
};

export { Zod };
