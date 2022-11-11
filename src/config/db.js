import mongoose from 'mongoose';

const IntiateMongoserver = () => {
  mongoose
    .connect(process.env.URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Database connected!');
    })
    .catch((err) => {
      console.log('error in database connection', err);
    });
};

export default IntiateMongoserver;
