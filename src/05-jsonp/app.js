const express = require("express");

const ports = {
  api: 3001,
  httpServer: 3000
};

const api = express();
const httpServer = express();

httpServer.get("/", (req, res) => {
  res
    .send(
      `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSONP</title>
  </head>
  <body>
    <h1>JSONP</h1>
    <p>Cross origin request with JSON with padding</p>
    <div id="response"></div>
  </body>
  <script>
    function handleResponse(data) {
      const $response = document.querySelector('#response');
      $response.innerHTML = JSON.stringify(data);
    }
  </script>
  <script src="//localhost:${ports.api}/get-data"></script>
</html>
`
    )
    .slice(1);
});

api.get("/get-data", (req, res) => {
  res.send(
    `
handleResponse({
  now: ${Date.now()}
});
`.slice(1)
  );
});

httpServer.listen(ports.httpServer, () =>
  console.log(`HttpServer istening on port ${ports.httpServer}`)
);

api.listen(ports.api, () =>
  console.log(`Api istening on port ${ports.api}`)
);
