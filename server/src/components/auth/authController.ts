import { NextFunction, Request, Response } from 'express';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class AuthController {
  /* ---------------------------------------------------------------------------------------------- */
  public static async signIn(req: Request, res: Response, next: NextFunction) {
    //   const user = await User.get(req.body.user.username);
    //   if (!user) {
    //     return res.status(404).send('User does not exist');
    //   }
    //   const hashedPassword = await User.getPassword(req.body.user.username);
    //   const isValidPassword = await compare(
    //     req.body.user.password,
    //     hashedPassword
    //   );
    //   if (!isValidPassword) {
    //     return res.status(401).send('User credentials are not correct');
    //   }
    //   const tokenObject: TokenObject = authService.signIn(user);
    //   return res.json(tokenObject);
  }

  /* ---------------------------------------------------------------------------------------------- */
  public static async signUp(req: Request, res: Response, next: NextFunction) {
    //   // TODO: Validation for user object
    //   const hashedPassword = await hash(req.body.user.password, 10);
    //   const newUser: UserInputDTO = {
    //     username: req.body.user.username,
    //     password: hashedPassword,
    //     firstName: '',
    //     lastName: '',
    //     email: ''
    //   };
    //   await User.create(newUser);
    //   return res.status(200).send('Created');
  }

  /* ---------------------------------------------------------------------------------------------- */
  public static async renew(req: Request, res: Response, next: NextFunction) {
    //   const currentRefreshTokens: string[] = authService.getRefreshTokens();
    //   if (!currentRefreshTokens.includes(req.body.refreshToken)) {
    //     return res.status(400).send('Refresh Token Invalid');
    //   }
    //   const user: UserDTO = authService.getUserInfoFromToken(
    //     req.body.refreshToken
    //   );
    //   authService.removeRefreshToken(req.body.refreshToken);
    //   return res.json(authService.signIn(user));
  }
}
