import { QueryResult } from 'pg';

import { BaseDAO } from '../../common';
import { query } from '../../common/db';
import { ProviderDTO } from '../auth/authAPI';
import { Api400Error, Api500Error } from '../../common/errors';
import { Api409Error } from '../../common/errors/Api409Error';
import {
  GENERAL_RESOURCE_CREATION_ERROR,
  USER_EXISTS
} from '../../common/i18n/errors';
import { UserDTO, UserInputDTO, UserRelatedEntities } from './usersAPI';
import { TableTypes } from '../../common/db/helper';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export default class UsersDao
  implements BaseDAO<UserDTO, UserInputDTO, UserRelatedEntities>
{
  private _propertyMapping: Record<string, string> = {
    // userId: 'userid',
    email: 'email',
    password: 'password',
    firstName: 'firstname',
    middleName: 'middlename',
    lastName: 'lastname',
    active: 'active'
  };

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
      // throw new Api500Error(
      //   'Something went wrong while trying to access user data'
      // );
    }
    const user: UserDTO = {
      userId: result.rows[0].userid,
      email: result.rows[0].email,
      password: result.rows[0].password,
      firstName: result.rows[0].firstname,
      middleName: result.rows[0]?.middleName || '',
      lastName: result.rows[0].lastname,
      active: result.rows[0].active
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
        // throw new Api500Error('Something went wrong while creating a new user');
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
          // throw new Api500Error(
          //   'Something went wrong while creating a new google profile'
          // );
        }

        return {
          email: creationResult.rows[0].email,
          userId: creationResult.rows[0].userid,
          firstName: creationResult.rows[0].firstname,
          middleName: creationResult.rows[0].middlename,
          lastName: creationResult.rows[0].lastName,
          createdAt: creationResult.rows[0].createdat,
          lastChangedAt: creationResult.rows[0].lastchangedat,
          active: creationResult.rows[0].active,
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
        throw new Api409Error(USER_EXISTS);
      }

      throw new Api500Error(GENERAL_RESOURCE_CREATION_ERROR);
    }

    return {
      email: creationResult.rows[0].email,
      userId: creationResult.rows[0].userid,
      firstName: creationResult.rows[0].firstname,
      middleName: creationResult.rows[0].middlename,
      lastName: creationResult.rows[0].lastName,
      createdAt: creationResult.rows[0].createdat,
      lastChangedAt: creationResult.rows[0].lastchangedat,
      active: creationResult.rows[0].active
    };
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async delete(id: string): Promise<void> {
    return;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async update(
    id: string,
    updatedResource: Partial<UserInputDTO>
  ): Promise<UserDTO> {
    const updateQueryString = Object.keys(updatedResource)
      .map((key, index) => {
        if (!this._propertyMapping[key]) {
          throw new Api400Error(
            'usersDao::update::Invalid property provided for USER'
          );
        }

        return `${this._propertyMapping[key]} = $${index + 1}`;
      })
      .join(', ');

    const updatedResult = await query(
      `UPDATE ${TableTypes.User} SET ${updateQueryString} WHERE userid = $${
        Object.keys(updatedResource).length + 1
      } RETURNING *`,
      [...Object.values(updatedResource), id]
    );

    if (!updatedResult || !updatedResult.rows || !updatedResult.rows.length) {
      throw new Api500Error('Something went wrong while updating user data');
    }

    return {
      userId: updatedResult.rows[0].userid,
      email: updatedResult.rows[0].email,
      password: updatedResult.rows[0].password,
      firstName: updatedResult.rows[0].firstname,
      middleName: updatedResult.rows[0]?.middleName,
      lastName: updatedResult.rows[0].lastname,
      createdAt: updatedResult.rows[0].createdat,
      createdBy: updatedResult.rows[0].createdby,
      lastChangedAt: updatedResult.rows[0].lastchangedat,
      lastChangedBy: updatedResult.rows[0].lastchangedby,
      active: updatedResult.rows[0].active
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
      `SELECT userid, email, password, firstname, middleName, lastname, active, createdAt, createdBy, lastChangedAt, lastChangedBy FROM users where ${uniquePropName} = $1`,
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
      active: result.rows[0].active,
      provider
    };

    return [user];
  }
}
