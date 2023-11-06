const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);

// Add a custom route to intercept changes and save them to the file
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    // Modify db.json and save changes here
    // For example, you can use the `router.db` object to access the data and write it to the file.
    router.db.write();

    // Ensure the changes are saved before responding to the client
    res.status(200).json({ message: "Changes saved successfully." });
  } else {
    next();
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
