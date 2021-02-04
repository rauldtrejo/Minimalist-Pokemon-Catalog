console.log(`Sanity Check`)

let pokedexUrl = `https://pokeapi.co/api/v2/pokedex/1/`

// The Folllowing function creates the main page, it fetches all pokemon entries, creates an img for each one, fetches the pokemon sprite from github and appends the img in a grid. At the end of the process it creates a grid that displays all the pokemon that exist.

var countries = [];
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
                countries.push(pokemon.pokemon_species.name)
            });
        })
}
getPokemons()

// The Following function is executed when selecting a pokemon from the main page grid. It will create an information div, an image div, the previous and next buttons, and it will create a paragraph element for each element of information fetched from the API. It will then fetch the pokemon information from the API and change the innertext values of the elements created and add click events to the next and previous buttons. This creates the basic functionality of the page.

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
    let pokemonSearch = document.getElementById(`searchPokemonInput`).value
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`
    document.getElementById(`searchPokemonInput`).value = ``

    console.log(pokemonSearch)
    console.log(pokemonUrl)
    fetch(pokemonUrl)
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {

            let pokemonGrid = document.getElementById(`pokemonSprites`).innerHTML
            if(pokemonSearch == ''){
            }
            else{
            if (pokemonGrid == '') {
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

        }})
}
document.getElementById(`searchButton`).addEventListener(`click`, getPokemonFromMainPageSearch)




function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  autocomplete(document.getElementById("searchPokemonInput"), countries);