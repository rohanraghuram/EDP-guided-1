let nameH1;
let climate;
let surface_water;
let diameter;
let rotation_period;
let terrain;
let gravity;
let orbital_period
let population;

let filmsDiv;
let characterdiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  climate = document.querySelector('span#climate');
  surface_water = document.querySelector('span#surface_water');
  diameter = document.querySelector('span#diameter');
  rotation_period = document.querySelector('span#rotation_period');
  terrain = document.querySelector('span#terrain');
  gravity = document.querySelector('span#gravity');
  orbital_period = document.querySelector('span#orbital_period');
  population = document.querySelector('span#population');

  characterSpan = document.querySelector('span#character');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.character = await fetchCharacter(planet)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetURL = `${baseUrl}/planets/${id}`;
  return await fetch(planetURL)
    .then(res => res.json())
}

async function fetchCharacter(planet) {
  const url = `${baseUrl}/characters/${planet?.id}`;
  const character = await fetch(url)
    .then(res => res.json())
  return character;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  console.log(planet)
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climate.textContent = planet?.climate;
  population.textContent = planet?.population
  surface_water.textContent = planet?.surface_water,
  diameter.textContent = planet?.diameter;
  rotation_period.textContent = planet?.rotation_period;
  terrain.textContent = planet?.terrain;
  gravity.textContent = planet?.gravity;
  orbital_period.textContent = planet?.orbital_period;

  characterSpan.innerHTML = `<a href="/character.html?id=${planet?.character.id}">${planet?.character.name}</a>`;
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}