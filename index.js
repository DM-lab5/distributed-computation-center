const express = require('express');
const router = require('./routes');
const init = require('./initialization');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(router);

// app.get('/store/:key', async (req, res) => {
//   const { key } = req.params;
//   const value = req.query;
//   await redisClient.setAsync(key, JSON.stringify(value));
//   return res.send('Success');
// });
//
// app.get('/', (req, res) => {
//     return res.send('Server is running !');
// });
//
// app.get('field/:key', async (req, res) => {
//   const { key } = req.params;
//   const rawData = await redisClient.getAsync(key);
//   return res.json(JSON.parse(rawData));
// });
//
// app.post('function/:name', async (req, res) => {
//     const { key } = req.params;
//     const rawData = await redisClient.getAsync(key);
//     return res.json(JSON.parse(rawData));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
