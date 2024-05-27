import { type Component, tags } from "@tentjs/tent";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

const { div, select, option } = tags;

enum Language {
  JavaScript = "javascript",
  TypeScript = "typescript",
}

type State = {
  language: Language;
};

const Editor: Component<State> = {
  state: { language: Language.JavaScript },
  view: ({ state }) =>
    div([
      select(
        [
          option("JavaScript", { value: Language.JavaScript }),
          option("TypeScript", { value: Language.TypeScript }),
        ],
        {
          onchange: ({ target }) => {
            state.language = target.value;
          },
        },
      ),
      viewEditor(state.language),
    ]),
};

function viewEditor(language: Language) {
  return div("", {
    mounted({ el }) {
      const isTS = language === Language.TypeScript;

      new EditorView({
        parent: el,
        extensions: [basicSetup, javascript({ typescript: isTS })],
        doc: `function greet(who${isTS ? ": string" : ""})${isTS ? ": string" : ""} {\n  return \`Hello, \${who}!\`;\n}\n\ngreet();\n\n// Try typing here!`,
      }).focus();
    },
  });
}

export { Editor, viewEditor };
