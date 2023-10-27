const container = document.querySelector(".container");
const inputValue = document.getElementById("value");
const button = document.getElementById("button");

// FORMULAIRE //
const buttonlogin = document.getElementById("buttonlogin")
const inputLogin = document.getElementById("valuelogin");
const movieApp = document.getElementById("movie-app");
const formulaire = document.getElementById("formulaire");

// const API_KEY="f91017a8a042da0d3b251a9187da7f97"
var API_KEY=""

buttonlogin.addEventListener('click', async () => {
  fetch(`https://api.themoviedb.org/3/search/movie?query=harryPotter&api_key=${inputLogin.value}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if(json.status_code === 7){
        alert("Votre clé est incorrecte")
      }
      if(json.results){
        localStorage.setItem('key', inputLogin.value)
        window.location.reload();
        movieApp.style.display = "flex",
        formulaire.style.display = "none"
      }
    })
    .catch(err => {
      console.error('error:' + err)
    });
})

const showMovie = async () => {
  let output = "";
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue.value}&api_key=${API_KEY}`).then((response) => {
    if(!response.ok){
      return null;
    }
    return response.json()
  })
  
  data?.results.map((movie) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="no poster"/>
                <h1 class="card--title">${movie?.original_title}</h1>
              </div>
              `)
  );
  container.innerHTML = output;
};

button.addEventListener("click", showMovie);

document.addEventListener("DOMContentLoaded", ()=>{
  const key = localStorage.getItem('key')
  if(key){
    API_KEY = key;
    formulaire.style.display = "none";
    movieApp.style.display = "flex";
  }
});

logout.addEventListener('click', async () => {
  localStorage.removeItem("key");
  movieApp.style.display = "none";
  formulaire.style.display = "flex"
})

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}