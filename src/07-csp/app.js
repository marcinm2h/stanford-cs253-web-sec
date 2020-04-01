const express = require("express");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const { name = "guest" } = req.query;
  const template = `
    <h1>Hi, (%=) <%= name %></h1>
    <h1>Hi, (%-) <%- name %></h1>
    <a href="?name=<script>alert('xss')</script>">XSS</a>
    <br />
    <a href="/csp?name=<script>alert('xss')</script>">'Content-Security-Policy': "default-src 'self'"</a>
    `;
  const html = ejs.render(template, { name });

  res.send(html);
});

app.get("/csp", (req, res) => {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
  res.set({
    'Content-Security-Policy': "default-src 'self'" // prevents external <src /> and in-line <src />
  });

  const { name = "guest" } = req.query;
  const template = `
    <h1>Hi, (%=) <%= name %></h1>
    <h1>Hi, (%-) <%- name %></h1>
    <a href="?name=<script>alert('xss')</script>">XSS</a>
    `;
  const html = ejs.render(template, { name });

  res.send(html);
});

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
