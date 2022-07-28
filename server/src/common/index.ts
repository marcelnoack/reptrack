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
enum SupportedHttpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export { ManagedDTO, SupportedHttpStatusCodes, ErrorHandler, Logger };
