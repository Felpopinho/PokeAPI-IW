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
const pokemonTres = document.getElementById("pokemonTres")
const pokemonQuatro = document.getElementById("pokemonQuatro")
const pokemonCinco = document.getElementById("pokemonCinco")
const pokemonSeis = document.getElementById("pokemonSeis")

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
    const hab1 = document.getElementById(`hab1-${pokemonAtualCont}`)
    const hab2 = document.getElementById(`hab2-${pokemonAtualCont}`)
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
    hab1.innerText = `${pokemon.abilities[0].ability.name}`
    hab2.innerText = `${pokemon.abilities[1].ability.name}`
    vida.value = `${pokemon.stats[0].base_stat}`
    vida.setAttribute("max", `${pokemon.stats[0].base_stat}`)
    hp.innerHTML = `${pokemon.stats[0].base_stat}/${pokemon.stats[0].base_stat}`
    atk.innerHTML = `<span>Ataque:</span>${pokemon.stats[1].base_stat}`
    def.innerHTML = `<span>Defesa:</span>${pokemon.stats[2].base_stat}`
    satk.innerHTML = `<span>S. Atq:</span>${pokemon.stats[3].base_stat}`
    sdef.innerHTML = `<span>S. Def:</span>${pokemon.stats[4].base_stat}`
    spd.innerHTML = `<span>Velocidade:</span>${pokemon.stats[5].base_stat}`

    buscarMovimentos(pokemon)
    //tipoPokemon.innerText = `${pokemon.types.map(type => type.type.name).join(', ')}`
    //altPokemon.innerText = `${pokemon.height / 10}`
    //pesoPokemon.innerText = `${pokemon.weight / 10}`
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
    }else if(n===2){
        pokemonAtualCont = "2"
    }else if(n===3){
        pokemonAtualCont = "3"
    }else if(n===4){
        pokemonAtualCont = "4"
    }else if(n===5){
        pokemonAtualCont = "5"
    }else{
        pokemonAtualCont = "6"
    }
}

function buscarMovimentos(pokemon){
    const selectMoves1 = document.getElementById(`selectMoves1-${pokemonAtualCont}`)
    const selectMoves2 = document.getElementById(`selectMoves2-${pokemonAtualCont}`)
    const selectMoves3 = document.getElementById(`selectMoves3-${pokemonAtualCont}`)
    const selectMoves4 = document.getElementById(`selectMoves4-${pokemonAtualCont}`)
    pokemon.moves.map(move => {
        let nome1 = document.createElement("option")
        let nome2 = document.createElement("option")
        let nome3 = document.createElement("option")
        let nome4 = document.createElement("option")
        nome1.innerHTML = move.move.name
        nome2.innerHTML = move.move.name
        nome3.innerHTML = move.move.name
        nome4.innerHTML = move.move.name
        nome1.value = move.move.name
        nome2.value = move.move.name
        nome3.value = move.move.name
        nome4.value = move.move.name
        selectMoves1.appendChild(nome1)
        selectMoves2.appendChild(nome2)
        selectMoves3.appendChild(nome3)
        selectMoves4.appendChild(nome4)
    })
}