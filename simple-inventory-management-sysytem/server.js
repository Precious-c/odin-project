const express = require('express');
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('morgan');
const connectDB = require("./config/database");

const indexRouter = require('./routes/indexRoutes');
const newEntryRouter = require('./routes/newEntryRoutes.js')

require("dotenv").config({path: "./config/.env"})
connectDB()

app.use(session({
	secret:'happy dog',
	saveUninitialized: true,
	resave: true
}));
// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.use('/', indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})