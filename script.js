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

var seuTurno = true;

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
    seuTurno = true;

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

var tipoAtacante;
var tipoVitima;

function abrirAtaques(){

    var vida;
    if(seuTurno === true){
        vida = document.getElementById("inimigoBarra").value
        tipoAtacante = pokemonBatalha[0].types[0].type.name
        tipoVitima = pokemonBatalha[1].types[0].type.name
        seuTurno = false
    } else{
        vida = document.getElementById("seuBarra").value
        tipoAtacante = pokemonBatalha[1].types[0].type.name
        tipoVitima = pokemonBatalha[0].types[0].type.name
        seuTurno = true
    }

    let atq = pokemonBatalha[0].stats[1].base_stat
    let def = pokemonBatalha[1].stats[2].base_stat

    let sAtq = pokemonBatalha[0].stats[3].base_stat

    let stab = pokemonBatalha[0].types[0].type.name === pokemonBatalha[1].types[0].type.name ? 1.5 : 1

    let bonus = setBonus();

    let na = Math.floor(Math.random() * (100 - 85 + 1)) + 85

    console.log(na)

    let dano = (((((1 * 2/5) + 2) * sAtq * atq/def)/50 + 2) * stab * bonus * na/100)

    vida.value = vida - dano
}

function setBonus(){

    //normal
    if(tipoAtacante === "normal"){
        if(tipoVitima === "rock" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "ghost"){
            return 0
        } else{
            return 1
        }
    }

    //fire
    if(tipoAtacante === "fire"){
        if(tipoVitima === "fire" || tipoVitima === "water" || tipoVitima === "rock" || tipoVitima === "dragon"){
            return 1/2
        } else if(tipoVitima === "grass" || tipoVitima === "ice" || tipoVitima === "bug" || tipoVitima === "steel"){
            return 2
        } else{
            return 1
        }
    }

    //water
    if(tipoAtacante === "water"){
        if(tipoVitima === "water" || tipoVitima === "grass" || tipoVitima === "dragon"){
            return 1/2
        } else if(tipoVitima === "fire" || tipoVitima === "ground" || tipoVitima === "rock"){
            return 2
        } else{
            return 1
        }
    }

    //eletric
    if(tipoAtacante === "eletric"){
        if(tipoVitima === "eletric" || tipoVitima === "grass" || tipoVitima === "dragon"){
            return 1/2
        } else if(tipoVitima === "water" || tipoVitima === "flying"){
            return 2
        } else if(tipoVitima === "ground"){
            return 0
        } else{
            return 1
        }
    }

    //grass
    if(tipoAtacante === "grass"){
        if(tipoVitima === "fire" || tipoVitima === "grass" || tipoVitima === "poison" || tipoVitima === "flying" || tipoVitima === "bug" || tipoVitima === "dragon" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "water" || tipoVitima === "ground" || tipoVitima === "rock"){
            return 2
        } else{
            return 1
        }
    }

    //ice
    if(tipoAtacante === "ice"){
        if(tipoVitima === "fire" || tipoVitima === "water" || tipoVitima === "ice" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "grass" || tipoVitima === "ground" || tipoVitima === "flying" || tipoVitima === "dragon"){
            return 2
        } else{
            return 1
        }
    }

    //fighting
    if(tipoAtacante === "fighting"){
        if(tipoVitima === "poison" || tipoVitima === "flying" || tipoVitima === "psychic" || tipoVitima === "bug" || tipoVitima === "fairy"){
            return 1/2
        } else if(tipoVitima === "normal" || tipoVitima === "ice" || tipoVitima === "rock" || tipoVitima === "dark" || tipoVitima === "steel"){
            return 2
        } else if(tipoVitima === "ghost"){
            return 0
        } else{
            return 1
        }
    }

    //poison
    if(tipoAtacante === "poison"){
        if(tipoVitima === "poison" || tipoVitima === "ground" || tipoVitima === "rock" || tipoVitima === "ghost"){
            return 1/2
        } else if(tipoVitima === "grass" || tipoVitima === "fire"){
            return 2
        } else if(tipoVitima === "steel"){
            return 0
        } else{
            return 1
        }
    }

    //ground
    if(tipoAtacante === "ground"){
        if(tipoVitima === "grass" || tipoVitima === "bug"){
            return 1/2
        } else if(tipoVitima === "fire" || tipoVitima === "eletric" || tipoVitima === "poison" || tipoVitima === "rock" || tipoVitima === "steel"){
            return 2
        } else if(tipoVitima === "flying"){
            return 0
        } else{
            return 1
        }
    }

    //flying
    if(tipoAtacante === "flying"){
        if(tipoVitima === "eletric" || tipoVitima === "rock" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "grass" || tipoVitima === "fighting" || tipoVitima === "bug"){
            return 2
        } else{
            return 1
        }
    }

    //psychic
    if(tipoAtacante === "psychic"){
        if(tipoVitima === "psychic" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "fighting" || tipoVitima === "poison"){
            return 2
        } else if(tipoVitima === "dark"){
            return 0
        } else{
            return 1
        }
    }

    //bug
    if(tipoAtacante === "bug"){
        if(tipoVitima === "fire" || tipoVitima === "fighting" || tipoVitima === "poison" || tipoVitima === "flying" || tipoVitima === "ghost" || tipoVitima === "steel" || tipoVitima === "fairy"){
            return 1/2
        } else if(tipoVitima === "grass" || tipoVitima === "psychic" || tipoVitima === "dark"){
            return 2
        } else{
            return 1
        }
    }

    //rock
    if(tipoAtacante === "rock"){
        if(tipoVitima === "fighting" || tipoVitima === "ground" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "fire" || tipoVitima === "ice" || tipoVitima === "flying" || tipoVitima === "bug"){
            return 2
        } else{
            return 1
        }
    }

    //ghost
    if(tipoAtacante === "ghost"){
        if(tipoVitima === "dark"){
            return 1/2
        } else if(tipoVitima === "psychic" || tipoVitima === "ghost"){
            return 2
        } else if(tipoVitima === "normal"){
            return 0
        } else{
            return 1
        }
    }

    //dragon
    if(tipoAtacante === "dragon"){
        if(tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "dragon"){
            return 2
        } else if(tipoVitima === "fairy"){
            return 0
        } else{
            return 1
        }
    }

    //dark
    if(tipoAtacante === "dark"){
        if(tipoVitima === "fighting" || tipoVitima === "dark" || tipoVitima === "fairy"){
            return 1/2
        } else if(tipoVitima === "psychic" || tipoVitima === "ghost"){
            return 2
        } else{
            return 1
        }
    }

    //steel
    if(tipoAtacante === "steel"){
        if(tipoVitima === "fire" || tipoVitima === "water" || tipoVitima === "eletric" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "bug" || tipoVitima === "ice" || tipoVitima === "fairy"){
            return 2
        } else{
            return 1
        }
    }

    //fairy
    if(tipoAtacante === "fire"){
        if(tipoVitima === "fire" || tipoVitima === "poison" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "fighting" || tipoVitima === "dragon" || tipoVitima === "dark"){
            return 2
        } else{
            return 1
        }
    }

}

function abrirMochila(){

}