import { bind, on, ternary } from "@tentjs/helpers";
import { tags, type Component } from "@tentjs/tent";
import { client } from "../../client";
import type { HelloWorldResponse, NameResponse } from "../../client/types";

const { div, p, button, input } = tags;

type State = {
  msg: string;
  unique: boolean;
  name: string;
  error: string;
};

const Axios: Component<State> = {
  state: { msg: "", unique: true, name: "", error: "" },
  view: ({ state }) =>
    div([
      p(state.msg, { style: "margin-top: 0;" }),
      ternary(
        !state.unique,
        p(`Same message (${state.msg}) returned - try again!`, {
          className: "error",
        }),
      ),
      button("Get message", {
        onclick: () => getRandomMsg(state),
      }),
      div([
        input("", {
          type: "text",
          value: state.name,
          placeholder: "Enter your name... (press enter)",
          oninput: bind(state, "name"),
          onkeydown: on({
            Enter: () => handleOnEnter(state),
          }),
        }),
        ternary(
          state.error !== "",
          p(`Error: ${state.error}`, { className: "error" }),
        ),
        p("* Your name is not stored anywhere.", { className: "info" }),
      ]),
    ]),
  async mounted({ state }) {
    getRandomMsg(state);
  },
};

async function handleOnEnter(state: State) {
  try {
    const {
      data: { message },
    } = await client.post<NameResponse>("/name", { name: state.name });

    state.error = "";
    state.name = "";
    state.msg = message;
  } catch (e) {
    state.error = e.response.data.error;
  }
}

async function getRandomMsg(state: State) {
  const {
    data: { message },
  } = await client.get<HelloWorldResponse>("/random-message");

  state.unique = state.msg !== message;
  state.msg = message;
}

export { Axios };
