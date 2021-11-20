import express from 'express';

import expressLoader from './express';
import morganLoader from './morgan';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: express.Express }) => {
  expressApp.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
        next();
      }
    } else {
      next();
    }
  });

  // Connect to Postgres with postgres-loader
  Logger.info('DB loaded and connected!');

  // Load middleware
  await morganLoader({ app: expressApp });
  Logger.info('Middleware loaded');

  // Initialize express
  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
