import { type Component, tags } from "@tentjs/tent";
import { sample } from "lodash";
import { users } from "../../data/users";
import { User } from "../../types";

const { div, img, button } = tags;

type State = {
  userId: number;
};

type Attrs = {
  userId: string;
};

const ProfileCard: Component<State, Attrs> = {
  state: { userId: 1 },
  view: ({ state }) => {
    const user = users.find((user) => user.userId === state.userId);

    if (!user) {
      return div("User not found");
    }

    return div(
      [
        viewRandomButton(state),
        div(
          [
            div(img("", { src: "https://placehold.co/40x40" }), {
              className: "side",
            }),
            viewContent(user),
          ],
          { className: "profile-card" },
        ),
      ],
      // Since our `users` in `../../data/users.ts` are not unique, we can provide a key,
      // if we want to re-render the component when the user changes, no matter if the user
      // have the same `username` and `bio`.
      // If the users are always unique, or we don't care that it doesn't re-render, we can remove the key.
      { key: state.userId },
    );
  },
};

function viewRandomButton(state: State) {
  return button("Random user", {
    onclick: () => {
      // Don't show the same user again
      const uniqueUsers = users.filter((u) => u.userId !== state.userId);

      state.userId = sample(uniqueUsers)?.userId ?? 1;
    },
    className: "random-button",
  });
}

function viewContent({ username, bio }: User) {
  return div(
    [
      // Username
      div(username, { className: "username" }),
      // Bio
      div(bio, { className: "bio" }),
    ],
    { className: "content" },
  );
}

export { ProfileCard };
