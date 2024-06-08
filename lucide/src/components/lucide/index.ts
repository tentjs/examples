import { keep } from "@tentjs/helpers";
import { createTag, tags, type Component } from "@tentjs/tent";
import {
  Airplay,
  Apple,
  Car,
  Cat,
  Dog,
  Hourglass,
  Tent,
  createIcons,
} from "lucide";

import * as styles from "./styles.module.css";

const { div, p } = tags;

const Lucide: Component = {
  view() {
    return div([
      p("Here are some Lucide icons:", { className: styles.text }),
      keep(
        [
          icon("tent"),
          icon("dog"),
          icon("cat"),
          icon("car"),
          icon("airplay"),
          icon("hourglass"),
          icon("apple"),
        ],
        { className: styles.icons },
      ),
    ]);
  },
  mounted() {
    createIcons({
      icons: { Tent, Dog, Cat, Car, Airplay, Hourglass, Apple },
    });
  },
};

function icon(name: string) {
  return createTag(["i", "", { "data-lucide": name }]);
}

export { Lucide };
