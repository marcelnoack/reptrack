import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import config from '../config';
import routes from '../api';
import { ErrorHandler } from '../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use(`/${config.api.prefix}`, routes());

  // Centralized error handling
  app.use(ErrorHandler.handleError);

  process.on('unhandledRejection', (error) => {
    throw error;
  });

  process.on('uncaughtException', ErrorHandler.handleError);

  return app;
};
