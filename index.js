const searchInput = document.getElementById('search-value');
const searchBar = document.getElementById('search-form');
const movieCointainer = document.getElementById('movies-container');



console.log(searchBar);

searchBar.addEventListener('submit', e => {
    e.preventDefault();

    const searchValue = searchInput.value;
    getMovies(searchValue)
})

function render(output) {
    // console.log(output)
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
                // console.log(movie)
                output += `
                        <div class="movie">
                            <img src="${movie.Poster}">
                            <h3>${movie.Title} (${movie.Year})</h3>
                            <p>${movie.Plot}</p>
                        </div>
                        `
                render(output)
            })
    })

    


}
