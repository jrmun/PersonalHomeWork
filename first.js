window.onload = show_movie();
function show_movie() {
  fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
    .then((res) => res.json())
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
  const d2 = document.querySelector("#movieTitle").value;
  console.log(d2);
}

function alertId(id) {
  alert("id : " + id);
}
