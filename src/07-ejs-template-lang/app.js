const express = require("express");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const { name = "guest" } = req.query;
  const template = `
    <h1>Hi, (%=) <%= name %></h1>
    <h1>Hi, (%-) <%- name %></h1>
    `;
  const html = ejs.render(template, { name });

  res.send(html);
});

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
