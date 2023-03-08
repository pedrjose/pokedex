/* getPokemonUrl' is the function responsible to get the pokemons data through the API */ 
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

/*
'generatePokemonPromises' is responsible to create a array with 150 pokemons promises
pokemons data are get through the function 'getPokemonUrl'
*/
const generatePokemonPromises = () => {
    const pokemonPromises = [];

    // 'fetch' do a asynchronous request to API encapsulated in 'getPokemonUrl' with array index
    for (i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    // the array will return when filed with 150 pokemons
    return pokemonPromises;
}

/* Insert the pokemon card in HTML page */
const insertPokemonCardIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"')
    ul.innerHTML = pokemons;
}

/* Generate li tag with pokemon card */
const generateHTML = pokemons => {
    return pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        accumulator += `
        <li class="card ${types[0]}">
        <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p card="card-subtitle">${types.join(' | ')}</p>
        </li>
        `

        return accumulator;
    }, '')
}

pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonCardIntoPage)