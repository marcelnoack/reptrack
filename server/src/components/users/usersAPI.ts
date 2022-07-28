import { ManagedDTO } from '../../common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface UserDTO extends Partial<ManagedDTO> {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInputDTO extends Partial<ManagedDTO> {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
