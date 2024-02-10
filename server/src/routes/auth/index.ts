import { Request, Response, Router } from 'express';
import cors from 'cors';

import { Api500Error } from '../../common/errors';
import { SupportedHttpStatusCodes } from '../../common';
import { corsDefaultHandler } from '../../utils';
import googleAuthRoute from './googleAuthRoute';
import localAuthRoute from './localAuthRoute';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  localAuthRoute(route);
  googleAuthRoute(route);

  route.post(
    '/logout',
    cors({
      origin: corsDefaultHandler,
      credentials: true
    }),
    (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err)
          throw new Api500Error('Something went wrong while logging you out');

        res
          .clearCookie('connect.sid')
          .status(SupportedHttpStatusCodes.NO_CONTENT)
          .send();
      });
    }
  );
};
