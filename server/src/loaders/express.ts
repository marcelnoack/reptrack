import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import routes from '../api';
// import config from '../config';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());

  app.use(bodyParser.json());

  // app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  // app.use((req, res, next) => {
  //   const err: Error = new Error('Not Found');
  //   err['status'] = 404;
  //   next(err);
  // });

  // // error handlers
  // app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //   res.status(err.status || 500);
  //   res.json({
  //     errors: {
  //       message: err.message
  //     }
  //   });
  // });
};
