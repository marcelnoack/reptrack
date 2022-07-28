import { ManagedDTO } from "../../common";

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface UserDTO extends ManagedDTO {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInputDTO extends ManagedDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
