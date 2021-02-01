console.log(`Sanity Check`)

let pokedexUrl = `https://pokeapi.co/api/v2/pokedex/1/`

function getPokemons(event) {
    fetch(pokedexUrl)
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {

            jsonData.pokemon_entries.forEach(pokemon => {
                let categoryElement = document.createElement("img")
                categoryElement.setAttribute(`class`, `pokemonSprite`)
                categoryElement.setAttribute(`id`, pokemon.entry_number)
                categoryElement.setAttribute(`src`,`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png` )
                document.getElementById(`pokemonSprites`).appendChild(categoryElement)
                
            });
        })
}
getPokemons()

document.getElementById("pokemonSprites").addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "IMG") {
        console.log("List item ", e.target.id, " was clicked!");
        let pokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.id}`
        const getPokemon = (event) => {
            fetch(pokemon)
                .then((responseData) => {
                    return responseData.json()
                })
                .then((jsonData) => {
                    let pokemon = jsonData
                    document.getElementById(`pokemonSprites`).remove()
                    let pokemonFront = document.createElement(`img`)
                    let pokemonBack = document.createElement(`img`)
                    let pokemonOfficial = document.createElement(`img`)

                    pokemonFront.setAttribute(`src`, pokemon.sprites.front_default)
                    pokemonBack.setAttribute(`src`, pokemon.sprites.back_default)
                    pokemonOfficial.setAttribute(`src`, pokemon.sprites.other["official-artwork"].front_default)
                    document.body.appendChild(pokemonFront)
                    document.body.appendChild(pokemonBack)
                    document.body.appendChild(pokemonOfficial)

                })
        }
        getPokemon()
    }
})