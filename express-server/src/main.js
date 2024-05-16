import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.static("client/dist"));

app.get("/", (_req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app available: http://localhost:${port}`);
});
