import { mountAll } from "@tentjs/helpers";

import { Example1, Example2, Example3 } from "./components/example";

mountAll([
  { target: ".target-1", component: Example1 },
  { target: ".target-2", component: Example2 },
  { target: ".target-3", component: Example3 },
]);
