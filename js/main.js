// This url is where all the pokemon names and id's are stored.

const pokedexUrl = `https://pokeapi.co/api/v2/pokedex/1/`;

// A page reload function that is executed when the user clicks the pokemon logo at the top. This reloads the page and allows the user to view the pokemon grid once more.

document
  .getElementById(`pokemon-logo`)
  .addEventListener(`click`, location.reload.bind(location));

// The following array is used by the autocomplete search bar function. It is filled with all the pokemon names when the getPokemons function is called at the very beggining.

const allPokemonNames = [];

// The Folllowing function creates the main page, it fetches all pokemon entries, creates an img element for each one, fetches the pokemon sprites from github and appends the img elememts to the HTML. At the end of this process it creates a grid that displays all the pokemon that exist.

const getPokemons = () => {
  fetch(pokedexUrl)
    .then((responseData) => {
      return responseData.json();
    })
    .then((jsonData) => {
      jsonData.pokemon_entries.forEach((pokemon) => {
        let categoryElement = document.createElement("img");
        categoryElement.setAttribute(`class`, `pokemonSprite`);
        categoryElement.setAttribute(`id`, pokemon.entry_number);
        categoryElement.setAttribute(
          `src`,
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`
        );
        document.getElementById(`pokemonSprites`).appendChild(categoryElement);
        allPokemonNames.push(pokemon.pokemon_species.name);
      });
    });
}

// Calling the getPokemons functions to load the main page.

getPokemons();

// The following function removes the main page pokemon grid, creates an information section, an image section, and the "previous" and "next" buttons. It then fetches information from the API and replaces the innertext values of the <p> elements within the information section with the name, weight, height and pokemon stats.

const createPageElementsAndFetchInfo = (jsonData) => {
  document.getElementById(`pokemonSprites`).innerText = null;

  let pokemon = jsonData;

  let pokemonId = jsonData.id;

  let pokemonInfoDiv = document.createElement(`div`);
  let pokemonSpriteDiv = document.createElement(`div`);
  let pokemonFrontBack = document.createElement(`div`);
  let nextPreviousButton = document.createElement(`div`);

  let pokemonName = document.createElement(`p`);
  let pokemonIdNumber = document.createElement(`P`)
  let pokemonWeight = document.createElement(`p`);
  let pokemonHeight = document.createElement(`p`);
  let pokemonType = document.createElement(`p`);
  let pokemonNext = document.createElement(`button`);
  let pokemonPrevious = document.createElement(`button`);

  pokemonInfoDiv.setAttribute(`id`, `infoDiv`);
  pokemonSpriteDiv.setAttribute(`id`, `spriteDiv`);
  pokemonFrontBack.setAttribute(`id`, `frontBackDiv`);
  nextPreviousButton.setAttribute(`id`, `nextPreviousDiv`);

  pokemonNext.setAttribute(`id`, `nextButton`);
  pokemonNext.setAttribute(`value`, `${pokemonId + 1}`);
  pokemonPrevious.setAttribute(`id`, `previousButton`);
  pokemonPrevious.setAttribute(`value`, `${pokemonId - 1}`);

  pokemonName.setAttribute(`id`, `pokemonName`);
  pokemonIdNumber.setAttribute(`id`, `pokemonIdNumber`)
  pokemonWeight.setAttribute(`id`, `pokemonWeight`);
  pokemonHeight.setAttribute(`id`, `pokemonHeigt`);
  pokemonType.setAttribute(`id`, `type`);

  let pokemonNameString = `${pokemon.name}`;
  let pokemonWeightInKg = (pokemon.weight * 100) / 1000;
  let pokemonHeightInMeters = pokemon.height / 10;

  pokemonName.innerText = pokemonNameString.toUpperCase();
  pokemonIdNumber.innerText = `POKEDEX # ${pokemon.id}`
  pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`;
  pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`;
  pokemonType.innerText = `TYPE:`;
  pokemonPrevious.innerText = `<`;
  pokemonNext.innerText = `>`;

  document.getElementById(`fetchedPokemon`).appendChild(pokemonInfoDiv);
  document.getElementById(`fetchedPokemon`).appendChild(pokemonSpriteDiv);
  document.getElementById(`mainDiv`).appendChild(nextPreviousButton);

  document.getElementById(`infoDiv`).appendChild(pokemonName);
  document.getElementById(`infoDiv`).appendChild(pokemonIdNumber)
  document.getElementById(`infoDiv`).appendChild(pokemonWeight);
  document.getElementById(`infoDiv`).appendChild(pokemonHeight);
  document.getElementById(`infoDiv`).appendChild(pokemonType);

  document.getElementById(`nextPreviousDiv`).appendChild(pokemonPrevious);
  document.getElementById(`nextPreviousDiv`).appendChild(pokemonNext);

  jsonData.types.forEach((type) => {
    let typeString = `${document.getElementById(`type`).innerText} ${
      type.type.name
    }`;
    pokemonType.innerText = typeString.toUpperCase();
  });

  jsonData.stats.forEach((stat) => {
    let statName = document.createElement(`p`);
    let statString = `${stat.stat.name}: ${stat.base_stat}`;
    statName.setAttribute(`id`, `${stat.stat.name}`);
    statName.innerText = statString.toUpperCase();
    document.getElementById(`infoDiv`).appendChild(statName);
  });
  let pokemonFront = document.createElement(`img`);
  let pokemonBack = document.createElement(`img`);
  let pokemonOfficial = document.createElement(`img`);

  pokemonFront.setAttribute(`id`, `frontSprite`);
  pokemonBack.setAttribute(`id`, `backSprite`);
  pokemonOfficial.setAttribute(`id`, `officialArt`);

  pokemonFront.setAttribute(`src`, pokemon.sprites.front_default);
  pokemonBack.setAttribute(`src`, pokemon.sprites.back_default);
  pokemonOfficial.setAttribute(
    `src`,
    pokemon.sprites.other["official-artwork"].front_default
  );

  document.getElementById(`spriteDiv`).appendChild(pokemonOfficial);
  document.getElementById(`spriteDiv`).appendChild(pokemonFrontBack);

  document.getElementById(`frontBackDiv`).appendChild(pokemonFront);
  document.getElementById(`frontBackDiv`).appendChild(pokemonBack);
};

// The following function adds click event listeners to the previous and next buttons, that will callback another function that fetches information from the next or previous pokemon in the array.

const addNextPreviousEventListener = () => {
  document
    .getElementById("nextPreviousDiv")
    .addEventListener("click", function (e) {
      if (e.target && e.target.nodeName == "BUTTON") {
        let pokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.value}`;
        getNextOrPreviousPokemon(pokemon);
      }
    });
};

// The following function is executed when the user clicks the next or previous button, it fetches another pokemon and updates the information and image divs. It will use the value that each button is assigned to fetch another pokemon. The next button has a +1 value compared to the current pokemon the user is viewing, and the previous button has a -1 value. This value allows the function to fetch the corresponding pokemon. These values are assigned when the buttons are created based on which pokemon was clicked or searched.

const getNextOrPreviousPokemon = (pokemon) => {
  fetch(pokemon)
    .then((responseData) => {
      return responseData.json();
    })
    .then((jsonData) => {
      let pokemon = jsonData;

      let pokemonId = jsonData.id;

      let pokemonName = document.getElementById(`pokemonName`);
      let pokemonWeight = document.getElementById(`pokemonWeight`);
      let pokemonIdNumber = document.getElementById(`pokemonIdNumber`)
      let pokemonHeight = document.getElementById(`pokemonHeigt`);
      let pokemonFront = document.getElementById(`frontSprite`);
      let pokemonBack = document.getElementById(`backSprite`);
      let pokemonOfficial = document.getElementById(`officialArt`);
      let pokemonNext = document.getElementById(`nextButton`);
      let pokemonPrevious = document.getElementById(`previousButton`);

      pokemonNext.setAttribute(`value`, `${pokemonId + 1}`);
      pokemonPrevious.setAttribute(`value`, `${pokemonId - 1}`);

      let pokemonNameString = `${pokemon.name}`;
      let pokemonWeightInKg = (pokemon.weight * 100) / 1000;
      let pokemonHeightInMeters = pokemon.height / 10;

      pokemonName.innerText = pokemonNameString.toUpperCase();
      pokemonIdNumber.innerText =`POKEDEX # ${pokemon.id}`
      pokemonWeight.innerText = `WEIGHT: ${pokemonWeightInKg}Kg`;
      pokemonHeight.innerText = `HEIGHT: ${pokemonHeightInMeters}m`;

      // // Clearing Type Data
      document.getElementById(`type`).innerText = `TYPE:`;

      jsonData.types.forEach((type) => {
        let typeString = `${document.getElementById(`type`).innerText} ${
          type.type.name
        }`;
        document.getElementById(`type`).innerText = typeString.toUpperCase();
      });

      jsonData.stats.forEach((stat) => {
        let statString = `${stat.stat.name}: ${stat.base_stat}`;
        document.getElementById(
          `${stat.stat.name}`
        ).innerText = statString.toUpperCase();
      });

      pokemonFront.setAttribute(`src`, pokemon.sprites.front_default);
      pokemonBack.setAttribute(`src`, pokemon.sprites.back_default);
      pokemonOfficial.setAttribute(
        `src`,
        pokemon.sprites.other["official-artwork"].front_default
      );
    });
};

// The Following function is executed when clicking a pokemon from the main page grid. It will create an information div, an image div, the previous and next buttons, and it will create a paragraph element for each element of information fetched from the API. It will then fetch the pokemon information from the API and change the innertext values of the elements created and add click events to the next and previous buttons. This creates the basic functionality of the page.

document
  .getElementById("pokemonSprites")
  .addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "IMG") {
      let pokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.id}`;
      const getPokemonFromMainPage = () => {
        fetch(pokemon)
          .then((responseData) => {
            return responseData.json();
          })
          .then((jsonData) => {
            createPageElementsAndFetchInfo(jsonData);
            addNextPreviousEventListener(jsonData);
          });
      };
      getPokemonFromMainPage();
    }
  });

// The following function takes the input from the search bar and fetches the pokemon to display it on page. The if conditions are for the different places a user can search a pokemon from : Main page or when a pokemon is already loaded. It also avoids the function from running if the search bar is empty and a user clicks the search button, which resulted in a page breaking bug.

const getPokemonFromSearch = () => {
  let pokemonSearchInput = document.getElementById(`searchPokemonInput`).value;
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonSearchInput}`;
  document.getElementById(`searchPokemonInput`).value = ``;

  fetch(pokemonUrl)
    .then((responseData) => {
      return responseData.json();
    })
    .then((jsonData) => {
      let pokemonGrid = document.getElementById(`pokemonSprites`).innerHTML;

      if (pokemonSearchInput == "") {
        // DO NOTHING
      } else {
        if (pokemonGrid == "") {
          getNextOrPreviousPokemon(pokemonUrl);
        } else {
          createPageElementsAndFetchInfo(jsonData);
        }

        addNextPreviousEventListener(jsonData);
      }
    })
    .catch(() => {
      // DO NOTHING
    });
};

// Search button event listener

document
  .getElementById(`searchButton`)
  .addEventListener(`click`, getPokemonFromSearch);

// The following function is a code snippet from W3 schools https://www.w3schools.com/howto/howto_js_autocomplete.asp
// This code is for an autocomplete feature that initializes when the user starts typing in the search bar. It takes the allPokemonNames array declared at the beggining of this document, and allows the user to search for a specific pokemon much faster and easier.
// I've left the comments in the code to understand how the code works.

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
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
        b.addEventListener("click", function (e) {
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
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
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
    if (currentFocus < 0) currentFocus = x.length - 1;
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

autocomplete(document.getElementById("searchPokemonInput"), allPokemonNames);
