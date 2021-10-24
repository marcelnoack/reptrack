import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(`/${config.api.prefix}`, routes());
};
