import { type Component, tags } from "@tentjs/tent";
import { type FormEvent } from "@tentjs/helpers";
import { z } from "zod";
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

const { form, input } = tags;

const Zod: Component = {
  view: () =>
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

          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries());

          try {
            userSchema.parse(data);

            console.log("Valid data", data);
          } catch (error) {
            console.error("Invalid data", error.issues);
          }
        },
      },
    ),
};

export { Zod };
