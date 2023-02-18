require('dotenv').config();
const express = require('express');

const indexRouter = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

module.exports = app;
