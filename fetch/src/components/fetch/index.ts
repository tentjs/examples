import { type Component, tags } from "@tentjs/tent";
import { classes, ternary } from "@tentjs/helpers";

const { div, h3, p, ul, li } = tags;

type Post = { id: number; title: string; body: string; userId: number };
type State = {
  posts: Post[];
};

const Fetch: Component<State> = {
  state: { posts: [] },
  view: ({ state: { posts } }) =>
    div(
      ternary(
        posts.length > 0,
        ul(
          posts.map((post) => li([h3(post.title), p(post.body)])),
          { className: classes("list", posts.length > 3 && "long-list") },
        ),
        p("Loading..."),
      ),
    ),
  mounted: async ({ state }) => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3",
    );

    state.posts = await res.json();
  },
};

export { Fetch };
