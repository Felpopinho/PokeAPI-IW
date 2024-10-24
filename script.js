const iSearch = document.getElementById("inputSearch")
const idPokemon = document.getElementById("idPokemon")
const nomePokemon = document.getElementById("nomePokemon")
const tipoPokemon = document.getElementById("tipoPokemon")
const imgPokemon = document.getElementById("imgPokemon")
const altPokemon = document.getElementById("altPokemon")
const pesoPokemon = document.getElementById("pesoPokemon")

const inputEquipeSearch = document.getElementById("inputSearchEquipe")
const pokemonUm = document.getElementById("pokemonUm")
const pokemonDois = document.getElementById("pokemonDois")

var pokemonAtualCont = 1

async function searchPokemon(section){

    if(iSearch.value === ""){
        var input = inputEquipeSearch.value
    }else{
        var input = iSearch.value
    }
    
    const url = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        console.log(pokemon);
        if(section === 1){
            visualizarPokemon(pokemon);
        } else{
            adicionarPokemon(pokemon)
        }
        iSearch.value = ""
        inputEquipeSearch = ""
    } catch (error) {
        console.log(error.message);
    }
}

function visualizarPokemon(data){
    idPokemon.innerText = `${data.id}`
    nomePokemon.innerText = `${data.name}`
    imgPokemon.src = `${data.sprites.other.showdown.front_default}`
    tipoPokemon.innerText = `${data.types.map(type => type.type.name).join(', ')}`
    altPokemon.innerText = `${data.height / 10}`
    pesoPokemon.innerText = `${data.weight / 10}`
}

function adicionarPokemon(pokemon){
    const id = document.getElementById(`id${pokemonAtualCont}`)
    const nome = document.getElementById(`nome${pokemonAtualCont}`)
    const img = document.getElementById(`img${pokemonAtualCont}`)
    const hp = document.getElementById(`hp${pokemonAtualCont}`)
    const vida = document.getElementById(`vida${pokemonAtualCont}`)
    const atk = document.getElementById(`atk${pokemonAtualCont}`)
    const def = document.getElementById(`def${pokemonAtualCont}`)
    const satk = document.getElementById(`satk${pokemonAtualCont}`)
    const sdef = document.getElementById(`sdef${pokemonAtualCont}`)
    const spd = document.getElementById(`spd${pokemonAtualCont}`)
    id.innerText = `${pokemon.id}`
    nome.innerText = `${pokemon.name}`
    img.src = `${pokemon.sprites.other.showdown.front_default}`
    vida.value = `${pokemon.stats[0].base_stat}`
    vida.setAttribute("max", `${pokemon.stats[0].base_stat}`)
    hp.innerHTML = `${pokemon.stats[0].base_stat}/${pokemon.stats[0].base_stat}`
    atk.innerHTML = `<span>Ataque:</span>${pokemon.stats[1].base_stat}`
    def.innerHTML = `<span>Defesa:</span>${pokemon.stats[2].base_stat}`
    satk.innerHTML = `<span>S. Atq:</span>${pokemon.stats[3].base_stat}`
    sdef.innerHTML = `<span>S. Def:</span>${pokemon.stats[4].base_stat}`
    spd.innerHTML = `<span>Velocidade:</span>${pokemon.stats[5].base_stat}`

    pokemon.abilities.map(hab => {
        let tHab = document.createElement("p")
        tHab.innerHTML = `${hab.ability.name}`
        document.getElementById(`habilidades${pokemonAtualCont}`).appendChild(tHab)
    })

}

function changeSection(n){
    if(n === 1){
        document.querySelector(".equipe_section").style.display = "none"
        document.querySelector(".batalha_section").style.display = "none"
        document.querySelector(".pokedex_section").style.display = "flex"
    } else if (n === 2){
        document.querySelector(".pokedex_section").style.display = "none"
        document.querySelector(".batalha_section").style.display = "none"
        document.querySelector(".equipe_section").style.display = "flex"
    } else{
        document.querySelector(".pokedex_section").style.display = "none"
        document.querySelector(".equipe_section").style.display = "none"
        document.querySelector(".batalha_section").style.display = "flex"
    }
}

function selectPokemonContainer(n){
    if(n === 1){
        pokemonAtualCont = "1"
    }else{
        pokemonAtualCont = "2"
    }
}