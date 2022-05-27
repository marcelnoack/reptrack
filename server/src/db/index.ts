import { Pool, QueryConfig, QueryResult } from 'pg';

import Logger from '../loaders/logger';


const _pool = new Pool();
_pool.on('connect', () => {
  Logger.info('Database connection established successfully.');
});

const query = (
  text: string | QueryConfig<any>,
  params?: any
): Promise<QueryResult<any>> => {
  return _pool.query(text, params);
};

export {
  query
};
