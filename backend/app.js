const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieparser = require('cookie-parser')

app.use(express.json());
app.use(cookieparser());


const products = require('./routes/product')
const auth = require('./routes/auth')


app.use('/api/v1',products);
app.use('/api/v1',auth);

app.use(errorMiddleware)

module.exports = app;
