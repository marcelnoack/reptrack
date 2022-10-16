import express from 'express';

import { checkDbConnection } from '../common/db';
import { Logger } from '../common/Logger';
import httpsRedirectLoader from './https-redirect';
import expressLoader from './express';
import morganLoader from './morgan';
import DBHelper from '../common/db/helper';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default async ({ expressApp }: { expressApp: express.Express }) => {
  // Redirect all traffic to https (needed for Heroku deployment)
  await httpsRedirectLoader({ app: expressApp });
  Logger.info('HTTPS-Redirect applied');

  // Setup loggin middleware
  await morganLoader({ app: expressApp });
  Logger.info('Morgan middleware loaded');

  // Initialize express
  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');

  // Check database access
  await checkDbConnection();
  const dbHelper: DBHelper = new DBHelper();
  dbHelper.seedDB();
};
