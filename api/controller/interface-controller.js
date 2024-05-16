import { query } from "../helper/query-promises.js";
import {fs} from "fs";
import {path} from "path";

export const setInterface = async (req, res) => {
  const {
    id_objet,
    nom_objet,
    nom_video_current,
    id_video_current,
    is_localisation,
    is_playing,
    is_stopping,
    video_suivante,
    videos,
  } = req.body;

  try {
    const checkTable = await query("SELECT * FROM objets WHERE id_objet=?", [
      id_objet,
    ]);
    const idObjetSelected = await checkTable.map((row) => row.id_objet);
    if (!idObjetSelected[0]) {
      //insert

      await query(
        "INSERT INTO objets (id_objet,nom_objet,is_localisation,id_video_current,nom_video_current) VALUES (?,?,?,?,?)",
        [
          id_objet,
          nom_objet,
          is_localisation,
          id_video_current,
          nom_video_current,
        ]
      );
    }
    if (idObjetSelected[0]) {
      await query(
        "update objets set nom_objet=?, is_localisation=? ,id_video_current=?,nom_video_current=?,is_playing=?,is_stopping=?,video_suivante=? WHERE id_objet=?",
        [
          nom_objet,
          is_localisation,
          id_video_current,
          nom_video_current,
          is_playing,
          is_stopping,
          video_suivante,
          id_objet,
        ]
      );
    }

    if (videos.length > 0) {
      videos.map(async (video) => {
        video.map(async (vid) => {
          const reponseVideo = await query(
            "SELECT * from video_objets where id_video=?",
            [vid[0]]
          );
          const idVideoSelected = reponseVideo.map((row) => row.id_video);

          if (!idVideoSelected[0]) {
            await query(
              "insert into video_objets (id_objet,id_video,nom_video) values (?,?,?)",
              [id_objet, vid[0], vid[5]]
            );
            await query(
              "insert into nb_video_jour (id_nb,nb_jouer,temps_total,id_objet_nb_video_jour) values (?,?,?,?)",
              [vid[1], vid[3], vid[4], vid[0]]
            );
          }
          await query(
            "update video_objets set id_objet=?,nom_video=? Where id_video=?",
            [id_objet, vid[5], vid[0]]
          );
          await query(
            "update nb_video_jour set nb_jouer=?,temps_total=? WHERE id_objet_nb_video_jour=?",
            [vid[3], vid[4], vid[0]]
          );
        });
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

export const getListVideo = async (req, res) => {
  try {
    const request = "select id_video,id_objet,nom_video from video_objets";
    const response = await query(request);

    res.status(200).json(response);
  } catch (error) {}
};

export const setIsPlayingVideo = async (req, res) => {
  const { is_playing, is_stopping, id_objet } = req.body;
  try {
    const request =
      "update objets set is_playing=?,is_stopping=? Where id_objet=?";
    await query(request, [is_playing, is_stopping, id_objet]);
    res.status(201).json({ message: "All ok setIsPlayingVideo" });
  } catch (erreur) {}
};

export const getIsPlayingVideo = async (req, res) => {
  const { is_playing, id_objet } = req.body;
  try {
    const request = "select is_playing from objets Where id_objet=?";
    const response = await query(request, [is_playing, id_objet]);
    res.status(200).json(response);
  } catch (erreur) {}
};

export const setIsLocation = async (req, res) => {
  const { is_localisation, id_objet } = req.body;
  try {
    const request = "update objets set is_localisation=? Where id_objet=?";
    await query(request, [is_localisation, id_objet]);
    res.status(201).json({ message: "All ok setIsPlayingVideo" });
  } catch (erreur) {}
};

export const getIsLocation = async (req, res) => {
  const { is_localisation, id_objet } = req.body;
  try {
    const request = "select is_localisation from objets Where id_objet=?";
    const response = await query(request, [is_localisation, id_objet]);
    res.status(200).json(response);
  } catch (erreur) {}
};

export const setVideoSuivante = async (req, res) => {
  const { video_suivante, id_objet } = req.body;
  try {
    const request = "update objets set video_suivante=? Where id_objet=?";
    await query(request, [video_suivante, id_objet]);
    res.status(201).json({ message: "All ok setVideoSuivante" });
  } catch (erreur) {}
};

export const getVideoSuivante = async (req, res) => {
  const { video_suivante, id_objet } = req.body;
  try {
    const request = "select video_suivante from objets Where id_objet=?";
    const response = await query(request, [video_suivante, id_objet]);
    res.status(200).json(response);
  } catch (erreur) {}
};

export const insertNewVideo = async (req, res) => {
  const nom_video = req.file.originalname;
  const taille_video = req.file.size;
  console.log(nom_video);
  try {
    await query(
      "insert into video_download (nom_video,taille_video) values (?,?)",
      [nom_video, taille_video]
    );
    await query("update objets set download=? Where id_objet=?", [
      true,
      "123456789",
    ]);
    res.status(201).json({ message: "All ok insertNewVideo" });
  } catch (error) {}
};

export const download_video = async (req, res) => {
  
  try{
    const request = 'SELECT * from video_download'
    const response = await query(request)
    const nom_video = await response.map((row) => row.nom_video)[0];
    const taille_video = await response.map((row) => row.taille_video)[0];
    console.log(nom_video,taille_video)
  }catch(error){

  }
  
 
  const filePath = path.join(__dirname, "../videos", nom_video);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(400).send("Video file does not exist");
    } else {
      res.download(filePath);
    }
  });
};
