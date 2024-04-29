const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDIzYzU3MWQ5M2FjZTdiYWQ3YTFkZWE3NWI0YzhhYiIsInN1YiI6IjY2MjY0NjQ0Y2I2ZGI1MDE2M2FlZTI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FfCrs2-T_js5Cuud3FBlI-obOWez3bf5_bj5KGmuVC0",
  },
};
const $content = document.getElementById("eiga"); //전체 내용을 담을 컴포넌트
const $input = document.getElementById("searchText"); //검색어입력창
const $handleSearch = document.getElementById("handleSearch"); //검색어 실행버튼
const $mark = document.getElementById("representive-mark"); // 메인아이콘
const $error = document.getElementById("error"); //에러메시지
let movies = [];
const apiUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

fetch(apiUrl, options)
  .then((response) => response.json())
  .then((response) => {
    const filteredMovies = response.results.map((movies) => ({
      original_language: movies.original_language,
      title: movies.title,
      overview: movies.overview,
      vote_average: movies.vote_average,
      poster_path: movies.poster_path,
      id: movies.id,
    }));
    movies = filteredMovies;
    displayMovieData(filteredMovies);
    console.log(filteredMovies);
  })
  .catch((err) => {
    $error.textContent = "API 가져오는데 문제가 생겼습니다";
    $content.appendChild($error);
    console.error(err);
  });

function displayMovieData(m) {
  let total = "☆☆☆☆☆";
  if (!m.length) {
    $error.textContent = "해당 검색어에 대한 데이터가 존재하지 않습니다!";
    $content.appendChild($error);
  } else {
    m.forEach((movie) => {
      const cardDiv = document.createElement("div");
      cardDiv.id = "cardDiv";
      cardDiv.classList.add("card");

      const img = document.createElement("img");
      img.id = "img";
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const overviewDiv = document.createElement("div");
      overviewDiv.id = "overviewDiv";
      overviewDiv.addEventListener("click", () => alert("영화 id:" + movie.id));

      const overview = document.createElement("p");
      overview.id = "overview";
      overview.textContent = movie.overview;
      overviewDiv.appendChild(overview);

      const vote = document.createElement("p");
      vote.id = "vote";

      let count = (movie.vote_average / 2).toFixed(1);
      total = "⭐".repeat(parseInt(count)) + total.slice(parseInt(count));
      vote.textContent = `${total} (${count})`;

      const title = document.createElement("h3");
      title.id = "title";
      title.textContent = movie.title;

      const language = document.createElement("p");
      language.id = "language";
      language.textContent = "language : " + movie.original_language;

      cardDiv.appendChild(img);
      cardDiv.appendChild(overviewDiv);
      cardDiv.appendChild(title);
      cardDiv.appendChild(vote);
      cardDiv.appendChild(language);

      cardDiv.addEventListener("mouseover", () => {
        overviewDiv.style.opacity = 1;
      });
      cardDiv.addEventListener("mouseout", () => {
        overviewDiv.style.opacity = 0;
      });
      $content.appendChild(cardDiv);
    });
  }
}

$input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) $handleSearch.click();
});

$handleSearch.addEventListener("click", () => {
  const searchText = $input.value.toLowerCase();
  if (!searchText.length) alert("검색창에 글자를 입력해주세요");
  else {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText)
    );
    $content.innerHTML = "";
    displayMovieData(filteredMovies);
  }
});

$mark.addEventListener("click", () => {
  window.location.href = "/public/index.html";
});
