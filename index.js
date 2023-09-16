const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemon = between(1, 1010);
fetchPokeAPI(currentPokemon);

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setEventListeners() {
  // search function
  const $searchButton = document.querySelector(".search-bar button");
  $searchButton.addEventListener("click", () => {
    const $searchInput = document.querySelector(".search-bar input");
    if ($searchInput.value) {
      fetchPokeAPI($searchInput.value);
    }
  });

  // next and prev functions
  const $prevButton = document.querySelector(".container .prev");
  $prevButton.addEventListener("click", () => {
    if (currentPokemon == 1) {
      currentPokemon = 1010;
    } else {
      currentPokemon--;
    }
    fetchPokeAPI(currentPokemon);
  });

  const $nextButton = document.querySelector(".container .next");
  $nextButton.addEventListener("click", () => {
    if (currentPokemon == 1010) {
      currentPokemon = 1;
    } else {
      currentPokemon++;
    }
    fetchPokeAPI(currentPokemon);
  });
}

function setResults(results) {
  currentPokemon = results.id;
  const $name = document.querySelector(".header .name");
  $name.innerText = results.name;
  const $number = document.querySelector(".header .number");
  $number.innerText = results.id;
  const $image = document.querySelector(".body img");
  $image.src = results.sprites.front_default;
  const $ability = document.querySelector(".data .ability");
  $ability.innerText = results.abilities[0].ability.name;
  const $weight = document.querySelector(".data .weight");
  $weight.innerText = results.weight;
  const $height = document.querySelector(".data .height");
  $height.innerText = results.height;
}

function fetchPokeAPI(pokemon) {
  fetch(`${BASE_URL}${pokemon}`)
    .then((res) => res.json())
    .then((data) => setResults(data));
}

setEventListeners();
