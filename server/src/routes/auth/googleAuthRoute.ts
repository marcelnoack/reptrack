import { Router } from 'express';
import passport from 'passport';
import cors from 'cors';

import { GENERAL_GOOGLE_SIGN_IN_ERROR } from '../../common/i18n/errors';
import config from '../../config';
import { Api403Error } from '../../common/errors';
import { isAuth } from '../middleware';
import { corsDefaultHandler } from '../../utils';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/google', route);

  route.get(
    '/login',
    (req, res, next) => {
      req.headers.origin = req.headers.origin || req.headers.referer;
      next();
    },
    cors({
      origin: corsDefaultHandler
    }),
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  route.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: config.clientUrl,
      failureRedirect: `/${config.api.prefix}/auth/google/callback/failure` // TODO: also redirect to client but with error code
    })
  );

  route.get('/callback/failure', isAuth, (req, res) => {
    res.status(401).send(GENERAL_GOOGLE_SIGN_IN_ERROR);
  });
};
