import { query } from '../db';
import { UserDTO, UserInputDTO } from '../interfaces/User';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const create = async (newUser: UserInputDTO): Promise<UserDTO> => {
  const creationResult = await query(
    'INSERT INTO users (username, password) VALUES ($1, $2)',
    [newUser.username, newUser.password]
  );

  return Promise.resolve({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  });
};

const get = async (username: string): Promise<UserDTO | null> => {
  const result = await query(
    'SELECT username, email, firstname, lastname FROM users where username = $1',
    [username]
  );

  if(!result || !result.rows || !result.rows.length) {
    return null;
  }
  
  const user: UserDTO = {
    email: result.rows[0].email,
    username: result.rows[0].username,
    firstName: result.rows[0].firstname,
    lastName: result.rows[0].lastname
  }

  return user;
};

const getPassword = async(username: string): Promise<string> => {
  const result = await query(
    'SELECT password FROM users where username = $1',
    [username]
  );

  if(!result || !result.rows || !result.rows.length) {
    return '';
  }

  return result.rows[0].password;
}

export { create, get, getPassword };
