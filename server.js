require ('dotenv').config(); 
const connectMongooseToMongoDB = require('./config/database');

const express = require('express');
const routes = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(routes);

const startServer = async () => {
  await connectMongooseToMongoDB();
}

startServer();

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));