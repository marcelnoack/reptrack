import { Pool, QueryConfig, QueryResult } from 'pg';

import config from '../config';
import Logger from '../loaders/logger';

let _pool: Pool;
if(process.env.NODE_ENV === "development") {
  _pool = new Pool();
} else {
  _pool = new Pool({
    connectionString: config.dbConnectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
}
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
