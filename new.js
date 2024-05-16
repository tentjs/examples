const prompt = require("prompt");
const fs = require("fs");
const path = require("path");

const schema = {
  properties: {
    name: {
      pattern: /^[a-z\-]+$/,
      message: "Name must be only lowercase letters and dashes",
      required: true,
    },
  },
};

prompt.start();

// Prompt the user for the name of the new example,
// then copy the starter example to a new folder with the given name.
prompt.get(schema, function (err, result) {
  if (err) {
    throw new Error(err);
  }

  const name = result.name;
  const source = path.join(__dirname, "_starter");
  const destination = path.join(__dirname, name);

  if (fs.existsSync(destination)) {
    console.error(`Example with name "${name}" already exists!`);

    return;
  }

  fs.cp(source, destination, { recursive: true }, function (err) {
    if (err) {
      throw new Error(err);
    }

    console.log(`Example with name "${name}" created successfully!`);
  });
});
