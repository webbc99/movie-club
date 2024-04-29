var movieArray = []
var movieName = document.getElementById("movie-name");
var movieNameSubmitButton = document.getElementById("movie-name-submit-button");
var movieList = document.getElementById("movie-list");
var randomizeButton = document.getElementById("randomize-button");
var movieResult = document.getElementById("movie-result");
var movies = document.getElementsByClassName("movie");
var closeButtons = document.getElementsByClassName("close");

init();

function init() {
    addExistingMoviesToArray()
    addCloseButtonsToExistingMovies();
    addRemovalFunctionalityToExistingCloseButtons();
}

// Add initial list items to the array
function addExistingMoviesToArray() {
    // for (i = 0; i < movieList.children.length; i++) {
    //     movieArray.push(movieList.children[i].innerText);
    // }
    // Example of creating an Array from the HtmlCollection, so we can use forEach instead of for
    Array.from(movieList.children).forEach((movie) => {
        movieArray.push(movie.innerText);
    })
}

// Add the close button to the movie
function addCloseButtonsToExistingMovies() {
    for (i = 0; i < movies.length; i++) {
        var span = document.createElement("span");
        var text = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(text);
        movies[i].parentElement.appendChild(span);
    }
}

// Get the movie name from the parent li, find it in the array and remove it
function addRemovalFunctionalityToExistingCloseButtons() {
    for (i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function() {
            this.parentElement.remove();
            var oldText = this.parentElement.innerText;
            var newText = oldText.substring(0, oldText.length - 1);
            var index = movieArray.indexOf(newText);
            movieArray.splice(index, 1);
        })
    }
}


// Add the functionality to select a random movie
randomizeButton.addEventListener("click", getRandomMovie);

function getRandomMovie() {
    for (i = 0; i < movieList.children.length; i++) {
        movieList.children[i].children[0].classList.remove("selected-movie");
    }
    movieList.children[Math.floor(Math.random() * movieList.children.length)].children[0].classList.add("selected-movie");
}

// Allow users to add new movies either by clicking Submit or hitting Enter
movieNameSubmitButton.addEventListener("click", newMovie);
movieName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        newMovie()
    }
})

function newMovie() {
    var li = document.createElement("li");
    var inputValue = movieName.value;
    var text = document.createTextNode(inputValue);
    var movieNameSpan = document.createElement("span");
    movieNameSpan.className = "movie"
    movieNameSpan.appendChild(text);
    li.appendChild(movieNameSpan);

    if (inputValue === "") {
        alert("Movie name cannot be blank");
    } else if (movieArray.includes(inputValue)) {
        alert("Movie is already in the list");
    } else {
        movieList.appendChild(li);
        movieArray.push(inputValue);
    }

    var span = document.createElement("span");
    var text = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(text);
    li.appendChild(span);

    span.addEventListener("click", function() {
        this.parentElement.remove();
        var oldText = this.parentElement.innerText;
        var newText = oldText.substring(0, oldText.length - 1);
        var index = movieArray.indexOf(newText);
        movieArray.splice(index, 1);
        removeElementFromArray(movieArray, newText);
    })
    
    movieName.value = "";
}

// Movie: id, name, genres, runtime, overall_rating
// [1, 2]

// Genres: id, name

// User: id, username, password, display name

// Ratings: id, rating_value, movie_id

let movieObjectArray = [];
class Movie {
    constructor(id, name, genres, runtime) {
        this.id = id;
        this.name = name;
        this.genres = genres;
        this.runtime = runtime;
        movieObjectArray.push(this);
    }
    overallRating() {
        return("10");
    }
    userFriendlyRuntime() {
        hours = Math.floor(this.runtime / 60);
        minutes = this.runtime % 60;
        return(`${hours}h ${minutes}m`);
    }
    genreNames() {
        let output = []
        genresObjectArray.forEach((genre) => {
            if(this.genres.includes(genre.id)) {
                output.push(genre.name);
            }
        })
        return(output);
    }

}

const warGames = new Movie(1, "WarGames", [1, 2, 3], 152);

let genresObjectArray = [];
class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        genresObjectArray.push(this);
    }
}

const sciFi = new Genre(1, "Sci-Fi");
const action = new Genre(2, "Action");
const drama = new Genre(3, "Drama");
const horror = new Genre(4, "Horror");
const thriller = new Genre(5, "Thriller");