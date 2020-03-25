const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const users = [
  {  login: 'mm', password: 'pw' },
];

app.get('/', (req, res) => {
  console.log('GET /', req.cookies);
  const stream = fs.createReadStream(`${__dirname}/public/index.html`);
  stream.pipe(res);
});

app.post('/login', (req, res) => {
  console.log('POST /login');
  const user = users.find(user => user.login === req.body.login);
  if (user && user.password === req.body.password) {
    res.cookie('username', user.login);
    res.send(`Hello ${user.login}`);
  } else {
    res.send('fail');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

