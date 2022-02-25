import { Pool, Client } from 'pg';

export default async () => {
  const pool = new Pool();

  pool.query('SELECT NOW()', (err, res) => {
    pool.end();
  });

  const client = new Client();
  await client.connect();

  const res = await client.query('SELECT NOW()');
  await client.end();
};