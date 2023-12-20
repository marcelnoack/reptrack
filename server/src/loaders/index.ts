import express from 'express';

import { checkDbConnection } from '../common/db';
import DBHelper from '../common/db/helper';
import { Logger } from '../common/Logger';
import httpsRedirectLoader from './https-redirect';
import expressLoader from './express';
import morganLoader from './morgan';
import passportLoader from './passport';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default async ({ expressApp }: { expressApp: express.Express }) => {
  // Redirect all traffic to https (needed for Heroku deployment)
  await httpsRedirectLoader({ app: expressApp });
  Logger.info('HTTPS-Redirect applied');

  // Setup logging middleware
  await morganLoader({ app: expressApp });
  Logger.info('Morgan middleware loaded');

  // Initialize passport
  await passportLoader({ app: expressApp });
  Logger.info('Passport loaded');

  // Initialize express
  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');

  // Check database access
  await checkDbConnection();
  const dbHelper: DBHelper = new DBHelper();
  dbHelper.seedDB();
};
