
// Variáveis globais
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

// Formulário
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

// Botões
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

//Audios
const audioClick = new Audio('./audios/click.mp3')
const audioProcurou = new Audio('./audios/procurou.mp3')
const audio404 = new Audio('./audios/404.mp3')

// Primeiro pokemon aleatório
let searchPokemon = Math.floor(Math.random() * 649) + 1;

// API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
    
}

//Renderizando o Pokemon
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data) {
        // Retorno do pokemon que existe
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id
        input.value = ''
    } else {
        // O que retorna se o pokemon não existir
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado :('
        audio404.play()
    }
}

// Evento do botão enter ou submit no celular
form.addEventListener ('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
    audioProcurou.play()
})

// Evento do click no botão Voltar
btnPrev.addEventListener ('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
        audioClick.play()
    }
})

// Evento do click no botão Avançar
btnNext.addEventListener ('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1
        renderPokemon(searchPokemon)
        audioClick.play()
    }
    
})
// Chama a função para exibir o primeiro pokemon aleatório sempre
renderPokemon(searchPokemon)