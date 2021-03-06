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

function addToWatchlist(movieID){
    if(localStorage.getItem('watchlist')) {
        let watchlist = JSON.parse(localStorage.getItem('watchlist'))
        if(!watchlist.find(movie => movie === movieID)) {
            watchlist.push(movieID)
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }
    else {
        localStorage.setItem('watchlist', JSON.stringify([movieID]))
    }

    const watchlistBtn = document.getElementById(`${movieID}`)
    watchlistBtn.classList.add('on-watchlist')
    watchlistBtn.innerHTML = "Added"
}

async function getMovies(search){
    const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=ae90c67e`)
    const data = await response.json()
    let movies = data.Search
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
                                <h3>${movie.Title}  <img src ="images/star-icon1.png" class="star-icon">${movie.imdbRating}</h3>
                                <div class="movie-details">
                                    <p class="movie-runtime">${movie.Runtime}</p>
                                    <p class="movie-genre">${movie.Genre}</p>
                                    <button class="watchlist-btn" onclick="addToWatchlist('${movie.imdbID}')" id="${movie.imdbID}">Watchlist</button>
                                </div>
                                <p>${movie.Plot}</p>
                            </div>
                            
                        </div>
                        `
                render(output)
            })
    })
}