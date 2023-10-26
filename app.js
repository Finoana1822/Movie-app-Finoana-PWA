const container = document.querySelector(".container");
const inputValue = document.getElementById("value");
const button = document.getElementById("button");

const API_KEY="f91017a8a042da0d3b251a9187da7f97"
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTEwMTdhOGEwNDJkYTBkM2IyNTFhOTE4N2RhN2Y5NyIsInN1YiI6IjY1MzRiYmM0YzhhNWFjMDBlMmI3MDQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmIpDTzM8iPA7irTZ1HjUs2fzT4tHweFnH_Bi777ws8'
  }
};
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
