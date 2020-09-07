import bodyParser from 'body-parser';
import boom from 'express-boom';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import serverless from 'serverless-http';
import brainFuckRoute from './routes/brain-fuck';

dotenv.config();

const app = express();
const whiteListedOrigins = ['https://mum-never-proud.github.io'];
const corsOptions = {
  origin(origin, callback) {
    if (process.env.NODE_ENV === 'development'
      || process.env.NODE_ENV === 'production'
      || whiteListedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('not allowed'));
    }
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ type: 'application/json'}));
app.use(boom());
app.use(morgan('combined'));

app.use('/.netlify/functions/app', brainFuckRoute);
app.use('*', (_, res) => res.boom.notFound());

exports.handler = serverless(app);
