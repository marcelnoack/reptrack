import { Router } from 'express';

import { SupportedHttpStatusCodes } from '../../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/profile', route);

  route.get('/', (req, res) => {
    return res.status(SupportedHttpStatusCodes.OK).send(req.user);
  });
};
