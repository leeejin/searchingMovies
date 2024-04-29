const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDIzYzU3MWQ5M2FjZTdiYWQ3YTFkZWE3NWI0YzhhYiIsInN1YiI6IjY2MjY0NjQ0Y2I2ZGI1MDE2M2FlZTI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FfCrs2-T_js5Cuud3FBlI-obOWez3bf5_bj5KGmuVC0'
    }
};
let movies = [];

const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
fetch(apiUrl, options)
    .then(response => response.json())
    .then(response => {
        movies = response.results;
        displayMovieData(movies);
        console.log(response);
    })
    .catch(err => console.error(err));

function displayMovieData(m) {
    let total = "☆☆☆☆☆";
    const card = document.getElementById('eiga');
    m.forEach((movie) => {
        const cardDiv = document.createElement('div');
        cardDiv.onclick = () => handleAlert(movie.id);
        cardDiv.classList.add('card');

        const img = document.createElement('img');
        img.id = 'img';
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const overviewDiv = document.createElement('div');
        overviewDiv.id = 'overviewDiv';

        const overview = document.createElement('p');
        overview.id = 'overview';
        overview.textContent = movie.overview;
        overviewDiv.append(overview);

        const vote = document.createElement('p');
        vote.id = 'vote';

        let count = (movie.vote_average / 2).toFixed(1);
        total = "⭐".repeat(parseInt(count)) + total.slice(parseInt(count));
        vote.textContent = `${total} (${count})`;

        const title = document.createElement('h3');
        title.id = 'title';
        title.textContent = movie.title;

        const language = document.createElement('p');
        language.id = 'language';
        language.textContent = 'language : ' + movie.original_language;

        cardDiv.appendChild(img);
        cardDiv.appendChild(overviewDiv);
        cardDiv.appendChild(title);
        cardDiv.appendChild(vote);
        cardDiv.appendChild(language);

        cardDiv.addEventListener('mouseover', () => {
            overviewDiv.style.opacity = 1;
        });
        cardDiv.addEventListener('mouseout', () => {
            overviewDiv.style.opacity = 0;
        });
        card.appendChild(cardDiv);

    })
}

function handleAlert(id) {
    alert("영화 id:" + id);
}

function handleSearch() {
    const searchText = document.getElementById('searchText').value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchText));

    document.getElementById('eiga').innerHTML = '';
    displayMovieData(filteredMovies);
};
function handleLocation() {
    window.location.href = "main.html";
}