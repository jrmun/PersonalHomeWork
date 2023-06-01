const apihttps =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmY4Zjk2MGE1ZjI4M2VmOTA0Y2M2YTJhNDVhMDhkOCIsInN1YiI6IjY0NzA5NTkyYzVhZGE1MDEzNTgzZTI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2mXtKXv5oO4M3Y-lE0uWGnM1tHm_bVE2X1GoeX16_X8",
  },
};

function show_movie() {
  fetch(apihttps, options)
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
                          <h3 class="vote">${vote_average}</h3>
                          <p class="desc">${overview}</p>
                        </article>`
        );
      });
    })
    .catch((err) => console.error(err));
}

function searchbtn() {
  const searchItem = document.getElementById("search-input");
  const searchItemValue = searchItem.value;
  searchItem.value = null;
  // input에서 값을 받아오고, input은 초기화시켜준다.
  fetch(apihttps, options)
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];
      let poster = document.getElementById("poster");
      poster.innerHTML = ""; //기존 poster를 초기화 시켜줌 innerTEXT로도 작동하며
      //innerTEXT가 보안상 더 안전하다는 정보가 있다.
      let movies = rows.filter((movie) => {
        return movie.title
          .toLowerCase()
          .replace(/\s/gi, "")
          .includes(searchItemValue.toLowerCase().replace(/\s/gi, ""));
      }); // filter를 통해 data에서 사용자가 작성한 input-data를 비교해 해당되는 data만
      //movies에 저장함
      //toLowerCase()를 통해 대소문자 구분없이, replace를 통해 띄어쓰기,공백 구분없이
      //검색할 수 있게 구성했다.

      sort_array(movies);

      //정렬이 완료된 movies를 forEach를 돌려준다.
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
//onkeypress를 넣어 event가 발생했을 때 e.code가 enter라면 searchbtn함수가 실행된다.
//추가 중

function sort_array(data) {
  const radio_value = document.getElementsByName("sort");
  radio_value.forEach((radio) => {
    if (radio.checked) {
      return (radio_check = radio.value);
    }
  });
  //체크된 radio의 value값을 가져온다.
  //그 후 if문을 통해 value값이 vote라면 vote_average를 기준으로 내림차 순으로 정렬하고
  // title이라면 title을 기준으로 오름차 순으로 정렬한다.
  if (radio_check === "vote") {
    data.sort(function (comp1, comp2) {
      let comp1UC = comp1.vote_average * 10;
      let comp2UC = comp2.vote_average * 10;
      if (comp1UC > comp2UC) {
        return 1;
      } else if (comp1UC < comp2UC) {
        return -1;
      }
      return 0;
    });
  } else if (radio_check === "title") {
    data.sort(function (comp1, comp2) {
      //data를 받은 rows를 제목순으로 정렬하는 로직
      //변수를 받아와서 정렬을 위해 소문자로 만들어준다.
      let comp1UC = comp1.title.toLowerCase();
      let comp2UC = comp2.title.toLowerCase();
      if (comp1UC < comp2UC) {
        return 1;
      } else if (comp1UC > comp2UC) {
        return -1;
      }
      return 0;
    });
  }
  //정렬이 완료된 data를 리턴으로 보내준다.
  return data;
}
