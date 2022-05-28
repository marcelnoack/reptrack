import express from 'express';

import httpsRedirectLoader from './https-redirect';
import expressLoader from './express';
import morganLoader from './morgan';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: express.Express }) => {
  // Redirect all traffic to https (needed for Heroku deployment)
  await httpsRedirectLoader({ app: expressApp });
  Logger.info('HTTPS-Redirect applied');

  // Load middleware
  await morganLoader({ app: expressApp });
  Logger.info('Middleware loaded');
  
  // Initialize express
  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');


};
