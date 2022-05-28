import { Client, Pool, QueryConfig, QueryResult } from 'pg';

import config from '../config';
import Logger from '../loaders/logger';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

let _pool: Pool = new Pool();
if (process.env.NODE_ENV !== 'development') {
  _pool = new Pool({
    connectionString: config.dbConnectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
}
_pool.on('connect', () => {
  Logger.info('Database connection established successfully.');
});

/* ---------------------------------------------------------------------------------------------- */
const query = (
  text: string | QueryConfig<any>,
  params?: any
): Promise<QueryResult<any>> => {
  return _pool.query(text, params);
};

/* ---------------------------------------------------------------------------------------------- */
const checkDbConnection = async (): Promise<void> => {
  let client = new Client();
  if (process.env.NODE_ENV !== 'development') {
    client = new Client({
      connectionString: config.dbConnectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  await client.connect();
  return client.query('SELECT NOW() as now', (err) => {
    if (err) {
      Logger.error('Could not establish a database connection');
      Logger.error('Reason:', err.stack);
    } else {
      Logger.info('Database connection established successfully');
    }
    client.end();
  });
};

/* ---------------------------------------------------------------------------------------------- */
export { query, checkDbConnection };
