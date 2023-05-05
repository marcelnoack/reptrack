import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import config from '../config';
import routes from '../api';
import { ErrorHandler } from '../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default ({ app }: { app: express.Application }) => {

  app.use(
    cors({
      origin: (origin, callback) => {
        if (
          process.env.NODE_ENV === 'production' &&
          (origin === 'https://www.reptrack.fit' ||
            origin === 'https://reptrack.fit')
        ) {
          return callback(null, true);
        }

        if (
          process.env.NODE_ENV === 'development' &&
          (!origin || origin === 'http://localhost:4200' || origin === 'http://localhost:3000')
        ) {
          return callback(null, true);
        }

        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
      exposedHeaders: ['X-CSRF-Token'],
    })
  );
  app.use(cookieParser());
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
