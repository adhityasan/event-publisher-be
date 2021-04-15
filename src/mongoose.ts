import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application): void {
  mongoose.set('autoIndex', true);

  mongoose
    .connect(app.get('mongodb'), {
      useCreateIndex: true,
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info('mongodb run on %s', app.get('mongodb'));
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
}
