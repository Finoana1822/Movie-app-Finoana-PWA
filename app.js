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
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTEwMTdhOGEwNDJkYTBkM2IyNTFhOTE4N2RhN2Y5NyIsInN1YiI6IjY1MzRiYmM0YzhhNWFjMDBlMmI3MDQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmIpDTzM8iPA7irTZ1HjUs2fzT4tHweFnH_Bi777ws8'
  }
};
logout.addEventListener('click', async () => {
  localStorage.removeItem("apikey");
  movieApp.style.display = "none";
  formulaire.style.display = "flex"
})

buttonlogin.addEventListener('click', async () => {
  fetch(`https://api.themoviedb.org/3/search/movie?query=d&api_key=${inputLogin.value}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if(json.status_code === 7){
        alert("Votre clé est incorrecte")
      }
      if(json.results){
        localStorage.setItem('apikey', inputLogin.value)
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
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue.value}&api_key=${API_KEY}`, options).then((response) => {
    if(!response.ok){
      return null;
    }
    return response.json()
  })
  
  data?.results.map((d) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${`https://image.tmdb.org/t/p/w500${d?.poster_path}`} alt="no poster"/>
                <h1 class="card--title">${d?.original_title}</h1>
              </div>
              `)
  );
  container.innerHTML = output;
};

button.addEventListener("click", showMovie);

function getApiKey(){
  const apikey = localStorage.getItem('apikey')
  console.log(apikey)
  if(apikey){
    API_KEY = apikey;
    formulaire.style.display = "none";
    movieApp.style.display = "flex";
  }
}
document.addEventListener("DOMContentLoaded", getApiKey);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}