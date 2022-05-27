import jwt from 'jsonwebtoken';

import config from '../config';
import { UserDTO } from '../interfaces/User';

export default class AuthService {
  private refreshTokens: string[] = [];

  // constructor() {}

  // public async signUp() {}

  public async signIn(user: UserDTO): Promise<string> {
    console.log(user, config.accessTokenSecret);
    return jwt.sign(user, config.accessTokenSecret, {
      expiresIn: `${config.jwtExpiresIn}m`
    });
  }
}
