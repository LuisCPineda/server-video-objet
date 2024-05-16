import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
    const [nomObjet,setNomObjet] = useState ("")
    const [localisation, setLocalisation] = useState(false)
    const [nomVideo, setNomVideo] = useState("")
    const [date, setDate] = useState("")
    const [nbJouer,setNbJouer] = useState("")
    const [tempsTotal, setTempsTotal] = useState("")
    
      useEffect(() => {
        // Fonction pour effectuer la requête GET
        const fetchData = async () => {
          try {
            const response = await fetch(
                `http://20.193.147.114:3000/api/getInterface`,
                {
                    method: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        "Content-Type": "application/json"
                    },
                }
            );
            const objetJson = await response.json()
            setNomObjet(objetJson[0].nom_objet)
            if(objetJson[0].is_localisation===1){ 
                setLocalisation(true)
            } else if(objetJson[0].is_localisation===0) {
                setLocalisation(false)
            }
            
            setNomVideo(objetJson[0].nom_video_current)
            setDate(objetJson[0].date_jour)
            setNbJouer(objetJson[0].nb_jouer)
            setTempsTotal(objetJson[0].temps_total)
          } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
          }
        };
    
        // Appeler la fonction fetchData immédiatement au montage du composant
        fetchData();
    
        // Mettre en place un intervalle pour rappeler la fonction fetchData toutes les 10 secondes
        const intervalId = setInterval(fetchData, 10000);
    
        // Nettoyer l'intervalle lors du démontage du composant pour éviter les fuites de mémoire
        return () => clearInterval(intervalId);
      }, []); // Le tableau
    
    const onClickIsLocalisation = async () =>{
        try{
            const response = await fetch(
                `http://20.193.147.114:3000/api/setIsLocation`,
                {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        is_localisation: true,
                        id_objet:'123456789'
                    }),
                }
            );
        }catch(err){

        }
    }
    const onClickIsPlaying = async (is_playing,is_stopping) =>{
        try{
            const response = await fetch(
                `http://20.193.147.114:3000/api/setIsPlayingVideo`,
                {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        is_playing: is_playing,
                        is_stopping: is_stopping,
                        id_objet:'123456789'
                    }),
                }
            );
        }catch(err){

        }
    }
    const onClickVideoSuivante= async () =>{
        try{
            const response = await fetch(
                `http://20.193.147.114:3000/api/setVideoSuivante`,
                {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        video_suivante: true,
                        id_objet:'123456789'
                    }),
                }
            );
        }catch(err){

        }
    }

  return (
    <div className="App">
      <div class="HeaderDiv">
        <h1>
            lecteur vidéos
        </h1>
      
      </div>
      <div class="BodyDiv">



           
      <div class="StatisticsDiv">

<div>
<button onClick={onClickIsLocalisation}>Localisation</button>
</div>

<div>   

    <button onClick={onClickVideoSuivante}>Passer au vidéo suvante</button>
</div>

<div>
    <button onClick={(e)=>onClickIsPlaying(false,true)}>Arrêter les vidéos</button>
</div>

<div>
    <button onClick={(e)=>onClickIsPlaying(true,false)}>Démarrer les vidéos</button>
</div>



</div>
 <div class=  "FunctionsDiv">

     <div class="Statistic">
         <div>
             <label>Nom Objet:</label>
         </div>
         <div>
             <p>{nomObjet}</p>
         </div>

     </div>

     <div class="Statistic">
         <div>
             <label>Localisation:</label>
         </div>
         <div>
             {localisation ?<p>Oui</p>:<p>Non</p>}
         </div>

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



 </div>



</div>
    </div>
  );
}

export default App;
