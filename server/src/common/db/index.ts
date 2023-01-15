import { Client, Pool, QueryConfig, QueryResult } from 'pg';

import config from '../../config';
import { Api500Error } from '../errors';
import { Logger } from '..';

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
      throw new Api500Error('Could not establish a database connection');
    } else {
      Logger.info('Database connection established successfully');
    }
    client.end();
  });
};

/* ---------------------------------------------------------------------------------------------- */
export { query, checkDbConnection };
