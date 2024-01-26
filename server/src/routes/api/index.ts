import { Router } from 'express';
import cors from 'cors';

import config from '../../config';
import { Api403Error } from '../../common/errors';
import { isAuth } from '../middleware';
import healthCheckRoute from './healthCheckRoute';
import profileRoute from './profileRoute';
import workoutsRoute from './workoutsRoute';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/api', isAuth, route);

  route.use(
    cors({
      origin: (origin, callback) => {
        const whiteList = [config.clientUrl];
        if (whiteList.some((entry) => entry === origin)) {
          return callback(null, true);
        }
        return callback(
          new Api403Error(`Origin ${origin} not allowed by CORS`)
        );
      },
      credentials: true
    })
  );

  healthCheckRoute(route);
  profileRoute(route);
  workoutsRoute(route);
};
