import { ManagedDTO } from '../../common';
import { ProviderDTO } from '../auth/authAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface UserDTO extends Partial<ManagedDTO> {
  userId: string;
  email: string;
  password?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  active: boolean;
  provider?: ProviderDTO;
}

export interface UserInputDTO extends Partial<ManagedDTO> {
  email: string;
  password?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  active?: boolean;
  provider?: ProviderDTO;
}

export type UserRelatedEntities = '';
