import { type Component, tags } from "@tentjs/tent";

const { div, h3, p, ul, li } = tags;

type Post = { id: number; title: string; body: string; userId: number };
type State = {
  posts: Post[];
};

const Fetch: Component<State> = {
  state: { posts: [] },
  view: ({ state }) =>
    div(
      state.posts.length
        ? ul(state.posts.map((post) => li([h3(post.title), p(post.body)])))
        : p("Loading..."),
    ),
  mounted: async ({ state }) => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3",
    );

    state.posts = await res.json();
  },
};

export { Fetch };
