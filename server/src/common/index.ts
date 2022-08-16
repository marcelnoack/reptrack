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
interface BaseDAO<T, InputT, RelatedT> {
  getAll: (userId: string, language: string) => Promise<T[]>;
  getById: (id: string) => Promise<T | undefined>;
  create: (newResource: InputT) => Promise<string>;
  update: (id: string, updatedResource: InputT) => Promise<T>;
  delete: (id: string) => Promise<void>;
  getByUniqueProperty?: (
    uniquePropName: string,
    uniquePropValue: string,
    language: string
  ) => Promise<T[]>;
  getRelated?: (
    relatedEntity: RelatedT,
    id: string,
    language: string
  ) => Promise<any>;
}

/* ---------------------------------------------------------------------------------------------- */
enum SupportedHttpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500
}

export { ManagedDTO, BaseDAO, SupportedHttpStatusCodes, ErrorHandler, Logger };
