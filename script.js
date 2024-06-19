const btnfetch = document.querySelector('#btnfetch');

btnfetch.addEventListener('click', async function() {
    const SearchPokemon = document.querySelector('#SearchPokemon').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${SearchPokemon}`);
    try {
        if (!response.ok) {
            throw new Error("Invalid Pokemon Name!");
        }
        const data = await response.json();
        pokemon(data); 
        Resources(data);
    } catch (error) {
        const errorInput = document.querySelector('.errorInput');
        errorInput.textContent = error.message; 
        errorInput.style.display = 'block';
        errorInput.style.color = 'red';
    }
});

function pokemon(data) {
    const pokemonSprite_front = data.sprites.front_default;
    const pokemonSprite_back = data.sprites.back_default;

    const imgfront = document.querySelector('#pokemonfront');
    imgfront.src = pokemonSprite_front;
    imgfront.style.display = "block";

    const imgback = document.querySelector('#pokemonback');
    imgback.src = pokemonSprite_back;
    imgback.style.display = "block";

    console.log('Success!');
}

function Resources(data) {
    NameOfPokemon(data);
    Abilities(data);
    TypeofPokemon(data);
}

function NameOfPokemon(data) {
    const speciesName = data.species.name;
    const pokemonName = document.querySelector(".pokemonName");
    pokemonName.textContent = speciesName.toUpperCase();
}

function Abilities(data) {
    const abilities = document.querySelector('.Abilities');
    abilities.style.display = 'block';

    const abilitiesList = data.abilities;

    // Ability1
    if (abilitiesList.length > 0) {
        const firstAbility1 = abilitiesList[0].ability.name;
        const abilityElement1 = document.querySelector('.Ability1');
        abilityElement1.textContent = firstAbility1;
    }

    // Ability2
    if (abilitiesList.length > 1) {
        const firstAbility2 = abilitiesList[1].ability.name;
        const abilityElement2 = document.querySelector('.Ability2');
        abilityElement2.textContent = firstAbility2;
    }
}

function TypeofPokemon(data) {
    const Type = document.querySelector('.Type');
    Type.style.display = 'block';

    const typesList = data.types;

    // Type1
    if (typesList.length > 0) {
        const firstType1 = typesList[0].type.name;
        const typeElement1 = document.querySelector('.Type1');
        typeElement1.textContent = firstType1;
    }

    // Type2
    if (typesList.length > 1) {
        const firstType2 = typesList[1].type.name;
        const typeElement2 = document.querySelector('.Type2');
        typeElement2.textContent = firstType2;
    }
}
