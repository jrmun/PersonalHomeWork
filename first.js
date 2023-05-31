const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmY4Zjk2MGE1ZjI4M2VmOTA0Y2M2YTJhNDVhMDhkOCIsInN1YiI6IjY0NzA5NTkyYzVhZGE1MDEzNTgzZTI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2mXtKXv5oO4M3Y-lE0uWGnM1tHm_bVE2X1GoeX16_X8",
  },
};

function show_movie() {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];
      let poster = document.getElementById("poster"); //id가 poster인 element를 poster라고 선언함
      poster.innerText = ""; //기존 데이터 초기화
      rows.forEach((a) => {
        //forEach를 통해 rows의 모든 데이터를 poster에 뿌린다.
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
      poster.innerHTML = ""; //기존 poster를 초기화 시켜줌 innerTEXT로도 작동하며
      //innerTEXT가 보안상 더 안전하다는 정보가 있다.
      let movies = rows.filter((movie) => {
        return movie.title.toLowerCase().includes(searchItem.toLowerCase());
      }); // filter를 통해 data에서 사용자가 작성한 input-data를 비교해 해당되는 data만
      //movies에 저장함
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
  alert("id : " + id); //함수에서 id를 변수로 가져와 alert을 통해 메시지를 전달함
}

function btnclick(e) {
  if (e.code === "Enter") {
    searchbtn();
  }
}
