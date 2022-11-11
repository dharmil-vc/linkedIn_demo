import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import InitiateMongoserver from './config/db.js';
import router from './routes/index.js';

// eslint-disable-next-line no-underscore-dangle
global.__dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, './src/environment/.env') });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

InitiateMongoserver();
app.use('/api', router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
