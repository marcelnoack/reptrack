import express from 'express';

import config from './config';
import { Logger } from './common';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

const startServer = async () => {
  const app = express();

  const loaders = await import('./loaders');
  loaders.default({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`Express-Server listening on port: ${config.port}`);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
};

startServer();
