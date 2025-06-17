require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const redisClient = require('./config/redisClient');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postImageRoutes = require('./routes/postImageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentTagRoutes = require('./routes/commentTagRoutes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/images', postImageRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);
app.use('/comment-tags', commentTagRoutes);
app.use(errorHandler);

conectarDB();
redisClient.connect();

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
