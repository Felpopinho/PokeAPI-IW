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

var pokemonUmSelecionado = false;
var pokemonDoisSelecionado = false;

const pokemonBatalha = ["", ""];

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
    imgPokemon.src = `${data.sprites.front_default}`
    tipoPokemon.innerText = `${data.types.map(type => type.type.name).join(', ')}`
    altPokemon.innerText = `${data.height / 10}`
    pesoPokemon.innerText = `${data.weight / 10}`
}

function adicionarPokemon(pokemon){

    pokemonBatalha[pokemonAtualCont-1] = pokemon

    if(pokemonAtualCont === 1 || pokemonAtualCont === "1" ){
        pokemonUmSelecionado = true
    } else{
        pokemonDoisSelecionado = true
    }

    const inicialContainer = document.getElementById(`inicial${pokemonAtualCont}`)
    inicialContainer.style.display = "none"

    const containers = document.querySelectorAll(`.contIEquipe${pokemonAtualCont}`)
    containers.forEach(e =>{
        e.classList.remove(`contIEquipe${pokemonAtualCont}`)
        e.classList.add(`contSEquipe${pokemonAtualCont}`)
    })
    

    const habCont = document.getElementById(`habilidades${pokemonAtualCont}`)
    while (habCont.firstChild) {
        habCont.removeChild(habCont.firstChild);
    }

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

    console.log(pokemonDoisSelecionado)
    console.log(pokemonUmSelecionado)

    if (pokemonUmSelecionado === true && pokemonDoisSelecionado === true){
        document.getElementById("btnStartBattle").style.display = "flex"
    } else{
        document.getElementById("btnStartBattle").style.display = "none"
    }

}

function changeSection(n){
    if(n === 1){
        document.querySelector(".batalha_section").style.display = "none"
        document.querySelector(".pokedex_section").style.display = "flex"
    } else{
        document.querySelector(".pokedex_section").style.display = "none"
        document.querySelector(".batalha_section").style.display = "flex"
    }
}

function selectPokemonContainer(n){
    if(n === 1){
        pokemonAtualCont = 1
    }else{
        pokemonAtualCont = 2
    }
}

function iniciarBatalha(){
    document.querySelector(".equipe_pokemons").style.display = "none"
    document.getElementById("btnStartBattle").style.display = "none"
    document.querySelector(".searchPokemon").style.display = "none"
    document.querySelector(".batalha_pokemon").style.display = "flex"

    let seuPokemon = pokemonBatalha[0]
    let pokemonInimigo = pokemonBatalha[1]

    var musica = new Audio('./assets/music.mp3')
    musica.play()

    document.getElementById("inimigoImg").src = pokemonInimigo.sprites.front_default
    document.getElementById("seuImg").src = seuPokemon.sprites.back_default
    document.getElementById("inimigoVida").innerHTML = pokemonInimigo.name
    document.getElementById("seuVida").innerHTML = seuPokemon.name
    document.getElementById("inimigoBarra").value = `${pokemonInimigo.stats[0].base_stat}`
    document.getElementById("inimigoBarra").setAttribute("max", `${pokemonInimigo.stats[0].base_stat}`)
    document.getElementById("seuBarra").value = `${seuPokemon.stats[0].base_stat}`
    document.getElementById("seuBarra").setAttribute("max", `${seuPokemon.stats[0].base_stat}`)
    document.getElementById("seuVidaText").innerHTML = `${seuPokemon.stats[0].base_stat}/${seuPokemon.stats[0].base_stat}`
}

function abrirAtaques(){

    let atq = pokemonBatalha[0].stats[1].base_stat
    let def = pokemonBatalha[1].stats[2].base_stat

    let sAtq = pokemonBatalha[0].stats[3].base_stat

    let stab = pokemonBatalha[0].types[0] === pokemonBatalha[1].types[0] ? 1.5 : 1

    let bonus = setBonus()

    let dano = (((((1 * 2/5) + 2) * sAtq * atq/def)/50 + 2) * stab * bonus * 85/100)

    console.log(dano)
}

function setBonus(){
    let seuTipo = pokemonBatalha[0].types[0]
    let inimigoTipo = pokemonBatalha[1].types[0]

    //normal
    if(seuTipo === "normal"){
        if(inimigoTipo === "rock" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "ghost"){
            return 0
        } else{
            return 1
        }
    }

    //fire
    if(seuTipo === "fire"){
        if(inimigoTipo === "fire" || inimigoTipo === "water" || inimigoTipo === "rock" || inimigoTipo === "dragon"){
            return 1/2
        } else if(inimigoTipo === "grass" || inimigoTipo === "ice" || inimigoTipo === "bug" || inimigoTipo === "steel"){
            return 2
        } else{
            return 1
        }
    }

    //water
    if(seuTipo === "water"){
        if(inimigoTipo === "water" || inimigoTipo === "grass" || inimigoTipo === "dragon"){
            return 1/2
        } else if(inimigoTipo === "fire" || inimigoTipo === "ground" || inimigoTipo === "rock"){
            return 2
        } else{
            return 1
        }
    }

    //eletric
    if(seuTipo === "eletric"){
        if(inimigoTipo === "eletric" || inimigoTipo === "grass" || inimigoTipo === "dragon"){
            return 1/2
        } else if(inimigoTipo === "water" || inimigoTipo === "flying"){
            return 2
        } else if(inimigoTipo === "ground"){
            return 0
        } else{
            return 1
        }
    }

    //grass
    if(seuTipo === "grass"){
        if(inimigoTipo === "fire" || inimigoTipo === "grass" || inimigoTipo === "poison" || inimigoTipo === "flying" || inimigoTipo === "bug" || inimigoTipo === "dragon" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "water" || inimigoTipo === "ground" || inimigoTipo === "rock"){
            return 2
        } else{
            return 1
        }
    }

    //ice
    if(seuTipo === "ice"){
        if(inimigoTipo === "fire" || inimigoTipo === "water" || inimigoTipo === "ice" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "grass" || inimigoTipo === "ground" || inimigoTipo === "flying" || inimigoTipo === "dragon"){
            return 2
        } else{
            return 1
        }
    }

    //fighting
    if(seuTipo === "fighting"){
        if(inimigoTipo === "poison" || inimigoTipo === "flying" || inimigoTipo === "psychic" || inimigoTipo === "bug" || inimigoTipo === "fairy"){
            return 1/2
        } else if(inimigoTipo === "normal" || inimigoTipo === "ice" || inimigoTipo === "rock" || inimigoTipo === "dark" || inimigoTipo === "steel"){
            return 2
        } else if(inimigoTipo === "ghost"){
            return 0
        } else{
            return 1
        }
    }

    //poison
    if(seuTipo === "poison"){
        if(inimigoTipo === "poison" || inimigoTipo === "ground" || inimigoTipo === "rock" || inimigoTipo === "ghost"){
            return 1/2
        } else if(inimigoTipo === "grass" || inimigoTipo === "fire"){
            return 2
        } else if(inimigoTipo === "steel"){
            return 0
        } else{
            return 1
        }
    }

    //ground
    if(seuTipo === "ground"){
        if(inimigoTipo === "grass" || inimigoTipo === "bug"){
            return 1/2
        } else if(inimigoTipo === "fire" || inimigoTipo === "eletric" || inimigoTipo === "poison" || inimigoTipo === "rock" || inimigoTipo === "steel"){
            return 2
        } else if(inimigoTipo === "flying"){
            return 0
        } else{
            return 1
        }
    }

    //flying
    if(seuTipo === "flying"){
        if(inimigoTipo === "eletric" || inimigoTipo === "rock" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "grass" || inimigoTipo === "fighting" || inimigoTipo === "bug"){
            return 2
        } else{
            return 1
        }
    }

    //psychic
    if(seuTipo === "psychic"){
        if(inimigoTipo === "psychic" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "fighting" || inimigoTipo === "poison"){
            return 2
        } else if(inimigoTipo === "dark"){
            return 0
        } else{
            return 1
        }
    }

    //bug
    if(seuTipo === "bug"){
        if(inimigoTipo === "fire" || inimigoTipo === "fighting" || inimigoTipo === "poison" || inimigoTipo === "flying" || inimigoTipo === "ghost" || inimigoTipo === "steel" || inimigoTipo === "fairy"){
            return 1/2
        } else if(inimigoTipo === "grass" || inimigoTipo === "psychic" || inimigoTipo === "dark"){
            return 2
        } else{
            return 1
        }
    }

    //rock
    if(seuTipo === "rock"){
        if(inimigoTipo === "fighting" || inimigoTipo === "ground" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "fire" || inimigoTipo === "ice" || inimigoTipo === "flying" || inimigoTipo === "bug"){
            return 2
        } else{
            return 1
        }
    }

    //ghost
    if(seuTipo === "ghost"){
        if(inimigoTipo === "dark"){
            return 1/2
        } else if(inimigoTipo === "psychic" || inimigoTipo === "ghost"){
            return 2
        } else if(inimigoTipo === "normal"){
            return 0
        } else{
            return 1
        }
    }

    //dragon
    if(seuTipo === "dragon"){
        if(inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "dragon"){
            return 2
        } else if(inimigoTipo === "fairy"){
            return 0
        } else{
            return 1
        }
    }

    //dark
    if(seuTipo === "dark"){
        if(inimigoTipo === "fighting" || inimigoTipo === "dark" || inimigoTipo === "fairy"){
            return 1/2
        } else if(inimigoTipo === "psychic" || inimigoTipo === "ghost"){
            return 2
        } else{
            return 1
        }
    }

    //steel
    if(seuTipo === "steel"){
        if(inimigoTipo === "fire" || inimigoTipo === "water" || inimigoTipo === "eletric" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "bug" || inimigoTipo === "ice" || inimigoTipo === "fairy"){
            return 2
        } else{
            return 1
        }
    }

    //fairy
    if(seuTipo === "fire"){
        if(inimigoTipo === "fire" || inimigoTipo === "poison" || inimigoTipo === "steel"){
            return 1/2
        } else if(inimigoTipo === "fighting" || inimigoTipo === "dragon" || inimigoTipo === "dark"){
            return 2
        } else{
            return 1
        }
    }

}

function abrirMochila(){

}