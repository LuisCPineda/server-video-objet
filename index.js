import express from "express";
import mysql from "mysql";
const app = express();
const port = 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Tannery",
  database: "video_courant",
  port: 3306
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("erreur connexion db");
  }
  if (connection) {
    connection.release();
    console.log("connexion db reussie");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/miseAJourInterface", async (req, res) => {
  const { idObjet } = req.body;
  const nomObjet = req.body.nomObjet;
  const localObjet = req.body.localObjet;
  const isLocalisation = req.body.isLocalisation;

  const idNb = req.body.idNb;
  const dateJour = req.body.dateJour;
  const idNbVideoJour = req.body.idNbVideoJour;
  const nbJouer = req.body.nbJouer;
  const tempsTotal = req.body.tempsTotal;

  const idVideo = req.body.idVideo;
  const tailleVideo = req.body.tailleVideo;
  const md5Video = req.body.md5Video;
  const ordre = req.body.ordre;

  console.log(idObjet);
  const checkTable = await pool.query("SELECT * FROM objets WHERE id_objet=?", [
    idObjet,
  ]);
  console.log(await checkTable)
  const idObjetSelected = checkTable.map((row) => row.id_objet);
  if (!idObjetSelected) {
    //insert
    console.log("fais un insert");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
