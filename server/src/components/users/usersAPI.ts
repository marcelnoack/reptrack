import { ManagedDTO } from '../../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface UserDTO extends Partial<ManagedDTO> {
  userId: string;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
}

export interface UserInputDTO extends Partial<ManagedDTO> {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserRelatedEntities = '';
