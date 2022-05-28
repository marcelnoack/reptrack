import express from 'express';
import cors from 'cors';

import config from '../config';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use(`/${config.api.prefix}`, routes());

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
  return app;
};
