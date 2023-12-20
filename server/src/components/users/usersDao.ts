import { QueryResult } from 'pg';

import { BaseDAO } from '../../common';
import { query } from '../../common/db';
import { Api500Error } from '../../common/errors';
import { Api409Error } from '../../common/errors/Api409Error';
import { UserDTO, UserInputDTO, UserRelatedEntities } from './usersAPI';
import { ProviderDTO } from '../auth/authAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class UsersDao
  implements BaseDAO<UserDTO, UserInputDTO, UserRelatedEntities>
{
  /* ---------------------------------------------------------------------------------------------- */
  public async getAll(id?: string): Promise<UserDTO[]> {
    return [];
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getById(id: string): Promise<UserDTO> {
    const result = await query(
      'SELECT userid, password, email, firstname, middleName, lastname FROM users where userid = $1',
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
      firstName: result.rows[0].firstname,
      middleName: result.rows[0]?.middleName || '',
      lastName: result.rows[0].lastname
    };
    return user;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async create(newResource: UserInputDTO): Promise<UserDTO> {
    const { firstName, middleName, lastName, email, password, provider } =
      newResource;
    let creationResult: QueryResult<any>;
    let googleCreationResult: QueryResult<any>;
    try {
      creationResult = await query(
        'INSERT INTO users (firstName, middleName, lastName, email, password, createdAt, lastChangedAT)' +
          'VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
        [firstName, middleName, lastName, email, password ?? '']
      );

      if (creationResult.rowCount !== 1) {
        throw new Api500Error('Something went wrong while creating a new user');
      }

      if (provider && provider.providerName === 'google') {
        googleCreationResult = await query(
          `INSERT INTO googleprofile (userid, googleid, displayname, pictureurl, createdat, lastChangedAt)
                VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`,
          [
            creationResult.rows[0].userid,
            provider.googleId,
            provider.displayName,
            provider.picture
          ]
        );

        if (googleCreationResult.rowCount !== 1) {
          throw new Api500Error(
            'Something went wrong while creating a new google profile'
          );
        }

        return {
          email: creationResult.rows[0].email,
          userId: creationResult.rows[0].userid,
          firstName: creationResult.rows[0].firstname,
          middleName: creationResult.rows[0].middlename,
          lastName: creationResult.rows[0].lastName,
          createdAt: creationResult.rows[0].createdat,
          lastChangedAt: creationResult.rows[0].lastchangedat,
          provider: {
            providerName: 'google',
            googleId: googleCreationResult.rows[0].googleid,
            displayName: googleCreationResult.rows[0].displayname,
            picture: googleCreationResult.rows[0].picture
          }
        };
      }
    } catch (err) {
      if (
        err instanceof Error &&
        err.message?.indexOf('duplicate key') !== -1
      ) {
        throw new Api409Error('The user already exists.');
      }

      throw new Api500Error('Something went wrong while creating a new user');
    }

    return {
      email: creationResult.rows[0].email,
      userId: creationResult.rows[0].userid,
      firstName: creationResult.rows[0].firstname,
      middleName: creationResult.rows[0].middlename,
      lastName: creationResult.rows[0].lastName,
      createdAt: creationResult.rows[0].createdat,
      lastChangedAt: creationResult.rows[0].lastchangedat
    };
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
      firstName: '',
      middleName: '',
      lastName: '',
      email: ''
    };
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getByUniqueProperty(
    uniquePropName: string,
    uniquePropValue: string,
    language = 'en'
  ): Promise<UserDTO[] | undefined> {
    if (uniquePropName !== 'email') {
      throw new Error('No valid unique property provided for USER');
    }

    const result = await query(
      `SELECT userid, email, password, firstname, middleName, lastname, createdAt, createdBy, lastChangedAt, lastChangedBy FROM users where ${uniquePropName} = $1`,
      [uniquePropValue]
    );

    if (!result || !result.rows || !result.rows.length) {
      return undefined;
    }

    const relatedProviderResult = await query(
      `SELECT google.googleid, google.displayname, google.pictureurl
        FROM users
        JOIN googleprofile AS google ON google.userid = users.userid WHERE users.${uniquePropName} = $1`,
      [uniquePropValue]
    );

    let provider: ProviderDTO | undefined;

    if (relatedProviderResult?.rows?.length) {
      // TODO: when more providers are added, check for ids and apply name
      provider = {
        providerName: 'google',
        googleId: relatedProviderResult.rows[0].googleid,
        displayName: relatedProviderResult.rows[0].displayname,
        picture: relatedProviderResult.rows[0].pictureurl
      };
    }

    const user: UserDTO = {
      userId: result.rows[0].userid,
      email: result.rows[0].email,
      password: result.rows[0].password,
      firstName: result.rows[0].firstname,
      middleName: result.rows[0]?.middleName,
      lastName: result.rows[0].lastname,
      createdAt: result.rows[0].createdat,
      createdBy: result.rows[0].createdby,
      lastChangedAt: result.rows[0].lastchangedat,
      lastChangedBy: result.rows[0].lastchangedby,
      provider
    };

    return [user];
  }
}
