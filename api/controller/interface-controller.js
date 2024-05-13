import { query } from "../helper/query-promises.js";

export const setInterface = async (req, res) => {
  const { id_objet, nom_objet,nom_video_current, id_video_current, is_localisation, videos } =
    req.body;
    console.log(videos)
  

  try {
    const checkTable = await query("SELECT * FROM objets WHERE id_objet=?", [
      id_objet,
    ]);
    const idObjetSelected = await checkTable.map((row) => row.id_objet);
    if (!idObjetSelected[0]) {
      //insert

      await query(
        "INSERT INTO objets (id_objet,nom_objet,is_localisation,id_video_current,nom_video_current) VALUES (?,?,?,?,?)",
        [id_objet, nom_objet, is_localisation, id_video_current,nom_video_current]
      );
    }
    if (idObjetSelected[0]) {
      await query(
        "update objets set nom_objet=?, is_localisation=? ,id_video_current=?,nom_video_current=? WHERE id_objet=?",
        [nom_objet, is_localisation, id_video_current,nom_video_current , id_objet]
      );
    }

    if (videos.length > 0) {
      videos.map(async (video) => {
        const reponseVideo = await query(
          "SELECT * from video_objets where id_video=?",
          [video[1]]
        );
        const idVideoSelected = reponseVideo.map((row) => row.id_video);
        
        if (!idVideoSelected[0]) {
          await query(
            "insert into video_objets (id_objet,id_video) values (?,?)",
            [id_objet, video[1]]
          );
          await query(
            "insert into nb_video_jour (id_nb,nb_jouer,temps_total,id_objet_nb_video_jour) values (?,?,?,?,?)",
            [video[0], video[2], video[3], video[1]]
          );
        }
        await query("update video_objets set id_objet=? Where id_video=?", [
          id_objet,
          video[1],
        ]);
        await query(
          "update nb_video_jour set nb_jouer=?,temps_total=? WHERE id_objet_nb_video_jour=?",
          [ video[2], video[3], video[1]]
        );
      });
    }
    res.status(201).json({ message: "All ok" });
  } catch (error) {
    console.log(error);
  }
};

export const getInterfaceReponse = async (req, res) => {
  
  try {
    const responseInter = await query("select * from objets");
    const idVideoSelected = responseInter.map((row) => row.id_video_current);
    
    const reponseInfoVideo = await query(
      "select date_jour,nb_jouer,temps_total from nb_video_jour where id_objet_nb_video_jour=?",
      [idVideoSelected]
    );
    
    const date_jourSelected = reponseInfoVideo.map((row) => row.date_jour);
    const nb_jouerSelected = reponseInfoVideo.map((row) => row.nb_jouer);
    const temps_totalSelected = reponseInfoVideo.map((row) => row.temps_total);
    responseInter[0]["nb_jouer"] = nb_jouerSelected;
    responseInter[0]["date_jour"] = date_jourSelected;
    responseInter[0]["temps_total"] = temps_totalSelected;
    
    res.status(200).json(responseInter);
  } catch (error) {}
};
