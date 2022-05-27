import { Router } from 'express';
import { compare, hash } from 'bcryptjs';

import { UserInputDTO } from '../../interfaces/User';
import * as User from '../../models/User';
import AuthService from '../../services/auth';

const route = Router();
const authService = new AuthService();

export default (app: Router) => {
  app.use('/auth', route);

  route.post('/signin', async (req, res) => {
    const user = await User.get(req.body.user.username);

    if (!user) {
      return res.status(404).send('User does not exist');
    }

    const hashedPassword = await User.getPassword(req.body.user.username);
    const isValidPassword = await compare(req.body.user.password, hashedPassword);
    if (!isValidPassword) {
      return res.status(401).send('User credentials are not correct');
    }
    
    const accessToken = await authService.signIn(user);
    // const refreshToken = generateRefreshToken({user: req.body.username});

    return res.json({accessToken});
  });

  route.post('/signup', async (req, res) => {
    // TODO: Validation for user object
    const hashedPassword = await hash(req.body.user.password, 10);
    const newUser: UserInputDTO = {
      username: req.body.user.username,
      password: hashedPassword,
      firstName: '',
      lastName: '',
      email: ''
    };

    const result = await User.create(newUser);

    return res.status(200).send('Created');
  });
};
