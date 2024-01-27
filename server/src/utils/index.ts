import { Api403Error } from '../common/errors';
import { Logger } from '../common';
import config from '../config';

export const corsDefaultHandler = (origin: any, callback: any) => {
  Logger.info(`Request from ${origin}`);

  Logger.info('I AM NEW!!!!!!!!!!!!!!!!!!!!');

  const whiteList = [config.clientUrl, `${config.clientUrl}/`];
  if (origin && whiteList.indexOf(origin) !== -1) {
    return callback(null, true);
  }
  return callback(new Api403Error(`Origin ${origin} not allowed by CORS`));
};
