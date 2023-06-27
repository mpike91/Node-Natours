const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
app.use(morgan('dev'));

// This is REQUIRED to receive POST requests and for express / the server to "interpret" them.
app.use(express.json());

// Custom Middleware. Run these prior to other code, especially response code (as this cuts off the middelware event loop).
app.use((req, res, next) => {
  console.log('Hello from the middleware :D');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
