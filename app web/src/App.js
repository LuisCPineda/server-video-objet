
import './App.css';
import axios from "axios";

function App() {
    console.log("ca fonctionne 5");
  const handleTitleClick = async () => {
    console.log("ca fonctionne ");
    try {  
        const index=12332
        const response = await axios.post("http://0.0.0.0:5000/get_public_ip", {index});
        console.log("ca fonctionne ");
       
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    } } 
    
   

    // Appel de l'API Flask pour récupérer l'adresse IP publique
    axios.get('http://0.0.0.0:3000/get_public_ip')
      .then(response => {
        console.log(response.data.public_ip);
        console.log("ca fonctionne 1");
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'adresse IP publique :', error);
      });
  
    
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
<button onClick={handleTitleClick}> 
  </button>
</div>

<div>   

    <button>Passer au vidéo suvante</button>
</div>

<div>
    <button>Arrêter les vidéos</button>
</div>

<div>
    <button>Démarrer les vidéos</button>
</div>



</div>
 <div class=  "FunctionsDiv">

     <div class="Statistic">
         <div>
             <label>Nom Objet:</label>
         </div>
         <div>
             <p>Objet1</p>
         </div>

     </div>

     <div class="Statistic">
         <div>
             <label>Localisation:</label>
         </div>
         <div>
             <p>Non</p>
         </div>

     </div>

     <div class="Statistic">
         <div>
             <label>Vidéos en cours:</label>
         </div>
         <div>
             <p>Video1.mp4</p>
         </div>

     </div>

     <div class="Statistic">
         <div>
             <label>Date:</label>
         </div>
         <div>
             <p>01/01/2024</p>
         </div>

     </div>

    

     <div class="Statistic">
         <div>
             <label>Nombre joué aujourd’hui :</label>
         </div>
         <div>
             <p>33</p>
         </div>

     </div>

     <div class="Statistic">
         <div>
             <label>Temps joué aujourd’hui:</label>
         </div>
         <div>
             <p>2h 26min 48sec</p>
         </div>

     </div>



 </div>



</div>
    </div>
  );
}

export default App;
