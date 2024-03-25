// var movies = ["The Godfather", "The Shawshank Redemption", "The Empire Strikes Back", "Steamboy", "Big Fish", "Akira"]

// movies.push("The Green Knight");

// console.log(movies[Math.floor(Math.random() * movies.length)]);

var movieArray = []
var movieName = document.getElementById("movie-name");
var movieNameSubmitButton = document.getElementById("movie-name-submit-button");
var movieList = document.getElementById("movie-list");
var randomizeButton = document.getElementById("randomize-button");
var movieResult = document.getElementById("movie-result");

// Add initial list items to the array
for (i = 0; i < movieList.children.length; i++) {
    movieArray.push(movieList.children[i].innerText);
}


randomizeButton.addEventListener("click", getRandomMovie);

function getRandomMovie() {
    for (i = 0; i < movieList.children.length; i++) {
        movieList.children[i].classList.remove("selected-movie");
    }

    // document.querySelector(".selected-movie").classList.remove("selected-movie");

    movieList.children[Math.floor(Math.random() * movieList.children.length)].classList.add("selected-movie");

    // var randomMovie = movieArray[Math.floor(Math.random() * movieArray.length)]
    // movieResult.innerHTML = randomMovie;

}



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
    li.appendChild(text);

    if (inputValue === "") {
        alert("Movie name cannot be blank");
    } else if (movieArray.includes(inputValue)) {
        alert("Movie is already in the list");
    } else {
        movieList.appendChild(li);
        movieArray.push(inputValue);
    }
    
    movieName.value = "";
}