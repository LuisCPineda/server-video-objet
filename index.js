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
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  connection.release();
  console.log("Connexion à la base de données réussie");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/miseAJourInterface", async (req, res) => {
  const { idObjet } = req.body;

  console.log(idObjet);
  try {
    const checkTable = await pool.query(
      "select * from objets;"
    );
    console.log("Résultat de la requête:", checkTable);
    res.json(checkTable); // Envoyer la réponse JSON
  } catch (err) {
    console.error("Erreur lors de l'exécution de la requête SQL:", err);
    res.status(500).json({ error: "Erreur lors de la requête SQL" }); // Envoyer une réponse d'erreur
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});