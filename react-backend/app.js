var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var serverRouter = require('./routes/server');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/hello', serverRouter);

//MongoDB Stuff

var dbo
var upb = 'Zm9zdGVyOjEyMzQ1Ng=='
var ups = Buffer.from(upb, 'base64').toString();
var url = 'mongodb://user:1@ds261479.mlab.com:61479/workshop';
//var url = 'mongodb://foster:123456@ds161459.mlab.com:61459/init_db'

MongoClient.connect(url,(err,client) =>{
    if (err) return console.log(err)
    dbo = client.db('workshop');
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
