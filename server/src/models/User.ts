import { query } from '../db';
import { UserDTO, UserInput } from '../interfaces/User';

const create = async (newUser: UserInput): Promise<UserDTO> => {
  const test = query('INSERT INTO users');

  return Promise.resolve({
    userId: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: new Date(),
    createdBy: '',
    lastChangedAt: new Date(),
    lastChangedBy: ''
  });
};

export { create };
