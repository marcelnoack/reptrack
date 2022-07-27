import jwt from 'jsonwebtoken';
import { Api401Error } from '../../common/Api401Error';
import { Api403Error } from '../../common/Api403Error';

import config from '../../config';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const isAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new Api401Error('Token not present');
  }

  jwt.verify(token, config.accessTokenSecret, (err: any, tokenUser: any) => {
    if (err) {
      throw new Api403Error('Invalid token');
    } else {
      req.token = tokenUser;
      next();
    }
  });
};

export default isAuth;
