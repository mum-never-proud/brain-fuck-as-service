import bodyParser from 'body-parser';
import boom from 'express-boom';
import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import brainFuckRoute from './routes/brain-fuck';

dotenv.config();

const app = express();
const { APP_NAME, APP_PORT } = process.env;

app.use(bodyParser.json({ type: 'application/json'}));
app.use(boom());
app.use(morgan('combined'));

app.use('/brain-fuck', brainFuckRoute);

app.listen(APP_PORT, () => console.log(chalk
  `{bold.blue ${APP_NAME} listening on port ${APP_PORT} @ ${Date.now()}}`
));
