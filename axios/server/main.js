const express = require("express");

const app = express();
const port = 3000;

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(express.json());

app.get("/api/random-message", (_req, res) => {
  const messages = ["Hello, World!", "Hi there!", "Good day!"];
  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];

  res.json({ message });
});

app.post("/api/name", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (name === "") {
    return res.status(400).json({ error: "Name cannot be empty" });
  }

  res.json({ message: `Hello, ${name}!` });
});

app.listen(port, () => {
  console.log(`Example app available: http://localhost:${port}`);
});
