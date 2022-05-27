import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/', (req, res) => {
    return res.status(200).send('Hi from Users');
  });

  route.get('/:id', (req, res) => {
    return res.status(200).send('Hi from a User');
  });
};
