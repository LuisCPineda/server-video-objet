import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nomObjet, setNomObjet] = useState("");
  const [localisation, setLocalisation] = useState(false);
  const [nomVideo, setNomVideo] = useState("");
  const [date, setDate] = useState("");
  const [nbJouer, setNbJouer] = useState("");
  const [tempsTotal, setTempsTotal] = useState("");
  const [listVideo, setListeVideo] = useState([]);

  useEffect(() => {
    // Fonction pour effectuer la requête GET
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://20.193.147.114:3000/api/getInterface`,
          {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Content-Type": "application/json",
            },
          }
        );
        const objetJson = await response.json();
        setNomObjet(objetJson[0].nom_objet);
        if (objetJson[0].is_localisation === 1) {
          setLocalisation(true);
        } else if (objetJson[0].is_localisation === 0) {
          setLocalisation(false);
        }

        setNomVideo(objetJson[0].nom_video_current);
        setDate(objetJson[0].date_jour);
        setNbJouer(objetJson[0].nb_jouer);
        setTempsTotal(objetJson[0].temps_total);
        fetchList();
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    // Appeler la fonction fetchData immédiatement au montage du composant
    fetchData();

    // Mettre en place un intervalle pour rappeler la fonction fetchData toutes les 10 secondes
    const intervalId = setInterval(fetchData, 2000);

    // Nettoyer l'intervalle lors du démontage du composant pour éviter les fuites de mémoire
    return () => clearInterval(intervalId);
  }, []); // Le tableau

  const fetchList = async () => {
    try {
      const response = await fetch(
        `http://20.193.147.114:3000/api/getListVideo`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        }
      );
      const objetJson = await response.json();

      setListeVideo(objetJson);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const onClickIsLocalisation = async () => {
    try {
      const response = await fetch(
        `http://20.193.147.114:3000/api/setIsLocation`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_localisation: true,
            id_objet: "123456789",
          }),
        }
      );
    } catch (err) {}
  };
  const onClickIsPlaying = async (is_playing, is_stopping) => {
    try {
      const response = await fetch(
        `http://20.193.147.114:3000/api/setIsPlayingVideo`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_playing: is_playing,
            is_stopping: is_stopping,
            id_objet: "123456789",
          }),
        }
      );
    } catch (err) {}
  };
  const onClickVideoSuivante = async () => {
    try {
      const response = await fetch(
        `http://20.193.147.114:3000/api/setVideoSuivante`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_suivante: true,
            id_objet: "123456789",
          }),
        }
      );
    } catch (err) {}
  };
  const inputAddVideo = async (event) => {
    console.log("test");
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const test = `http://localhost:3000/api/addVideo`;
    const url = `http://20.193.147.114:3000/api/addVideo`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        body: formData,
      });
      console.log("test");
    } catch (err) {}
  };

  const onClickDeleteVideo = async (id_video) => {
    console.log(id_video);
  };

  return (
    <div className="App">
      <div class="HeaderDiv">
        <h1>lecteur vidéos</h1>
      </div>
      <div class="BodyDiv">
        <div class="StatisticsDiv">
          <div>
            <button onClick={onClickIsLocalisation}>Localisation</button>
          </div>

          <div>
            <button onClick={onClickVideoSuivante}>
              Passer au vidéo suvante
            </button>
          </div>

          <div>
            <button onClick={(e) => onClickIsPlaying(false, true)}>
              Arrêter les vidéos
            </button>
          </div>

          <div>
            <button onClick={(e) => onClickIsPlaying(true, false)}>
              Démarrer les vidéos
            </button>
          </div>
        </div>
        <div class="FunctionsDiv">
          <div class="Statistic">
            <div>
              <label>Nom Vidéo:</label>
            </div>
            <div>
              <p>{nomObjet}</p>
            </div>
          </div>

          <div class="Statistic">
            <div>
              <label>Localisation:</label>
            </div>
            <div>{localisation ? <p>Oui</p> : <p>Non</p>}</div>
          </div>

          <div class="Statistic">
            <div>
              <label>Vidéo en cours:</label>
            </div>
            <div>
              <p>{nomVideo}</p>
            </div>
          </div>

          <div class="Statistic">
            <div>
              <label>Date:</label>
            </div>
            <div>
              <p>{date}</p>
            </div>
          </div>

          <div class="Statistic">
            <div>
              <label>Nombre joué aujourd’hui :</label>
            </div>
            <div>
              <p>{nbJouer}</p>
            </div>
          </div>

          <div class="Statistic">
            <div>
              <label>Temps joué aujourd’hui:</label>
            </div>
            <div>
              <p>{tempsTotal}</p>
            </div>
          </div>
          <input
            class="Input"
            name="file"
            id="file"
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => inputAddVideo(e)}
          ></input>
        </div>
      </div>
      <hr />
      <div class="HeaderDiv">
        <h1>Liste vidéos</h1>
        {listVideo.map((video) => {
          return (
            <div class="Statistic">
              <p>{video.nom_video}</p>
              <button onClick={(e) => onClickDeleteVideo(video.id_video)}>
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
