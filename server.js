const express = require('express');
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('morgan');
const connectDB = require("./config/database");

const indexRouter = require('./routes/indexRoutes');
const newEntryRouter = require('./routes/newEntryRoutes.js')
// const usersRouter = require('./routes/categoryRoutes');

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
// app.use('/new-entry', newEntryRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})