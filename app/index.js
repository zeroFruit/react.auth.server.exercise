const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const router = require('./router');
const mongodb = require('./mongodb');

mongodb();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server listening on:', port);
})
