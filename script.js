// Endereço da API
const urlAPI = 'https://rickandmortyapi.com/api/character';

// Pega a div do HTML onde os cards vão ficar
const containerHTML = document.getElementById('card-container');

// Traduz o status
function traduzirStatus(status) {
    if (status === 'Alive') return 'Vivo';
    if (status === 'Dead') return 'Morto';
    return 'Desconhecido';
}

// Traduz a espécie
function traduzirEspecie(especie) {
    if (especie === 'Human') return 'Humano';
    if (especie === 'Alien') return 'Alienígena';
    if (especie === 'Humanoid') return 'Humanoide';
    if (especie === 'Robot') return 'Robô';
    return especie;
}

// Traduz a origem de forma natural
function traduzirOrigem(origem) {
    if (origem === 'unknown') return 'Desconhecida';
    if (origem.includes('Replacement Dimension')) return 'Terra (Realidade Substituta)';
    if (origem.includes('Earth')) return origem.replace('Earth', 'Terra');
    if (origem.includes('Citadel of Ricks')) return 'Cidadela dos Ricks';
    if (origem.includes('Worldender\'s lair')) return 'Covil do Worldender';
    if (origem.includes('Anatomy Park')) return 'Parque de Anatomia';
    if (origem.includes('Post-Apocalyptic Earth')) return 'Terra Pós-Apocalíptica';
    return origem;
}

// Busca os dados da API
fetch(urlAPI)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dados) {
        const listaPersonagens = dados.results;

        // Cria o card de cada personagem
        listaPersonagens.forEach(function(personagem) {
            
            // Caixa principal
            const card = document.createElement('div');
            card.classList.add('card');

            // Topo com nome e coração
            const cabecalho = document.createElement('div');
            cabecalho.classList.add('card-header');
            
            const nome = document.createElement('h3');
            nome.textContent = personagem.name; // Nome original sem alteração
            
            const coracao = document.createElement('span');
            coracao.classList.add('heart-icon');
            coracao.innerHTML = '&#9825;';

            cabecalho.appendChild(nome);
            cabecalho.appendChild(coracao);

            // Imagem
            const imagem = document.createElement('img');
            imagem.src = personagem.image;
            imagem.alt = personagem.name;

            // Informações
            const informacoes = document.createElement('div');
            informacoes.classList.add('card-info');

            const status = document.createElement('p');
            status.textContent = 'Status: ' + traduzirStatus(personagem.status);

            const especie = document.createElement('p');
            especie.textContent = 'Espécie: ' + traduzirEspecie(personagem.species);

            const origem = document.createElement('p');
            origem.textContent = 'Origem: ' + traduzirOrigem(personagem.origin.name);

            informacoes.appendChild(status);
            informacoes.appendChild(especie);
            informacoes.appendChild(origem);

            // Junta os elementos no card
            card.appendChild(cabecalho);
            card.appendChild(imagem);
            card.appendChild(informacoes);

            // Insere o card no HTML
            containerHTML.appendChild(card);
        });
    })
    .catch(function(erro) {
        console.log('Erro ao carregar a API:', erro);
    });