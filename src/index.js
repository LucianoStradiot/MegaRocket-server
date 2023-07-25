import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

dotenv.config();

mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');

    try {
      app.listen(process.env.PORT, (err) => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log(`server listening on port: ${process.env.PORT}`);
      });
    } catch (err) {
    // eslint-disable-next-line no-console
      console.log('There was an error starting the server: ', err);
    }
  })
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
