const searchInput = document.getElementById('search-value');
const searchBar = document.getElementById('search-form');
const movieCointainer = document.getElementById('movies-container');

searchBar.addEventListener('submit', e => {
    e.preventDefault();

    const searchValue = searchInput.value;
    getMovies(searchValue)
})

function render(output) {
    movieCointainer.innerHTML = output;
}

async function getMovies(search){
    const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=ae90c67e`)
    const data = await response.json()
    let movies = data.Search
    let descriptions = []
    let output = ''
    const response2 = await movies.forEach(movie => {
        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=ae90c67e&plot=short`)
            .then(response => response.json())
            .then(movie => {
                output += `
                        <div class="movie">
                            <div class="movie-poster">
                                <img src="${movie.Poster}">
                            </div>
                            <div class="movie-description">
                                <h3>${movie.Title}  <img src ="images/star-icon1.png" class="star-icon">  ${movie.imdbRating}</h3>
                                <div class="movie-details">
                                    <p class="movie-runtime">${movie.Runtime}</p>
                                    <p class="movie-genre">${movie.Genre}</p>
                                    <button><img src="images/watchlist-btn.png" class="watchlist-btn"> Watchlist</button>
                                </div>
                                <p>${movie.Plot}</p>
                            </div>
                            
                        </div>
                        `
                render(output)
            })
    })
}