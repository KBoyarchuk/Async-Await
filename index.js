const async = require('./async.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function () {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(`${this.status} ${this.statusText}`);
        }
      } catch (e) {
        reject(e.message);
      }
    };
    request.onerror = function () {
      reject(`${this.status} ${this.statusText}`);
    };
    request.send();
  });
}

async(function* () {
  try {
    const pokemonList = yield getJSON('http://pokeapi.co/api/v2/pokemon/bulbasaur/');
    console.log(pokemonList);
    const pokemonAbility = yield getJSON(pokemonList.abilities[0].ability.url);
    console.log(pokemonAbility);
  } catch (e) {
    console.log(e.message);
  }
});