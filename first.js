// window.onload = show_movie(); 다시
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmY4Zjk2MGE1ZjI4M2VmOTA0Y2M2YTJhNDVhMDhkOCIsInN1YiI6IjY0NzA5NTkyYzVhZGE1MDEzNTgzZTI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2mXtKXv5oO4M3Y-lE0uWGnM1tHm_bVE2X1GoeX16_X8",
  },
};

function show_movie() {
  alert("실행 성공");

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];
      let poster = document.getElementById("poster");
      console.log(rows);
      poster.innerHTML = "";
      rows.forEach((a) => {
        let title = a["title"];
        let poster_path = a["poster_path"];
        let overview = a["overview"];
        let vote_average = a["vote_average"];
        let id = a["id"];
        poster.insertAdjacentHTML(
          "afterbegin",
          `<article class="card">
                          <img
                            src="https://image.tmdb.org/t/p/original/${poster_path}"
                            onclick='alertId(${id})'
                          />
                          <h3 class="tit" id = "movieTitle">${title}</h3>
                          <h3 class="tit">${vote_average}</h3>
                          <p class="desc">${overview}</p>
                        </article>`
        );
      });
    })
    .catch((err) => console.error(err));
}

function searchbtn() {
  const searchItem = document.getElementById("search-input").value;
  console.log(searchItem);

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];
      let poster = document.getElementById("poster");
      poster.innerText = "";
      let movies = rows.filter((movie) => {
        return movie.title.toLowerCase().includes(searchItem.toLowerCase());
      });
      movies.forEach((a) => {
        let title = a["title"];
        let poster_path = a["poster_path"];
        let overview = a["overview"];
        let vote_average = a["vote_average"];
        let id = a["id"];
        poster.insertAdjacentHTML(
          "afterbegin",
          `<article class="card">
                              <img
                                src="https://image.tmdb.org/t/p/original/${poster_path}"
                                onclick='alertId(${id})'
                              />
                              <h3 class="tit" id = "movieTitle">${title}</h3>
                              <h3 class="tit">${vote_average}</h3>
                              <p class="desc">${overview}</p>
                            </article>`
        );
      });
    })
    .catch((err) => console.error(err));
}

function alertId(id) {
  alert("id : " + id);
}
