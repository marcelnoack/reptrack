import express from 'express';

import expressLoader from './express';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: express.Express }) => {
  // Connect to Postgres with postgres-loader
  Logger.info('DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
