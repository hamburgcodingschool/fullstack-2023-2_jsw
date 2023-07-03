function loadPokemonArray(url) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            pokemonArray = result.results;
            renderPokeList();
        });
}

function renderPokeList() {
    pokeList.innerHTML = "";
    for (let i = 0; i < pokemonArray.length; i++) {
        // console.log(pokemonArray[i]);
        pokeList.innerHTML += `<li><a href="#" data-index="${i}">${pokemonArray[i].name}</a></li>`;
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
const pokeInfoImage = document.querySelector("#pokeInfoImage");
const pokeInfoName = document.querySelector("#pokeInfoName");
const pokeInfoWeight = document.querySelector("#pokeInfoWeight");
const pokeInfoMove1 = document.querySelector("#pokeInfoMove1");

let pokemonArray = [];

pokeList.addEventListener("click", function(event) {
    if (event.target.tagName != "A") {
        return;
    }
    event.preventDefault();
    
    const index = event.target.dataset.index;
    const url = pokemonArray[index].url;

    renderInfoLoading();
    
    fetch(url)
        .then(response => response.json())
        .then(result => {
            renderPokeInfo(result);            
        });
});

loadPokemonArray("https://pokeapi.co/api/v2/pokemon");