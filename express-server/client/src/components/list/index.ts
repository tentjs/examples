import { type Component, tags } from "@tentjs/tent";

const { ul, li } = tags;

type Attrs = {
  items: string;
};

const List: Component<{}, Attrs> = {
  view({ el }) {
    // Parse the JSON string into an array of strings.
    // The `items` attribute is a stringified JSON array, set in the Pug template.
    const items: string[] = JSON.parse(el.dataset.items);

    return ul(items.map((item) => li(item)));
  },
};

export { List };
