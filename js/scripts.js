const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
  
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
 if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data
  }
  
  
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando';
  pokemonNumber.innerHTML = '';
  pokemonImage.alt = ''


    
  
  const data = await  fetchPokemon(pokemon);

  setTimeout(() => {
  if(data){
    pokemonImage.display = 'block'
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.alt = `${data.name}, eu escolho você!`
    input.value = ''
    searchPokemon = data.id  
    
  } else{
    pokemonImage.src = ''
    pokemonImage.display = 'none'
    pokemonName.innerHTML = 'Não encontrado';
    pokemonImage.alt = `${data.name}, eu escolho você!`
}
}, 3000);
}
form.addEventListener('submit', (e) =>{
  e.preventDefault()
  const pokemon = input.value.toLowerCase()
  

  renderPokemon(pokemon)

})

btnPrev.addEventListener('click', (e) =>{
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }
 
})

btnNext.addEventListener('click', (e) =>{
  searchPokemon += 1;
  renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon)

