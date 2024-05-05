import { getPool } from "../database/mysql.js";

export const setInterface = async (req, res) => {
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

  const pool = getPool();
  
  const checkTable = pool.query("SELECT * FROM objets WHERE id_objet=?", [
    idObjet,
  ]);
  const idObjetSelected = checkTable.map((row) => row.id_objet);
  console.log(idObjetSelected)
  if (!idObjetSelected) {
    //insert
    console.log("fais un insert");
  }
};
