import { type Component, tags, mount } from "@tentjs/tent";
import { Counter } from "./components/counter";
import { List } from "./components/list";

const { p } = tags;

const HelloWorld: Component = {
  view: () => p("Hello, World!", { style: "margin: 0 0 1em 0" }),
};

mount(document.querySelector(".hello-world"), HelloWorld);
mount(document.querySelector(".counter"), Counter);
mount(document.querySelector(".list"), List);
