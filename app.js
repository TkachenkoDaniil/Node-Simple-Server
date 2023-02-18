require('dotenv').config();
const express = require('express');
const cors = require('cors');

const indexRouter = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

module.exports = app;
