import express from "express";
import dotenv from "dotenv";
import { createPool } from "./db/mysql.js";
import interfaceRoutes from "./routes/interface-routes.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname + '/')));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

console.log(process.env.API_REACT_APP_URL);

app.use("/api", interfaceRoutes);

createPool()
  .then(() => {
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/miseAJourInterface", async (req, res) => {
  const { idObjet } = req.body;

  console.log(idObjet);
  try {
    const checkTable = await pool.query(`SELECT * FROM objets;`);
    console.log("Résultat de la requête:", checkTable);
  } catch (err) {
    console.error("Erreur lors de l'exécution de la requête SQL:", err);
    res.status(500).json({ error: "Erreur lors de la requête SQL" }); // Envoyer une réponse d'erreur
  }
});
