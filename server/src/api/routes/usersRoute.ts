import { Router } from 'express';

import { isAuth } from '../../common/middleware';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const route = Router();

export default (app: Router) => {
  app.use('/users', isAuth, route);

  route.get('/', (req, res) => {
    return res.status(200).send('Hi from Users');
  });

  route.get('/:id', (req, res) => {
    return res.status(200).send('Hi from a User');
  });
};
