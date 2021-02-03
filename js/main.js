console.log(`Sanity Check`)

let pokedexUrl = `https://pokeapi.co/api/v2/pokedex/1/`

// The Folllowing function creates the main page, it fetches all pokemon entries, creates an img element, fetches the pokemon sprite from github and appends the img in a grid. At the end of the process it creates a grid that displays all the pokemon that exist.

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
                categoryElement.setAttribute(`src`, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`)
                document.getElementById(`pokemonSprites`).appendChild(categoryElement)

            });
        })
}
getPokemons()

document.getElementById("pokemonSprites").addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "IMG") {
        console.log("List item ", e.target.id, " was clicked!");
        let pokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.id}`
        const getPokemonFromMainPage = (event) => {
            fetch(pokemon)
                .then((responseData) => {
                    return responseData.json()
                })
                .then((jsonData) => {
                    document.getElementById(`pokemonSprites`).innerText = null

                    let pokemon = jsonData

                    let pokemonId = jsonData.id

                    let pokemonInfoDiv = document.createElement(`div`)
                    let pokemonSpriteDiv = document.createElement(`div`)
                    let PokemonFrontBack = document.createElement(`div`)
                    let nextPreviousButton = document.createElement(`div`)

                    let pokemonName = document.createElement(`p`)
                    let pokemonWeight = document.createElement(`p`)
                    let pokemonHeight = document.createElement(`p`)
                    let pokemonType = document.createElement(`p`)
                    let pokemonNext = document.createElement(`button`)
                    let pokemonPrevious = document.createElement(`button`)

                    pokemonInfoDiv.setAttribute(`id`, `infoDiv`)
                    pokemonSpriteDiv.setAttribute(`id`, `spriteDiv`)
                    PokemonFrontBack.setAttribute(`id`, `frontBackDiv`)
                    nextPreviousButton.setAttribute(`id`, `nextPreviousDiv`)


                    pokemonNext.setAttribute(`id`, `nextButton`)
                    pokemonNext.setAttribute(`value`, `${pokemonId + 1}`)
                    pokemonNext.innerText = `>`
                    pokemonPrevious.setAttribute(`id`, `previousButton`)
                    pokemonPrevious.setAttribute(`value`, `${pokemonId - 1}`)
                    pokemonPrevious.innerText = `<`

                    pokemonName.setAttribute(`id`, `pokemonName`)
                    pokemonWeight.setAttribute(`id`, `pokemonWeight`)
                    pokemonHeight.setAttribute(`id`, `pokemonHeigt`)
                    pokemonType.setAttribute(`id`, `type`)

                    let pokemonNameString = `${pokemon.name}`
                    let pokemonWeightInKg = (pokemon.weight * 100) / 1000
                    let pokemonHeightInMeters = pokemon.height / 10

                    pokemonName.innerText = pokemonNameString.toUpperCase()
                    pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`
                    pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`
                    pokemonType.innerText = `TYPE:`
                    pokemonPrevious.innerText = `<`
                    pokemonNext.innerText = `>`

                    document.getElementById(`fetchedPokemon`).appendChild(pokemonInfoDiv)
                    document.getElementById(`fetchedPokemon`).appendChild(pokemonSpriteDiv)
                    document.getElementById(`mainDiv`).appendChild(nextPreviousButton)

                    document.getElementById(`infoDiv`).appendChild(pokemonName)
                    document.getElementById(`infoDiv`).appendChild(pokemonWeight)
                    document.getElementById(`infoDiv`).appendChild(pokemonHeight)
                    document.getElementById(`infoDiv`).appendChild(pokemonType)

                    document.getElementById(`nextPreviousDiv`).appendChild(pokemonPrevious)
                    document.getElementById(`nextPreviousDiv`).appendChild(pokemonNext)


                    jsonData.types.forEach(type => {
                        let typeString = `${document.getElementById(`type`).innerText} ${type.type.name}`
                        pokemonType.innerText = typeString.toUpperCase()

                    });

                    jsonData.stats.forEach(stat => {
                        let statName = document.createElement(`p`)
                        let statString = `${stat.stat.name}: ${stat.base_stat}`
                        statName.setAttribute(`id`, `${stat.stat.name}`)
                        statName.innerText = statString.toUpperCase()
                        document.getElementById(`infoDiv`).appendChild(statName)

                    });
                    let pokemonFront = document.createElement(`img`)
                    let pokemonBack = document.createElement(`img`)
                    let pokemonOfficial = document.createElement(`img`)

                    pokemonFront.setAttribute(`id`, `frontSprite`)
                    pokemonBack.setAttribute(`id`, `backSprite`)
                    pokemonOfficial.setAttribute(`id`, `officialArt`)

                    pokemonFront.setAttribute(`src`, pokemon.sprites.front_default)
                    pokemonBack.setAttribute(`src`, pokemon.sprites.back_default)
                    pokemonOfficial.setAttribute(`src`, pokemon.sprites.other["official-artwork"].front_default)

                    document.getElementById(`spriteDiv`).appendChild(pokemonOfficial)
                    document.getElementById(`spriteDiv`).appendChild(PokemonFrontBack)

                    document.getElementById(`frontBackDiv`).appendChild(pokemonFront)
                    document.getElementById(`frontBackDiv`).appendChild(pokemonBack)

                    document.getElementById("nextPreviousDiv").addEventListener("click", function (e) {
                        if (e.target && e.target.nodeName == "BUTTON") {
                            console.log("List item ", e.target.value, " was clicked!");
                            let pokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.value}`
                            const getNextOrPreviousPokemon = (event) => {
                                fetch(pokemon)
                                    .then((responseData) => {
                                        return responseData.json()
                                    })
                                    .then((jsonData) => {

                                        let pokemon = jsonData

                                        let pokemonId = jsonData.id

                                        pokemonNext.setAttribute(`value`, `${pokemonId + 1}`)
                                        pokemonPrevious.setAttribute(`value`, `${pokemonId - 1}`)

                                        let pokemonNameString = `${pokemon.name}`
                                        let pokemonWeightInKg = (pokemon.weight * 100) / 1000
                                        let pokemonHeightInMeters = pokemon.height / 10

                                        pokemonName.innerText = pokemonNameString.toUpperCase()
                                        pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`
                                        pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`

                                        // // Clearing Type Data
                                        document.getElementById(`type`).innerText = `TYPE:`

                                        jsonData.types.forEach(type => {
                                            let typeString = `${document.getElementById(`type`).innerText} ${type.type.name}`
                                            document.getElementById(`type`).innerText = typeString.toUpperCase()
                                        });

                                        jsonData.stats.forEach(stat => {
                                            let statString = `${stat.stat.name}: ${stat.base_stat}`
                                            document.getElementById(`${stat.stat.name}`).innerText = statString.toUpperCase()

                                        });

                                        pokemonFront.setAttribute(`src`, pokemon.sprites.front_default)
                                        pokemonBack.setAttribute(`src`, pokemon.sprites.back_default)
                                        pokemonOfficial.setAttribute(`src`, pokemon.sprites.other["official-artwork"].front_default)
                                    })
                            }
                            getNextOrPreviousPokemon()
                        }
                    })
                })
        }
        getPokemonFromMainPage()
    }
})

document.getElementById(`pokemon-logo`).addEventListener(`click`, location.reload.bind(location))


// searchbar function



const getPokemonFromMainPageSearch = (event) => {
    let pokemonSearch = document.getElementById(`searchbar`).value
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`

    console.log(pokemonSearch)
    console.log(pokemonUrl)
    fetch(pokemonUrl)
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {

            ifCond = document.getElementById(`pokemonSprites`).innerHTML

            if (ifCond == '') {
                let pokemon = jsonData

                let pokemonId = jsonData.id

                let pokemonName = document.getElementById(`pokemonName`)
                let pokemonWeight = document.getElementById(`pokemonWeight`)
                let pokemonHeight = document.getElementById(`pokemonHeigt`)
                let pokemonFront = document.getElementById(`frontSprite`)
                let pokemonBack = document.getElementById(`backSprite`)
                let pokemonOfficial = document.getElementById(`officialArt`)
                let pokemonNext = document.getElementById(`nextButton`)
                let pokemonPrevious = document.getElementById(`previousButton`)

                pokemonNext.setAttribute(`value`,`${pokemonId+1}`)
                pokemonPrevious.setAttribute(`value`,`${pokemonId-1}`)
                // document.getElementById(`${pokemonId}`).setAttribute(`id`,`${pokemonId+1}`)
                // pokemonPrevious.setAttribute(`id`, `${pokemonId-1}`)

                let pokemonNameString = `${pokemon.name}`
                let pokemonWeightInKg = (pokemon.weight * 100) / 1000
                let pokemonHeightInMeters = pokemon.height / 10

                pokemonName.innerText = pokemonNameString.toUpperCase()
                pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`
                pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`

                // // Clearing Type Data
                document.getElementById(`type`).innerText = `TYPE:`

                jsonData.types.forEach(type => {
                    let typeString = `${document.getElementById(`type`).innerText} ${type.type.name}`
                    document.getElementById(`type`).innerText = typeString.toUpperCase()
                });

                jsonData.stats.forEach(stat => {
                    let statString = `${stat.stat.name}: ${stat.base_stat}`
                    document.getElementById(`${stat.stat.name}`).innerText = statString.toUpperCase()

                });

                pokemonFront.setAttribute(`src`, pokemon.sprites.front_default)
                pokemonBack.setAttribute(`src`, pokemon.sprites.back_default)
                pokemonOfficial.setAttribute(`src`, pokemon.sprites.other["official-artwork"].front_default)
            }

            else {

                document.getElementById(`pokemonSprites`).innerText = null

                let pokemon = jsonData

                let pokemonId = jsonData.id

                let pokemonInfoDiv = document.createElement(`div`)
                let pokemonSpriteDiv = document.createElement(`div`)
                let PokemonFrontBack = document.createElement(`div`)
                let nextPreviousButton = document.createElement(`div`)

                let pokemonName = document.createElement(`p`)
                let pokemonWeight = document.createElement(`p`)
                let pokemonHeight = document.createElement(`p`)
                let pokemonType = document.createElement(`p`)
                let pokemonNext = document.createElement(`button`)
                let pokemonPrevious = document.createElement(`button`)

                pokemonInfoDiv.setAttribute(`id`, `infoDiv`)
                pokemonSpriteDiv.setAttribute(`id`, `spriteDiv`)
                PokemonFrontBack.setAttribute(`id`, `frontBackDiv`)
                nextPreviousButton.setAttribute(`id`, `nextPreviousDiv`)

                pokemonNext.setAttribute(`id`, `nextButton`)
                pokemonNext.setAttribute(`value`, `${pokemonId + 1}`)
                pokemonPrevious.setAttribute(`id`, `previousButton`)
                pokemonPrevious.setAttribute(`value`, `${pokemonId - 1}`)

                pokemonName.setAttribute(`id`, `pokemonName`)
                pokemonWeight.setAttribute(`id`, `pokemonWeight`)
                pokemonHeight.setAttribute(`id`, `pokemonHeigt`)
                pokemonType.setAttribute(`id`, `type`)

                let pokemonNameString = `${pokemon.name}`
                let pokemonWeightInKg = (pokemon.weight * 100) / 1000
                let pokemonHeightInMeters = pokemon.height / 10

                pokemonName.innerText = pokemonNameString.toUpperCase()
                pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`
                pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`
                pokemonType.innerText = `TYPE:`
                pokemonPrevious.innerText = `<`
                pokemonNext.innerText = `>`

                document.getElementById(`fetchedPokemon`).appendChild(pokemonInfoDiv)
                document.getElementById(`fetchedPokemon`).appendChild(pokemonSpriteDiv)
                document.getElementById(`mainDiv`).appendChild(nextPreviousButton)

                document.getElementById(`infoDiv`).appendChild(pokemonName)
                document.getElementById(`infoDiv`).appendChild(pokemonWeight)
                document.getElementById(`infoDiv`).appendChild(pokemonHeight)
                document.getElementById(`infoDiv`).appendChild(pokemonType)

                document.getElementById(`nextPreviousDiv`).appendChild(pokemonPrevious)
                document.getElementById(`nextPreviousDiv`).appendChild(pokemonNext)


                jsonData.types.forEach(type => {
                    let typeString = `${document.getElementById(`type`).innerText} ${type.type.name}`
                    pokemonType.innerText = typeString.toUpperCase()

                });

                jsonData.stats.forEach(stat => {
                    let statName = document.createElement(`p`)
                    let statString = `${stat.stat.name}: ${stat.base_stat}`
                    statName.setAttribute(`id`, `${stat.stat.name}`)
                    statName.innerText = statString.toUpperCase()
                    document.getElementById(`infoDiv`).appendChild(statName)

                });
                let pokemonFront = document.createElement(`img`)
                let pokemonBack = document.createElement(`img`)
                let pokemonOfficial = document.createElement(`img`)

                pokemonFront.setAttribute(`id`, `frontSprite`)
                pokemonBack.setAttribute(`id`, `backSprite`)
                pokemonOfficial.setAttribute(`id`, `officialArt`)

                pokemonFront.setAttribute(`src`, pokemon.sprites.front_default)
                pokemonBack.setAttribute(`src`, pokemon.sprites.back_default)
                pokemonOfficial.setAttribute(`src`, pokemon.sprites.other["official-artwork"].front_default)

                document.getElementById(`spriteDiv`).appendChild(pokemonOfficial)
                document.getElementById(`spriteDiv`).appendChild(PokemonFrontBack)

                document.getElementById(`frontBackDiv`).appendChild(pokemonFront)
                document.getElementById(`frontBackDiv`).appendChild(pokemonBack)
            }

            document.getElementById("nextPreviousDiv").addEventListener("click", function (e) {
                if (e.target && e.target.nodeName == "BUTTON") {
                    console.log("List item ", e.target.value, " was clicked!");
                    let pokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.value}`
                    const getNextOrPreviousPokemon = (event) => {
                        fetch(pokemon)
                            .then((responseData) => {
                                return responseData.json()
                            })
                            .then((jsonData) => {

                                let pokemon = jsonData

                                let pokemonId = jsonData.id

                                let pokemonName = document.getElementById(`pokemonName`)
                                let pokemonWeight = document.getElementById(`pokemonWeight`)
                                let pokemonHeight = document.getElementById(`pokemonHeigt`)
                                let pokemonFront = document.getElementById(`frontSprite`)
                                let pokemonBack = document.getElementById(`backSprite`)
                                let pokemonOfficial = document.getElementById(`officialArt`)
                                let pokemonNext = document.getElementById(`nextButton`)
                                let pokemonPrevious = document.getElementById(`previousButton`)

                                pokemonNext.setAttribute(`value`, `${pokemonId + 1}`)
                                pokemonPrevious.setAttribute(`value`, `${pokemonId - 1}`)

                                let pokemonNameString = `${pokemon.name}`
                                let pokemonWeightInKg = (pokemon.weight * 100) / 1000
                                let pokemonHeightInMeters = pokemon.height / 10

                                pokemonName.innerText = pokemonNameString.toUpperCase()
                                pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`
                                pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`

                                // // Clearing Type Data
                                document.getElementById(`type`).innerText = `TYPE:`

                                jsonData.types.forEach(type => {
                                    let typeString = `${document.getElementById(`type`).innerText} ${type.type.name}`
                                    document.getElementById(`type`).innerText = typeString.toUpperCase()
                                });

                                jsonData.stats.forEach(stat => {
                                    let statString = `${stat.stat.name}: ${stat.base_stat}`
                                    document.getElementById(`${stat.stat.name}`).innerText = statString.toUpperCase()

                                });

                                pokemonFront.setAttribute(`src`, pokemon.sprites.front_default)
                                pokemonBack.setAttribute(`src`, pokemon.sprites.back_default)
                                pokemonOfficial.setAttribute(`src`, pokemon.sprites.other["official-artwork"].front_default)
                            })
                    }
                    getNextOrPreviousPokemon()

                }
            })

        })
}
document.getElementById(`searchButton`).addEventListener(`click`, getPokemonFromMainPageSearch)



