import { ManagedDTO } from "./Managed";

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export interface UserDTO /*extends ManagedDTO*/ {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInputDTO /*extends ManagedDTO*/ {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}