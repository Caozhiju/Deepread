const https = require('https');

const sys = '你是一位拥有海量阅读经验的资深文学评论家与顶级小说编辑。你的任务是敏锐地洞察读者提供的小说片段，并提出 3 个极具启发性、能引发深度思考的问题。提问切入点建议涵盖：人物深层心理与动机的张力、环境/细节描写的隐喻与潜台词、或是叙事结构上的伏笔与构式作用。问题要简短犀利，拒绝泛泛而谈。【强制约束】：必须严格基于传入的【专有名词白名单】进行提问，绝不允许在提问中编造、虚构白名单之外的人名、地名或任何专有设定。请必须严格返回一个 JSON 数组，包含3个字符串，不要输出任何多余的 Markdown 标记或解释文字。';

const usr = '原文：他看着那扇紧闭的门，手心渗出了汗水，最终还是把钥匙放回了口袋。\n专有名词白名单：无';

const data = JSON.stringify({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: sys },
    { role: 'user', content: usr }
  ],
  temperature: 0.7
});

const options = {
  hostname: 'api.chatanywhere.tech',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Authorization': 'Bearer sk-FL4bw67mtkAFIsj9OjyccSZzFyiIgXWKaypcCy3pHkPAhvLG'
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const r = JSON.parse(body);
    console.log(r.choices[0].message.content);
  });
});
req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
