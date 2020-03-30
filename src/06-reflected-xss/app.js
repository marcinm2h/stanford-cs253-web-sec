const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

const renderPage = (html, { title = "title" } = {}) =>
  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  ${html}
</body>
</html>`.slice(1);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.post("/login", (req, res) => {
  res.cookie(
    "session_secret",
    Math.random()
      .toString()
      .slice(2)
  );
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "home.html"));
});

app.get("/search", (req, res) => {
  res.send(
    renderPage(
      `
  <h1>Search results for ${req.query.search}</h1>  
`,
      { title: "Search results" }
    )
  );
});

app.listen(PORT, () => console.log(`App listens on ${PORT}`));
