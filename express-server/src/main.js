import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.static("client/dist"));

app.get("/", (_req, res) => {
  res.render("index", {
    // In a real app, this would probably be fetched from a database
    // or some other data source.
    //
    // This will be given to the Pug template, which can then pass it to the
    // component as a data-attribute.
    items: ["one", "two", "three"],
  });
});

app.listen(port, () => {
  console.log(`Example app available: http://localhost:${port}`);
});
