import { ErrorHandler } from './ErrorHandler';
import { Logger } from './Logger';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

interface ManagedDTO {
  createdAt: Date;
  createdBy: string;
  lastChangedAt: Date;
  lastChangedBy: string;
}

/* ---------------------------------------------------------------------------------------------- */
interface BaseDAO<T, InputT> {
  getAll: (userId?: string) => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (newResource: InputT) => Promise<string>;
  update: (id: string, updatedResource: InputT) => Promise<T>;
  delete: (id: string) => Promise<void>;
  getByUniqueProperty?: (
    uniquePropName: string,
    uniquePropValue: string
  ) => Promise<T>;
}

/* ---------------------------------------------------------------------------------------------- */
enum SupportedHttpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export { ManagedDTO, BaseDAO, SupportedHttpStatusCodes, ErrorHandler, Logger };
