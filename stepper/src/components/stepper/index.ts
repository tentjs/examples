import { type Component, tags } from "@tentjs/tent";
import { type State, type Step } from "./types";
import * as styles from "./stepper.module.css";
import { button } from "../ui/button";
import { ifelse } from "../../helpers";
import { steps } from "../../steps";

const { ul, li, p, div } = tags;

const Stepper: Component<State> = {
  state: { step: 0, completed: false },
  view: ({ state }) =>
    div([
      ul(
        steps.map((step, idx) => viewStep(state, idx, step)),
        { className: styles.steps },
      ),
      viewDone(state),
    ]),
};

function viewStep(state: State, idx: number, step: Step) {
  const title = `${step.title}${step.completed ? " (done)" : ""}`;

  return li([
    p(title, { className: styles.title }),
    // Show description and continue button only for the current step.
    ifelse(
      idx === state.step,
      div(
        [
          p(step.description, { className: styles.description }),
          button("Continue →", () => {
            step.completed = true;

            if (state.step + 1 !== steps.length) {
              state.step++;
            } else {
              // All steps completed
              state.step = -1;
              state.completed = true;
            }
          }),
        ],
        { className: styles.step },
      ),
    ),
  ]);
}

function viewDone(state: State) {
  const completed = steps.every((step) => step.completed);

  if (!completed) {
    return "";
  }

  return div(
    [
      p("All steps completed 🎉", { className: styles.completed }),
      button(
        "Start over",
        () => {
          // Since the `steps` are not part of state, we need to
          // reset them before resetting the state. Otherwise,
          // the steps won't seem updated to the component.
          // This is because the component won't re-render when the
          // steps change, because they are not part of state.
          //
          // Most likely your steps won't be hardcoded like this,
          // but fetched from an API or some other source. In that
          // case, you probably want to store the steps in state or session- or
          // local storage.
          steps.forEach((step) => (step.completed = false));
          state.step = 0;
          state.completed = false;
        },
        { className: styles.reset },
      ),
    ],
    { className: styles.done },
  );
}

export { Stepper };
