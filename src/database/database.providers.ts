import * as mongoose from 'mongoose';
import config from '../config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => mongoose.connect(config.mongoUrl),
  },
];
