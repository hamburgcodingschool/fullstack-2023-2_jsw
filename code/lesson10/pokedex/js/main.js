function loadPokemonArray(url) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            prevPageURL = result.previous;
            nextPageURL = result.next;

            pokemonArray = result.results;
            
            console.log(pokemonArray);
            renderPokeList();
        });
}

function renderPokeList() {
    pokeList.innerHTML = "";
    for (let i = 0; i < pokemonArray.length; i++) {
        // console.log(pokemonArray[i]);
        pokeList.innerHTML += `<li><a href="#" data-index="${i}">${pokemonArray[i].name}</a></li>`;
    }

    if (prevPageURL == null) {
        buttonPrev.disabled = true;
    } else {
        buttonPrev.disabled = false;
    }

    if (nextPageURL == null) {
        buttonNext.disabled = true;
    } else {
        buttonNext.disabled = false;
    }
}

function renderInfoLoading() {
    pokeInfoImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png";
    pokeInfoName.innerText = "Loading...";
    pokeInfoWeight.innerText = "";
    pokeInfoMove1.innerText = "";
}

function renderPokeInfo(pokeInfo) {
    pokeInfoImage.src = pokeInfo.sprites.other["official-artwork"].front_default;
    pokeInfoName.innerText = pokeInfo.name;
    pokeInfoWeight.innerText = pokeInfo.weight;
    pokeInfoMove1.innerText = pokeInfo.moves[0].move.name;
}

const pokeList = document.querySelector("#pokeList");

const buttonPrev = document.querySelector("#buttonPrev");
const buttonNext = document.querySelector("#buttonNext");

const pokeInfoImage = document.querySelector("#pokeInfoImage");
const pokeInfoName = document.querySelector("#pokeInfoName");
const pokeInfoWeight = document.querySelector("#pokeInfoWeight");
const pokeInfoMove1 = document.querySelector("#pokeInfoMove1");

let pokemonArray = [];
let prevPageURL = null;
let nextPageURL = null;

pokeList.addEventListener("click", function(event) {
    if (event.target.tagName != "A") {
        return;
    }
    event.preventDefault();
    
    // Let's figure out which link was clicked
    // So we can match it to the Array
    const index = event.target.dataset.index;

    // now that we have the index
    // we can use it to get the url from the array
    const url = pokemonArray[index].url;
    console.log(url);

    renderInfoLoading();

    fetch(url)
        .then(response => response.json())
        .then(result => {
            renderPokeInfo(result);            
        });
});

buttonPrev.addEventListener("click", function() {
    loadPokemonArray(prevPageURL);
});

buttonNext.addEventListener("click", function() {
    loadPokemonArray(nextPageURL);
});

loadPokemonArray("https://pokeapi.co/api/v2/pokemon");