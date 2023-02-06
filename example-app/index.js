const express = require('express');
const cookieParser = require('cookie-parser');

const port = 80;

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify(
      {
        // See "Token" cookie
        cookies: req.cookies,
        // See "Token" and "Token-Payload" headers
        headers: req.headers,
      },
      null,
      4
    )
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
