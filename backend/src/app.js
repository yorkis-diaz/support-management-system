const express = require('express');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/ticketRoutes');

const { connectToMongoDB } = require('./db');
const app = express();
const cors = require('cors');
  
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}));

app.use(bodyParser.json());

// Routes
app.use('/', ticketRoutes);

module.exports = app;