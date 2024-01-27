import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import config from '../config';
import routes from '../routes';
import { ErrorHandler, Logger } from '../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default ({ app }: { app: express.Application }) => {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: 'Cannot send any more requests'
    })
  );

  app.use(cookieParser());
  app.use(helmet());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use(
    session({
      secret: config.accessTokenSecret,
      resave: false,
      saveUninitialized: false,
      unset: 'keep',
      cookie: {
        // domain:
        //   process.env.NODE_ENV === 'production'
        //     ? config.clientUrl
        //     : 'localhost',
        httpOnly: true,
        secure: false,
        maxAge: 360000,
        sameSite: 'none'
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(`/${config.api.prefix}`, routes());

  // Centralized error handling
  app.use(ErrorHandler.handleError);

  process.on('unhandledRejection', (error) => {
    throw error;
  });

  process.on('uncaughtException', ErrorHandler.handleError);

  return app;
};
