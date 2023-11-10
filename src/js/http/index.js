const express = require('express');
const app = express();
const port = 9000;

app.get('/crm/locale', (req, res) => {
  // 遍历请求的header字段并打印它们的值
  console.log(Object.keys(req.headers));
  console.log(req.ip);
  console.log(req.ip);
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
