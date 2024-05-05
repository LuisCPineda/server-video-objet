import mysql from "mysql";

let pool;

export const createPool = () => {
  return new Promise((resolve, reject) => {
    //Création de connexion pour développement et production
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "Tannery",
      database: "video_courant",
    });

    pool.getConnection((err, connection) => {
      if (err) {
        console.log("erreur connexion db");
        reject(err);
      }
      if (connection) {
        connection.release();
        console.log("connexion db reussie");
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
