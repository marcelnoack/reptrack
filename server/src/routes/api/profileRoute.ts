import { Router } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
import { isAuth } from '../middleware';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/profile', isAuth, route);

  route.get('/', (req, res) => {
    return res.status(SupportedHttpStatusCodes.OK).send(req.user);
  });
};
