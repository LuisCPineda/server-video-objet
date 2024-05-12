import { getPool } from "../db/mysql.js";

// Helper function to create a promise-based query, since the mysql library uses callbacks.
// Will probably be deleted if we switch to mysql2.

export function query(sql, params) {
  const pool = getPool();
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results, fields) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}