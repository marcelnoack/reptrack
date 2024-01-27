import { Router, Request, Response, NextFunction } from 'express';

import { SupportedHttpStatusCodes } from '../../common';
import { checkDbConnection } from '../../common/db';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

const _healthCheckHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await checkDbConnection();
    res.status(SupportedHttpStatusCodes.OK).send('Service available');
  } catch (err) {
    next(err);
  }
};

export default (app: Router) => {
  app.use('/health-check', route);

  route.get('', _healthCheckHandler);
};
