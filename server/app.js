require('dotenv').config();

import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { dbConnect } from './src/config/mongo';

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
app.use('/api/v1', require('./src/routes'));


app.listen(process.env.PORT,() => console.log("Server Started"));