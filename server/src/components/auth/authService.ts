import { compare, hash } from 'bcryptjs';
import { Profile } from 'passport';

import { Api401Error, Api500Error } from '../../common/errors';
import { UserDTO, UserInputDTO } from '../users/usersAPI';
import UsersDao from '../users/usersDao';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class AuthService {
  private _usersDao: UsersDao;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(usersDao?: UsersDao) {
    if (!usersDao) {
      this._usersDao = new UsersDao();
    } else {
      this._usersDao = usersDao;
    }
  }

  public signUp = async (user: UserInputDTO): Promise<string> => {
    // generate hashed password for user
    const hashedPassword: string = await hash(user.password ?? '', 10);
    const newUser: UserInputDTO = {
      ...user,
      password: hashedPassword,
      createdBy: user.email,
      lastChangedBy: user.email
    };
    // call dao to create user
    const createdUser: UserDTO = await this._usersDao.create(newUser);
    return createdUser.userId;
  };

  /* ---------------------------------------------------------------------------------------------- */
  public signInLocal = async (
    email: string,
    password: string
  ): Promise<UserDTO> => {
    const dbUser: UserDTO[] | undefined =
      await this._usersDao.getByUniqueProperty('email', email, 'en');

    if (!dbUser) {
      throw new Api401Error('User Credentials are not correct');
    }

    if (!password || !dbUser[0].password) {
      throw new Api500Error('Something went wrong while trying to sign you in');
    }

    const isValidPassword = await compare(password, dbUser[0].password);

    if (!isValidPassword) {
      throw new Api401Error('User credentials are not correct');
    }

    //! Delete sensitive information like the password inside the auth tokens
    delete dbUser[0]['password'];
    return dbUser[0];
  };

  /* ---------------------------------------------------------------------------------------------- */
  public authenticateGoogle = async (
    profile: Profile
  ): Promise<UserDTO | undefined> => {
    const { emails, name, photos, displayName, id } = profile;

    if (!emails?.length || !photos?.length) {
      throw new Api500Error(
        'Something went wrong while authenticating your google profile'
      );
    }

    const dbUser: UserDTO[] | undefined =
      await this._usersDao.getByUniqueProperty('email', emails[0].value, 'en');

    if (dbUser && dbUser[0] && dbUser[0].provider) {
      return dbUser[0];
    }

    const userInputDTO: UserInputDTO = {
      email: emails[0].value,
      firstName: name?.givenName ?? '',
      middleName: name?.middleName,
      lastName: name?.familyName ?? '',
      provider: {
        providerName: 'google',
        googleId: id,
        picture: photos[0].value,
        displayName: displayName
      }
    };

    return await this._usersDao.create(userInputDTO);
  };
}
