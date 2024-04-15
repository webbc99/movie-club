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
    for (i = 0; i < movieList.children.length; i++) {
        movieArray.push(movieList.children[i].innerText);
    }
}

// Add the close button to the movie
function addCloseButtonsToExistingMovies() {
    for (i = 0; i < movies.length; i++) {
        var span = document.createElement("span");
        var text = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(text);
        movies[i].appendChild(span);
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
        movieList.children[i].classList.remove("selected-movie");
    }
    movieList.children[Math.floor(Math.random() * movieList.children.length)].classList.add("selected-movie");
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
    li.className = "movie";
    var inputValue = movieName.value;
    var text = document.createTextNode(inputValue);
    li.appendChild(text);

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