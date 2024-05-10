import express from 'express';
const router = express.Router();
const events = new Map();

router.get('/api/push', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 设置允许来自哪里的跨域请求访问（req.headers.origin 为当前访问来源的域名与端口）
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'); // 设置允许接收的请求类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, request-origin'); // 设置请求头中允许携带的参数
  // res.header('Access-Control-Allow-Credentials', 'true'); // 允许客户端携带证书式访问，保持跨域请求中的 Cookie。注意：此处设为 true 时，Access-Control-Allow-Origin 的值不能为 '*'
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const handler2User = (uid) => {
    const resEvent = events.get(uid);
    if (!resEvent) return;
    console.log('write', uid);
    resEvent.write(`data: ${uid} 收到消息！${Date.now()}\n\n`);
  };
  const uid = req.query.uid;
  if (uid) {
    events.set(uid, res);
  }

  // 推送消息
  res.write(`data: 站内信链接成功！\n\n`);

  req.on('close', () => {
    console.log('断开连接');
  });
});

router.get('/api/update', (req, res) => {
  const uid = req.query.uid;
  if (uid) {
    const resEvent = events.get(uid);
    if (resEvent) {
      console.log('write', Reflect.has(resEvent, 'write'));
      resEvent.write(`data: 123\n\n`);
    }
  }
  res.send('更新成功');
});

const app = express();
const port = 3010;
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
