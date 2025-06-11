require('dotenv').config();

const conectarDB = require('./config/db');
const redisClient = require('./config/redisClient');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000


conectarDB();
redisClient.connect();

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
