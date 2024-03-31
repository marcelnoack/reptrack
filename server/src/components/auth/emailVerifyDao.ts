import { BaseDAO } from '../../common';
import { query } from '../../common/db';
import { TableTypes } from '../../common/db/helper';
import { UserVerificationDTO } from './authAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class EmailVerifyDao
  implements BaseDAO<UserVerificationDTO, UserVerificationDTO, any>
{
  /* ---------------------------------------------------------------------------------------------- */
  public async create(
    newResource: UserVerificationDTO
  ): Promise<UserVerificationDTO> {
    await query(
      `
      INSERT INTO ${TableTypes.UserVerifyToken} (userid, token, expiry)
      VALUES ($1, $2, $3)
    `,
      [
        newResource.userId,
        newResource.emailVerificationToken,
        newResource.emailVerificationTokenExpiresAt
      ]
    );

    return newResource;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async update(
    id: string,
    updatedResource: UserVerificationDTO
  ): Promise<UserVerificationDTO> {
    await query(
      `
      UPDATE ${TableTypes.UserVerifyToken}
      SET token = $1, expiry = $2
      WHERE userid = $3
    `,
      [
        updatedResource.emailVerificationToken,
        updatedResource.emailVerificationTokenExpiresAt,
        id
      ]
    );

    return updatedResource;
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getById(id: string): Promise<UserVerificationDTO> {
    return {
      userId: '123',
      emailVerificationToken: '123',
      emailVerificationTokenExpiresAt: new Date()
    };
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getAll(id?: string): Promise<UserVerificationDTO[]> {
    return [];
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async delete(id: string): Promise<void> {
    await query(`DELETE FROM ${TableTypes.UserVerifyToken} WHERE userid = $1`, [
      id
    ]);
  }

  /* ---------------------------------------------------------------------------------------------- */
  public async getByUniqueProperty(
    uniquePropName: string,
    uniquePropValue: string,
    language: string
  ): Promise<UserVerificationDTO[] | undefined> {
    const result = await query(
      `SELECT token, expiry, userid FROM ${TableTypes.UserVerifyToken} WHERE ${uniquePropName} = $1`,
      [uniquePropValue]
    );

    return result.rows.map((r) => ({
      userId: r.userid,
      emailVerificationToken: r.token,
      emailVerificationTokenExpiresAt: r.expiry
    }));
  }
}
