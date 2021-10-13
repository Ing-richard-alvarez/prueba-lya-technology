require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { dbConnect } = require('./config/mongo');

// Import react, react-dom and anothers library
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './client/components/App';

var app = express();

//Initialize CORS
app.use(cors());

//Initialize DB
dbConnect();

//server side rendering with react js
app.use("/static",express.static(path.join(__dirname,'dist','static')));
app.get('/',(req, res) => {
  const root = (
    <html>
      <head>
        
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous" 
        />

      <title>Prueba Lya Technology</title>

      </head>
      <body>
        <div id="root"><App/></div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  );
  const html = ReactDOM.renderToString(root);

  res.send(html);
})

// Handle api routes
app.use('/api/v1', require('./routes'));

module.exports = app;

// https://www.youtube.com/watch?v=lf-L9IEdo9E