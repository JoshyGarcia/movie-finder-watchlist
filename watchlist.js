const watchlistContainer = document.getElementById('watchlist-container')

function getWatchlist() {
    let moviesHtml = ''
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    for(let i = 0; i < watchlist.length; i++) {
        fetch(`http://www.omdbapi.com/?i=${watchlist[i]}&apikey=ae90c67e&plot=full`)
            .then(response => response.json())
            .then(movie => {
                moviesHtml += `
                        <div class="movie" id="div-${movie.imdbID}">
                            <div class="movie-poster">
                                <img src="${movie.Poster}">
                            </div>
                            <div class="movie-description">
                                <h3>${movie.Title}  <img src ="images/star-icon1.png" class="star-icon">${movie.imdbRating}</h3>
                                <div class="movie-details">
                                    <p class="movie-runtime">${movie.Runtime}</p>
                                    <p class="movie-genre">${movie.Genre}</p>
                                    <button class="remove-btn" onclick="removeFromWatchlist('${movie.imdbID}')" id="${movie.imdbID}">Remove</button>
                                </div>
                                <p>${movie.Plot}</p>
                            </div>
                            
                        </div>
                        `
                renderWatchlist(moviesHtml)
            })
    }
}

function renderWatchlist(moviesHtml) {
    watchlistContainer.innerHTML = moviesHtml
}

function removeFromWatchlist(movieID) {
    const removeBtn = document.getElementById(`div-${movieID}`)
    removeBtn.remove()
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    let newWatchlist = watchlist.filter(movie => movie !== movieID)
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
}

getWatchlist()
