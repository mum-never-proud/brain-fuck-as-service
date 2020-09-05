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

app.use(cors({ origin: 'https://mum-never-proud.github.io', optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ type: 'application/json'}));
app.use(boom());
app.use(morgan('combined'));

app.use('/.netlify/functions/app', brainFuckRoute);
app.use('*', (_, res) => res.boom.notFound());

exports.handler = serverless(app);
