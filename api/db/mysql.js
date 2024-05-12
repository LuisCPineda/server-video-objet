import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
let pool;

//Variables d'envirenment

const hostDb = process.env.API_DB_HOST;
const userDb = process.env.API_DB_HOST_DB_USER;
const passwordDb = process.env.API_DB_PASSWORD;
const portDb = process.env.API_DEB_PORT;

export const createPool = () => {
  return new Promise((resolve, reject) => {
    //Création de connexion pour développement et production
    pool = mysql.createPool({
      host: hostDb,
      user: userDb,
      password: passwordDb,
      database: "video_courant",
      port: portDb,
      ssl: {
        ca: process.env.DB_CERTIFICATE,
      },
    });

    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      if (connection) {
        connection.release();
        resolve();
      }
    });
  });
};

export const getPool = () => {
  if (!pool) {
    throw new Error("Pool not created");
  }
  return pool;
};
