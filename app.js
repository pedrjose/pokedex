const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => {
    const pokemonPromises = [];

    for (i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    return pokemonPromises;
}

const insertPokemonCardIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"')
    ul.innerHTML = pokemons;
}

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