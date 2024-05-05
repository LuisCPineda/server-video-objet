import express from "express";
const app = express();
const port = 5000;

app.use(express.json());

try {
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
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/miseAJourInterface", (req, res) => {
  const idObjet = req.body.idObjet;
  const nomObjet = req.body.nomObjet;
  const localObjet = req.body.localObjet;
  const isLocalisation = req.body.isLocalisation;

//   const idNb = req.body.idNb;
//   const dateJour = req.body.dateJour;
//   const idNbVideoJour = req.body.idNbVideoJour;
//   const nbJouer = req.body.nbJouer;
//   const tempsTotal = req.body.tempsTotal;

  const idVideo = req.body.idVideo;
  const tailleVideo = req.body.tailleVideo;
  const md5Video = req.body.md5Video;
  const ordre = req.body.ordre;
  console.log(idObjet)
//   const checkTable = pool.query("SELECT * FROM objets WHERE id_objet=?", [
//     idObjet,
//   ]);
//   const idObjetSelected = checkTable.map((row) => row.id_objet);
//   if (!idObjetSelected) {
//     //insert
//     console.log("fais un insert");
//   }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
