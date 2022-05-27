import jwt from 'jsonwebtoken';
import config from '../../config';

const isAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(400).send('Token not present');
  }

  jwt.verify(token, config.accessTokenSecret, (err: any, user: any) => {
    if(err) {
      res.status(403).send("Invalid Token");
    } else {
      req.user = user;
      next();
    }
  })
};

export default isAuth;
