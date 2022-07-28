import { SupportedHttpStatusCodes } from '..';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: SupportedHttpStatusCodes;
  public readonly isOperational: boolean;

  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name: string,
    httpCode: SupportedHttpStatusCodes,
    isOperational: boolean
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
