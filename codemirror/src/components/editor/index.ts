import { type Component, tags } from "@tentjs/tent";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

const { div } = tags;

type Attrs = {
  language: "javascript" | "typescript";
};

const Editor: Component<{}, Attrs> = {
  view: () => div("", { id: "editor" }),
  mounted({ el }) {
    const target = el.querySelector("#editor");
    if (!target) {
      return;
    }

    const { language } = el.dataset;

    new EditorView({
      parent: target,
      extensions: [
        basicSetup,
        javascript({ typescript: language === "typescript" }),
      ],
      doc: `function greet(who) {\n  return \`Hello, \${who}!\`;\n}\n\ngreet();\n\n// Try typing here!`,
    }).focus();
  },
};

export { Editor };
