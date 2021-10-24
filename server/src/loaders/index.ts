import express from 'express';

import expressLoader from './express';
import morganLoader from './morgan';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: express.Express }) => {
  // Connect to Postgres with postgres-loader
  Logger.info('DB loaded and connected!');

  // Load middleware
  await morganLoader({ app: expressApp });
  Logger.info('Middleware loaded');

  // Initialize express
  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
