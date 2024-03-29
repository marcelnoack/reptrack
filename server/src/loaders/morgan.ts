import express from 'express';
import morgan, { StreamOptions } from 'morgan';
import { Logger } from '../common/Logger';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const stream: StreamOptions = {
  write: (message: string) => Logger.http(message)
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default ({ app }: { app: express.Application }) => {
  app.use(morganMiddleware);
};
