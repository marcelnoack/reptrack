import { ManagedDTO } from "./Managed";


export interface UserDTO extends ManagedDTO {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInput extends ManagedDTO {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}