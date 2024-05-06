import express from "express";
import mysql from "mysql";

const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "video_courant",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/miseAJourInterface", async (req, res) => {
  const { idObjet } = req.body;

  console.log(idObjet);
  try {
    const checkTable = await db.query("select * from objets;");
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
