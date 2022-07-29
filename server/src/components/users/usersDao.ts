import { QueryResult } from 'pg';
import { BaseDAO } from '../../common';
import { query } from '../../common/db';
import { Api500Error } from '../../common/errors';
import { UserDTO, UserInputDTO } from './usersAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class UsersDao implements BaseDAO<UserDTO, UserInputDTO> {
  /* ---------------------------------------------------------------------------------------------- */
  public async getAll(id?: string): Promise<UserDTO[]> {
    return [];
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getById(id: string): Promise<UserDTO> {
    const result = await query(
      'SELECT userid, username, password, email, firstname, lastname FROM users where userid = $1',
      [id]
    );

    if (!result || !result.rows || !result.rows.length) {
      throw new Api500Error(
        'Something went wrong while trying to access user data'
      );
    }
    const user: UserDTO = {
      userId: result.rows[0].userid,
      email: result.rows[0].email,
      password: result.rows[0].password,
      username: result.rows[0].username,
      firstName: result.rows[0].firstname,
      lastName: result.rows[0].lastname
    };
    return user;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async create(newResource: UserInputDTO): Promise<string> {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      createdBy,
      lastChangedBy
    } = newResource;
    const creationResult: QueryResult<any> = await query(
      'INSERT INTO users (username, firstName, lastName, email, password, createdBy, lastChangedBy, createdAt, lastChangedAt)' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
      [username, firstName, lastName, email, password, createdBy, lastChangedBy]
    );

    if (creationResult.rowCount !== 1) {
      throw new Api500Error('Something went wrong while creating a new user');
    }

    return creationResult.rows[0].userid;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async delete(id: string): Promise<void> {
    return;
  }

  /* ---------------------------------------------------------------------------------------------- */
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

  /* ---------------------------------------------------------------------------------------------- */
  public async getByUniqueProperty(
    uniquePropName: string,
    uniquePropValue: string
  ): Promise<UserDTO> {
    if (uniquePropName !== 'username' && uniquePropName !== 'email') {
      throw new Error('No valid unique property provided for USER');
    }

    const result = await query(
      `SELECT userid, username, email, password, firstname, lastname, createdAt, createdBy, lastChangedAt, lastChangedBy FROM users where ${uniquePropName} = $1`,
      [uniquePropValue]
    );

    if (!result || !result.rows || !result.rows.length) {
      throw new Api500Error(
        'Something went wrong while trying to access user data'
      );
    }
    const user: UserDTO = {
      userId: result.rows[0].userid,
      email: result.rows[0].email,
      username: result.rows[0].username,
      password: result.rows[0].password,
      firstName: result.rows[0].firstname,
      lastName: result.rows[0].lastname,
      createdAt: result.rows[0].createdat,
      createdBy: result.rows[0].createdby,
      lastChangedAt: result.rows[0].lastchangedat,
      lastChangedBy: result.rows[0].lastchangedby
    };
    return user;
  }
}
