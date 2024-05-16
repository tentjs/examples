# ⚙️ Express Server example

This is a simple example of using an Express server, which consumes Pug files. The Pug files can include our Tent components. In this case our components is in the `./client` folder.

## 🏃🏻‍♂️ How to run

There are 2 projects in this repository: the server and the client. The server is in the root folder and the client is in the `./client` folder.

First, you need to build the client project. Go to the `./client` folder and run the following commands:

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

Now you can run the server. Go back to the root folder and run the following commands:

```bash
# Install dependencies
npm install

# Run the server
npm run start
```

Now you can access the app on [http://localhost:3000](http://localhost:3000). The server will render the `src/views/index.pug` file, which includes the Tent components.
