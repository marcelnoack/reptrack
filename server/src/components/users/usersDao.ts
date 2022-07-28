import { BaseDAO } from '../../common';
import { UserDTO, UserInputDTO } from './usersAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class UsersDao implements BaseDAO<UserDTO, UserInputDTO> {
  public async getAll(id?: string): Promise<UserDTO[]> {
    return [];
  }

  public async getById(id: string): Promise<UserDTO> {
    return {
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    //   const result = await query(
    //     'SELECT userid, username, email, firstname, lastname FROM users where username = $1',
    //     [username]
    //   );
    //   if (!result || !result.rows || !result.rows.length) {
    //     return null;
    //   }
    //   const user: UserDTO = {
    //     userId: result.rows[0].userid,
    //     email: result.rows[0].email,
    //     username: result.rows[0].username,
    //     firstName: result.rows[0].firstname,
    //     lastName: result.rows[0].lastname
    //   };
    //   return user;
  }

  public async create(newResource: UserInputDTO): Promise<void> {
    return;
    //   const creationResult = await query(
    //     'INSERT INTO users (username, password) VALUES ($1, $2)',
    //     [newUser.username, newUser.password]
    //   );
    //   return Promise.resolve({
    //     userId: 0,
    //     username: '',
    //     firstName: '',
    //     lastName: '',
    //     email: ''
    //   });
  }

  public async delete(id: string): Promise<void> {
    return;
  }

  public async update(
    id: string,
    updatedResource: UserInputDTO
  ): Promise<UserDTO> {
    return {
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      email: ''
    };
  }
}
