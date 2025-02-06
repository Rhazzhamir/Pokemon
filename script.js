document.addEventListener('DOMContentLoaded', async function () {
    let currentPage = 1;
    const limit = 50;
    const totalPages = 10;

    async function fetchData(page = 1) {
        try {
            const offset = (page - 1) * limit;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

            if (!response.ok) {
                throw new Error('Could not fetch the resource');
            }

            const data = await response.json();
            const cardContainer = document.querySelector('#pokemon-cards');
            cardContainer.innerHTML = ''; // Clear previous cards

            data.results.forEach(async (pokemon) => {
                const pokemonData = await fetch(pokemon.url);
                const pokemonDetails = await pokemonData.json();

                displayPokemon(pokemonDetails);
            });

            updatePagination(page);
        } catch (error) {
            console.error(error);
        }
    }

    function displayPokemon(pokemonDetails) {
        const cardContainer = document.querySelector('#pokemon-cards');
        const pokemonSprite = pokemonDetails.sprites.front_default;
        const pokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
        const abilities = pokemonDetails.abilities.map(ability => ability.ability.name).join(', ');
        const type = pokemonDetails.types.map(type => type.type.name).join(', ');
        const id = pokemonDetails.id;
        const weight = pokemonDetails.weight;

        const cardHTML = `
            <div class="col-3 mb-3">
                <div class="card shadow-lg">
                    <img src="${pokemonSprite}" class="card-img-top" alt="${pokemonName}">
                    <div class="card-body bg-light">
                        <div class="d-flex justify-content-between">
                            <small>#00${id}</small>
                            <small><b>Weight:</b> ${weight}</small>
                        </div>
                        <h5 class="card-title">
                            <b>${pokemonName}</b>
                        </h5>
                        <span class="badge p-2 mb-2 rounded-pill bg-warning border border-3 border-primary text-dark ">
                            ${type}
                        </span>
                        <p class="card-text"><strong>Abilities:</strong> ${abilities}</p>
                    </div>
                </div>
            </div>
        `;

        cardContainer.innerHTML += cardHTML;
    }

    function updatePagination(page) {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === page ? 'active' : '';
            const pageItemHTML = `
                <li class="page-item ${activeClass}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
            pagination.innerHTML += pageItemHTML;
        }

        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const newPage = parseInt(link.getAttribute('data-page'));
                fetchData(newPage);
            });
        });
    }

    async function searchPokemon() {
        const pokemonName = document.querySelector('#pokemonName').value.toLowerCase();
        const cardContainer = document.querySelector('#pokemon-cards');

        if (!pokemonName) {
            fetchData(currentPage);
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

            if (!response.ok) {
                throw new Error('Could not fetch the resource');
            }

            const data = await response.json();
            cardContainer.innerHTML = ''; 
            displayPokemon(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    document.querySelector('#button').addEventListener('click', searchPokemon);

    fetchData(currentPage);
});
