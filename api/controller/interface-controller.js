import { query } from "../helper/query-promises.js";

export const setInterface = async (req, res) => {
  const { id_objet, nom_objet,video_nom , is_localisation, videos } = req.body;

  const checkTable = await query("SELECT * FROM objets WHERE id_objet=?", [
    id_objet,
  ]);
  const idObjetSelected = checkTable.map((row) => row.id_objet);

  try {
    if (!idObjetSelected[0]) {
      //insert

      await query(
        "INSERT INTO objets (id_objet,nom_objet,is_localisation) VALUES (?,?,?)",
        [id_objet, nom_objet, is_localisation]
      );
    }
    if (idObjetSelected[0]) {
      await query(
        "update objets set nom_objet=?, is_localisation=? WHERE id_objet=?",
        [nom_objet, is_localisation, id_objet]
      );
    }

    if (videos.length > 0) {
      videos.map(async (video) => {
        const reponseVideo = await query(
          "SELECT * from video_objets where id_video=?",
          [video.id_video]
        );
        const idVideoSelected = reponseVideo.map((row) => row.id_video);
        console.log(idVideoSelected);
        if (!idVideoSelected[0]) {
          await query(
            "insert into video_objets (id_objet,id_video) values (?,?)",
            [id_objet, video.id_video]
          );
          await query(
            "insert into nb_video_jour (id_nb,date_jour,nb_jouer,temps_total,id_objet_nb_video_jour) values (?,?,?,?,?)",
            [video.id_nd, video.date, video.nb, video.temps, video.id_video]
          );
        }
        await query("update video_objets set id_objet=? Where id_video=?", [
          id_objet,
          video.id_video,
        ]);
        await query(
          "update nb_video_jour set date_jour=?, nb_jouer=?,temps_total=? WHERE id_objet_nb_video_jour=?",
          [video.date, video.nb, video.temps, video.id_video]
        );
      });
    }
    res.status(200).json({ message: "All ok" });
  } catch (error) {
    console.log(error);
  }
};

export const getInterfaceReponse = async(req,res) =>{

}
