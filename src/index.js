require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const redisClient = require('./config/redisClient');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use('/users', userRoutes);
conectarDB();
redisClient.connect();

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
