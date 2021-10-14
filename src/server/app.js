require('dotenv').config();

import express from "express";
import React from 'react';
import path from 'path';
import ReactDOM from 'react-dom/server';
import App from '../client/components/App';
import bodyParser from 'body-parser';
import cors from 'cors';

import { dbConnect } from '../server/config/mongo';

const app = express();

//connect to DB
dbConnect();

//Initialize CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Handle api routes
app.use('/api/v1', require('../server/routes'));

//server side rendering with react js
app.use("/static",express.static(path.join(__dirname,'..','..','dist','static')));
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


app.listen(process.env.PORT,() => console.log("Server Started"));