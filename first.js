window.onload = show_movie();

function show_movie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmY4Zjk2MGE1ZjI4M2VmOTA0Y2M2YTJhNDVhMDhkOCIsInN1YiI6IjY0NzA5NTkyYzVhZGE1MDEzNTgzZTI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2mXtKXv5oO4M3Y-lE0uWGnM1tHm_bVE2X1GoeX16_X8",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];
      rows.forEach((a) => {
        let title = a["title"];
        let poster_path = a["poster_path"];
        let overview = a["overview"];
        let vote_average = a["vote_average"];
        let id = a["id"];
        let d1 = document.getElementById("poster");
        d1.insertAdjacentHTML(
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
  const d3 = document.getElementById("search-input").value;
  const d2 = document.querySelectorAll("#movieTitle");
  for (i = 0; i < d2.length; i++) {
    let d4 = d2[i].innerHTML;
    if (d4.includes(d3)) {
      alert("true");
    }
  }
}

function alertId(id) {
  alert("id : " + id);
}
