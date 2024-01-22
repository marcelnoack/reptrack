import express from 'express';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import config from '../config';
import routes from '../api';
import { ErrorHandler } from '../common';
import { addTrailingSlash } from '../utils';
import { Api403Error } from '../common/errors';

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

  // prepare origin for cors handling
  app.use((req, res, next) => {
    if (!req.headers.origin) {
      req.headers.origin =
        req.headers.referer ||
        `${
          process.env.NODE_ENV === 'development'
            ? 'http://'
            : req.secure
            ? 'https://'
            : 'http://'
        }${addTrailingSlash(req.headers.host || '')}`;
    }
    next();
  });

  app.use(
    cors({
      origin: (origin, callback) => {
        const whiteList = [
          config.clientUrl,
          process.env.NODE_ENV === 'development'
            ? `http://localhost:${config.port}/`
            : addTrailingSlash(`https://${config.host}`)
        ];
        if (whiteList.some((entry) => origin?.startsWith(entry))) {
          return callback(null, true);
        }
        return callback(
          new Api403Error(`Origin ${origin} not allowed by CORS`)
        );
      },
      credentials: true
      // exposedHeaders: ['X-CSRF-Token']
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
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 360000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
        path: '/'
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
