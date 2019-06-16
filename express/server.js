'use strict';
const express = require('express');
const Sentry = require('@sentry/node');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

Sentry.init({ dsn: 'https://bfbd168f5453439c92804fea15f2778e@sentry.io/1480669' });

const router = express.Router();
router.get('/', (req, res) => {
  Sentry.captureMessage('Thằng Thành vừa post video @@');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
