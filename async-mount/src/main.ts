import { mount } from "@tentjs/tent";
import { AsyncMount } from "./components/async-mount";

fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  .then((res) => res.json())
  .then((json) => {
    const target = document.querySelector<HTMLDivElement>(".target");

    if (target) {
      // Set the JSON string to the `data-todos` attribute,
      // so that it can be accessed with `el.dataset.todos` in the component.
      target.dataset.todos = JSON.stringify(json);

      mount(target, AsyncMount);
    }
  });
