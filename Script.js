document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    let animes = [];

    // Função para buscar e carregar os dados do JSON
    async function loadAnimes() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            animes = await response.json();
            displayAnimes(animes);
        } catch (error) {
            console.error("Não foi possível carregar os dados dos animes:", error);
            cardContainer.innerHTML = "<p>Erro ao carregar os animes. Tente novamente mais tarde.</p>";
        }
    }

    // Função para criar e exibir os cards
    function displayAnimes(animeList) {
        cardContainer.innerHTML = ''; // Limpa o container
        if (animeList.length === 0) {
            cardContainer.innerHTML = "<p>Nenhum anime encontrado com esse nome.</p>";
            return;
        }

        animeList.forEach(anime => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${anime.imagem}" alt="Capa do anime ${anime.nome}">
                <div class="card-content">
                    <h2>${anime.nome} (${anime.ano})</h2>
                    <p>${anime.descrisao}</p>
                    <a href="${anime.link}" target="_blank">Saiba Mais</a>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    }

    // Função para filtrar os animes com base na busca
    function filterAnimes() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredAnimes = animes.filter(anime => 
            anime.nome.toLowerCase().includes(searchTerm)
        );
        displayAnimes(filteredAnimes);
    }

    // Adiciona os eventos de busca
    searchButton.addEventListener('click', filterAnimes);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterAnimes();
        }
    });

    // Carrega os animes ao iniciar a página
    loadAnimes();
});
