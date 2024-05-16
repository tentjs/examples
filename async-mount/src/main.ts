import { mount } from "@tentjs/tent";
import { AsyncMount } from "./components/async-mount";

fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  .then((res) => res.json())
  .then((json) => {
    const target = document.querySelector<HTMLDivElement>(".target");

    if (target) {
      target.dataset.todos = JSON.stringify(json);

      mount(target, AsyncMount);
    }
  });
