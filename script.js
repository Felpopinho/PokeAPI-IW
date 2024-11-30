const iSearch = document.getElementById("inputSearch")
const idPokemon = document.getElementById("idPokemon")
const nomePokemon = document.getElementById("nomePokemon")
const tipoPokemon = document.getElementById("tipoPokemon")
const imgPokemon = document.getElementById("imgPokemon")
const altPokemon = document.getElementById("altPokemon")
const pesoPokemon = document.getElementById("pesoPokemon")

const inputEquipeSearch = document.getElementById("inputSearchEquipe")
const inputLigaSearch = document.getElementById("inputSearchLiga")
const pokemonUm = document.getElementById("pokemonUm")
const pokemonDois = document.getElementById("pokemonDois")

var pokemonAtualCont = 1

var pokemonUmSelecionado = false;
var pokemonDoisSelecionado = false;

const pokemonBatalha = ["", ""];

var seuTurno = true;

var atackSound = new Audio("./assets/JumpKick.wav")
var erroSound = new Audio("./assets/Cut.wav")
var potionSound = new Audio("./assets/potionSound.mp3")
var batalhaMusic1 = new Audio("./assets/batalha1.mp3")
var batalhaMusic2 = new Audio("./assets/batalha2.mp3")
var batalhaMusic3 = new Audio("./assets/batalha3.mp3")
var batalhaMusic4 = new Audio("./assets/batalha4.mp3")
var vitoriaMusic1 = new Audio("./assets/vitoriaMusic1.mp3")
var vitoriaMusic2 = new Audio("./assets/vitoriaMusic2.mp3")
var vitoriaMusic3 = new Audio("./assets/vitoriaMusic3.mp3")
var vitoriaMusic4 = new Audio("./assets/vitoriaMusic4.mp3")
var derrotaMusic = new Audio("./assets/derrotaMusic.mp3")
derrotaMusic.loop = true
batalhaMusic4.loop = true
vitoriaMusic4.loop = true

const batalhaMusicArr = [batalhaMusic1, batalhaMusic2, batalhaMusic3]
batalhaMusicArr.forEach(audio => {
    audio.loop = true
})
const vitoriaMusicArr = [vitoriaMusic1, vitoriaMusic2, vitoriaMusic3]
vitoriaMusicArr.forEach(audio => {
    audio.loop = true
})

const pokemonLorelei = []
const pokemonBruno = []
const pokemonAgatha = []
const pokemonLance = []

const lorelei = {
    nome: "Lorelei",
    img: "./assets/lorelei.png"
}
const bruno = {
    nome: "Bruno",
    img: "./assets/bruno.png"
}
const agatha = {
    nome: "Agatha",
    img: "./assets/agatha.png"
}
const lance = {
    nome: "Lance",
    img: "./assets/lance.png"
}

const eliteData = [lorelei, bruno, agatha, lance]
const elitePokemons = [pokemonLorelei,pokemonBruno,pokemonAgatha,pokemonLance]

async function setElitePokemons(pokemon){
    if(pokemon.name === "jynx" || pokemon.name === "lapras"){
        pokemonLorelei.push(pokemon)
    } else if(pokemon.name === "onix" || pokemon.name === "machamp"){
        pokemonBruno.push(pokemon)
    } else if(pokemon.name === "arbok" || pokemon.name === "gengar"){
        pokemonAgatha.push(pokemon)
    } else{
        pokemonLance.push(pokemon)
    }
}

async function searchPokemon(section, s, n){
    if(s===0){
        var input = iSearch.value
    }else if(s===1){
        var input = inputEquipeSearch.value
    }else if (s===2){
        var input = inputLigaSearch.value
    }else{
        var input = n
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
        } else if(section === 2){
            adicionarPokemon(pokemon, s)
        } else{
            setElitePokemons(pokemon)
        }
    } catch (error) {
        console.log(error.message);
    }
    if(parseInt(idPokemon.innerText) <= 1){
        document.getElementById("antPokemon").setAttribute("disabled",  "")
        document.getElementById("proxPokemon").removeAttribute("disabled")
    } else if(parseInt(idPokemon.innerText) >= 1025){
        document.getElementById("antPokemon").removeAttribute("disabled")
        document.getElementById("proxPokemon").setAttribute("disabled",  "")
    } else{
        document.getElementById("antPokemon").removeAttribute("disabled")
        document.getElementById("proxPokemon").removeAttribute("disabled")
    }
}

searchPokemon("", "", "Jynx")
searchPokemon("", "", "Lapras")
searchPokemon("", "", "Onix")
searchPokemon("", "", "Machamp")
searchPokemon("", "", "Arbok")
searchPokemon("", "", "Gengar")
searchPokemon("", "", "Dragonite")
searchPokemon("", "", "Gyarados")

function visualizarPokemon(data){
    idPokemon.innerText = `${data.id}`
    nomePokemon.innerText = `${data.name}`
    imgPokemon.src = `${data.sprites.other.showdown.front_default}`
    tipoPokemon.innerText = `${data.types.map(type => type.type.name).join(', ')}`
    altPokemon.innerText = `${data.height / 10}`
    pesoPokemon.innerText = `${data.weight / 10}`
}

async function changePokemon(n){
    var url;
    if (n===1){
        url = `https://pokeapi.co/api/v2/pokemon/${parseInt(idPokemon.innerText)-1}`;
    } else{
        url = `https://pokeapi.co/api/v2/pokemon/${parseInt(idPokemon.innerText)+1}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        console.log(pokemon);
        visualizarPokemon(pokemon);
    } catch (error) {
        console.log(error.message);
    }
    if(parseInt(idPokemon.innerText) <= 1){
        document.getElementById("antPokemon").setAttribute("disabled",  "")
        document.getElementById("proxPokemon").removeAttribute("disabled")
    } else if(parseInt(idPokemon.innerText) >= 1025){
        document.getElementById("antPokemon").removeAttribute("disabled")
        document.getElementById("proxPokemon").setAttribute("disabled",  "")
    } else{
        document.getElementById("antPokemon").removeAttribute("disabled")
        document.getElementById("proxPokemon").removeAttribute("disabled")
    }
}

function adicionarPokemon(pokemon, n){

    document.getElementById(`move1-${pokemonAtualCont}-${n}`).innerHTML = "<option></option>"
    document.getElementById(`move2-${pokemonAtualCont}-${n}`).innerHTML = "<option></option>"

    pokemonBatalha[pokemonAtualCont-1] = pokemon

    if(pokemonAtualCont === 1 || pokemonAtualCont === "1" ){
        pokemonUmSelecionado = true
    } else{
        pokemonDoisSelecionado = true
    }

    const inicialContainer = document.getElementById(`inicial${pokemonAtualCont}-${n}`)
    inicialContainer.style.display = "none"

    const containers = document.querySelectorAll(`.contIEquipe${pokemonAtualCont}-${n}`)
    containers.forEach(e =>{
        e.classList.remove(`contIEquipe${pokemonAtualCont}-${n}`)
        e.classList.add(`contSEquipe${pokemonAtualCont}-${n}`)
    })
    

    const habCont = document.getElementById(`habilidades${pokemonAtualCont}-${n}`)
    while (habCont.firstChild) {
        habCont.removeChild(habCont.firstChild);
    }

    setBackground(pokemon, document.querySelector(`.equipe${pokemonAtualCont}-${n}`), "");

    const id = document.getElementById(`id${pokemonAtualCont}-${n}`)
    const nome = document.getElementById(`nome${pokemonAtualCont}-${n}`)
    const tipo = document.getElementById(`tipo${pokemonAtualCont}-${n}`)
    const img = document.getElementById(`img${pokemonAtualCont}-${n}`)
    const hp = document.getElementById(`hp${pokemonAtualCont}-${n}`)
    const vida = document.getElementById(`vida${pokemonAtualCont}-${n}`)
    const atk = document.getElementById(`atk${pokemonAtualCont}-${n}`)
    const def = document.getElementById(`def${pokemonAtualCont}-${n}`)
    const satk = document.getElementById(`satk${pokemonAtualCont}-${n}`)
    const sdef = document.getElementById(`sdef${pokemonAtualCont}-${n}`)
    const spd = document.getElementById(`spd${pokemonAtualCont}-${n}`)
    id.innerText = `${pokemon.id}`
    nome.innerText = `${pokemon.name}`
    tipo.innerText = `${pokemon.types.map(type => type.type.name).join(', ')}`
    img.src = pokemon.sprites.other.showdown.front_default === "null" ? pokemon.sprites.front_default : pokemon.sprites.other.showdown.front_default
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
        document.getElementById(`habilidades${pokemonAtualCont}-${n}`).appendChild(tHab)
    })

    pokemon.moves.map(async move =>{
        let move1 = document.createElement("option")
        let move2 = document.createElement("option")

        const urlMove = "https://pokeapi.co/api/v2/move//"

        try {
            const res = await fetch(urlMove+move.move.name)
            if (!res.ok) {
                throw new Error('Move not found');
            }
            var movimento = await res.json();
        } catch (error) {
            alert(error)
        }
        if (movimento.power != null){
            move1.innerHTML = `${move.move.name}`
            move2.innerHTML = `${move.move.name}`
            document.getElementById(`move1-${pokemonAtualCont}-${n}`).appendChild(move1)
            document.getElementById(`move2-${pokemonAtualCont}-${n}`).appendChild(move2)
        }
        if (pokemonUmSelecionado === true && pokemonDoisSelecionado === true){
            document.getElementById(`btnStart${n}`).style.display = "flex"
        } else{
            document.getElementById(`btnStart${n}`).style.display = "none"
        }
    })
}

function setBackground(pokemon, element, attack){
    var e;
    if(attack === ""){
        e = pokemon.types[0].type.name
    } else{
        e = attack
    }
    if(e === "normal"){
        element.style.backgroundColor = "gray"
    } else if (e === "fire"){
        element.style.backgroundColor = "rgb(185, 105, 0)"
    }else if (e === "water"){
        element.style.backgroundColor = "rgb(0, 97, 187)"
    }else if (e === "electric"){
        element.style.backgroundColor = "rgb(207, 176, 0)"
    }else if (e === "grass"){
        element.style.backgroundColor = "green"
    }else if (e === "fighting"){
        element.style.backgroundColor = "darkred"
    }else if (e === "poison"){
        element.style.backgroundColor = "purple"
    }else if (e === "ground"){
        element.style.backgroundColor = "rgb(109, 82, 47)"
    }else if (e === "flying"){
        element.style.backgroundColor = "rgb(199, 199, 199)"
    }else if (e === "psychic"){
        element.style.backgroundColor = "rgb(160, 74, 182)"
    }else if (e === "bug"){
        element.style.backgroundColor = "rgb(129, 189, 95)"
    }else if (e === "rock"){
        element.style.backgroundColor = "rgb(72, 88, 0)"
    }else if (e === "ghost"){
        element.style.backgroundColor = "rgb(61, 39, 104)"
    }else if (e === "dragon"){
        element.style.backgroundColor = "blue"
    }else if (e === "steel"){
        element.style.backgroundColor = "rgb(59, 59, 59)"
    }else if (e === "fairy"){
        element.style.backgroundColor = "pink"
    } else{
        return
    }
}

function changeSection(n){
    if(n === 1){
        document.querySelector(".batalha_section").style.display = "none"
        document.querySelector(".liga_section").style.display = "none"
        document.querySelector(".pokedex_section").style.display = "flex"
        pokemonAtualCont = 1
    } else if (n===2){
        document.querySelector(".pokedex_section").style.display = "none"
        document.querySelector(".liga_section").style.display = "none"
        document.querySelector(".batalha_section").style.display = "flex"
        pokemonAtualCont = 1
    } else{
        document.querySelector(".pokedex_section").style.display = "none"
        document.querySelector(".batalha_section").style.display = "none"
        document.querySelector(".liga_section").style.display = "flex"
        pokemonAtualCont = 1
    }
}

function selectPokemonContainer(n){
    if(n === 1){
        pokemonAtualCont = 1
    }else{
        pokemonAtualCont = 2
    }
}

var musicBatalhaRandon;
var suasPocoes;
var inimigoPocoes;
var suasAttack;
var inimigoAttack;
var suasSpeed;
var inimigoSpeed;
var suasDefend;
var inimigoDefend;
var accuracySeu;
var evasionSeu;
var accuracyInimigo;
var evasionInimigo;
var atqSeu;
var atqInimigo;
var moveSeu;
var moveInimigo;
var ppSeu = [];
var ppInimigo = [];
var movesInimigo = [];
var eliteP;
var seuP;
var pokemonsInimigo;
var seusPokemon;
var eliteN;

async function iniciarLiga(p,n,sp,v){
    pokemonsInimigo = [elitePokemons[n][0], elitePokemons[n][1]]
    seusPokemon = [pokemonBatalha[0],pokemonBatalha[1]]
    var moveInimigoUm = []
    var moveInimigoDois = []
    movesInimigo = [moveInimigoUm, moveInimigoDois]
    eliteP = p
    seuP = sp
    eliteN = n
    console.log(pokemonsInimigo)
    console.log(movesInimigo)

    if(v === 1){
        if(eliteN === 0 && eliteP === 0){
            document.getElementById("seuTurno-2").style.display = "flex"
        } else{
            document.getElementById("descAcao-2").style.display = "flex"
        }
    } else if(v===2){
        if(seuP === 0){
            document.getElementById("seuTurno-2").style.display = "flex"
        } else{
            document.getElementById("descAcao-2").style.display = "flex"
        }
    } else{
        if(eliteN === 0 && eliteP === 0){
            document.getElementById("seuTurno-2").style.display = "flex"
        } else{
            document.getElementById("descAcao-2").style.display = "flex"
        }
    }

    const url = "https://pokeapi.co/api/v2/move//"

    batalhaMusic4.play()

    try {
        const res1 = await fetch(url+(n+1===1?"psychic":n+1===2?"rock-slide":n+1===3?"poison-jab":"draco-meteor"))
        if (!res1.ok) {
            throw new Error('Move not found');
        }
        moveInimigoUm[0] = await res1.json();
        const res2 = await fetch(url+(n+1===1?"ice-beam":n+1===2?"head-smash":n+1===3?"sludge-bomb":"dragon-breath"))
        if (!res2.ok) {
            throw new Error('Move not found');
        }
        moveInimigoUm[1] = await res2.json();
        const res3 = await fetch(url+(n+1===1?"water-pulse":n+1===2?"focus-punch":n+1===3?"shadow-ball":"dragon-pulse"))
        if (!res1.ok) {
            throw new Error('Move not found');
        }
        moveInimigoDois[0] = await res3.json();
        const res4 = await fetch(url+(n+1===1?"thunderbolt":n+1===2?"giga-impact":n+1===3?"shadow-claw":"hyper-beam"))
        if (!res2.ok) {
            throw new Error('Move not found');
        }
        moveInimigoDois[1] = await res4.json();

        ppSeu = [moveSeu[0].pp, moveSeu[1].pp]
        ppInimigo = [movesInimigo[p][0].pp, movesInimigo[p][1].pp]
    } catch (error) {
        alert(error)
    }

    document.getElementById("trainerInimigo-2").src = eliteData[n].img
    document.getElementById(`inimigoImg-2`).src = pokemonsInimigo[p].sprites.other.showdown.front_default
    document.getElementById(`seuImg-2`).src = seusPokemon[seuP].sprites.other.showdown.back_default
    document.getElementById(`inimigoVida-2`).innerHTML = pokemonsInimigo[p].name
    document.getElementById(`inimigoTipo-2`).innerHTML = pokemonsInimigo[p].types[0].type.name
    document.getElementById(`seuVida-2`).innerHTML = seusPokemon[seuP].name
    document.getElementById(`seuTipo-2`).innerHTML = seusPokemon[seuP].types[0].type.name
    document.getElementById(`inimigoBarra-2`).value = `${v === 2 ? document.getElementById(`inimigoBarra-2`).value : pokemonsInimigo[p].stats[0].base_stat}`
    document.getElementById(`inimigoBarra-2`).setAttribute(`max`, `${pokemonsInimigo[p].stats[0].base_stat}`)
    document.getElementById(`seuBarra-2`).value = `${v === 1 ? document.getElementById(`seuBarra-2`).value : seusPokemon[seuP].stats[0].base_stat}`
    document.getElementById(`seuBarra-2`).setAttribute(`max`, `${seusPokemon[seuP].stats[0].base_stat}`)
    document.getElementById(`seuVidaText-2`).innerHTML = `${v === 1 ? document.getElementById(`seuBarra-2`).value : seusPokemon[seuP].stats[0].base_stat}/${seusPokemon[seuP].stats[0].base_stat}`
    document.getElementById(`nomeMove1-2`).innerHTML  = `${moveSeu[0].name}`
    document.getElementById(`nomeMove2-2`).innerHTML  = `${moveSeu[1].name}`
    document.getElementById(`tipoMove1-2`).innerHTML  = `${moveSeu[0].type.name}`
    document.getElementById(`tipoMove2-2`).innerHTML  = `${moveSeu[1].type.name}`
    document.getElementById(`ppMove1-2`).innerHTML  = `${moveSeu[0].pp}/${moveSeu[0].pp}`
    document.getElementById(`ppMove2-2`).innerHTML  = `${moveSeu[1].pp}/${moveSeu[1].pp}`
}

async function iniciarBatalha(n, p, e, sp){

    seuTurno = true;
    suasPocoes = 2;
    suasSpeed = 2;
    suasAttack = 2;
    suasDefend = 2
    inimigoPocoes = 2;
    inimigoSpeed = 2;
    inimigoAttack = 2;
    inimigoDefend = 2
    evasionSeu = 1;
    evasionInimigo = 1;
    moveSeu = [document.getElementById(`move1-1-${n}`).value , document.getElementById(`move2-1-${n}`).value];
    moveInimigo  = [document.getElementById(`move1-2-${n}`).value, document.getElementById(`move2-2-${n}`).value];
    atqSeu = pokemonBatalha[0].stats[1].base_stat;
    atqInimigo = pokemonBatalha[1].stats[1].base_stat;

    const url = "https://pokeapi.co/api/v2/move//"

    try {
        const res1 = await fetch(url+moveSeu[0])
        if (!res1.ok) {
            throw new Error('Move not found');
        }
        moveSeu[0] = await res1.json();
        const res2 = await fetch(url+moveSeu[1])
        if (!res2.ok) {
            throw new Error('Move not found');
        }
        moveSeu[1] = await res2.json();
        const res3 = await fetch(url+moveInimigo[0])
        if (!res1.ok) {
            throw new Error('Move not found');
        }
        moveInimigo[0] = await res3.json();
        const res4 = await fetch(url+moveInimigo[1])
        if (!res2.ok) {
            throw new Error('Move not found');
        }
        moveInimigo[1] = await res4.json();

        ppSeu = [moveSeu[0].pp, moveSeu[1].pp]
        ppInimigo = [moveInimigo[0].pp, moveInimigo[1].pp]
    } catch (error) {
        alert(error)
    }
    setBackground("", document.getElementById(`tipoMove1-${n}`), moveSeu[0].type.name)
    setBackground("", document.getElementById(`tipoMove2-${n}`), moveSeu[1].type.name)
    console.log(moveSeu);
    console.log(moveInimigo);
    

    document.querySelectorAll(".batalha").forEach(e =>{
        e.style.display = "flex"
    })

    document.getElementById(`btnFinalizar-${n}`).style.display = "none"
    document.getElementById(`descAcao-${n}`).style.display = "none"
    n === 2 ? document.getElementById(`seuTurno-${n}`).style.display = "none" : document.getElementById(`seuTurno-${n}`).style.display = "flex"

    document.getElementById(`equipePokemon-${n}`).style.display = "none"
    document.getElementById(`btnStart${n}`).style.display = "none"
    document.getElementById(`searchPokemon-${n}`).style.display = "none"
    document.getElementById(`batalhaPokemon-${n}`).style.display = "flex"

    if(n===2){
        document.querySelector(".oponenteEquipe").style.display = "none"
        return iniciarLiga(p, e, sp, '')
    } else{
        var seuPokemon = pokemonBatalha[0]
        var pokemonInimigo = pokemonBatalha[1]

        musicBatalhaRandon = Math.floor(Math.random()*(2.9 - 0)+0)
        batalhaMusicArr[musicBatalhaRandon].currentTime = 0
        batalhaMusicArr[musicBatalhaRandon].play()

        document.getElementById(`inimigoImg-${n}`).src = pokemonInimigo.sprites.other.showdown.front_default
        document.getElementById(`seuImg-${n}`).src = seuPokemon.sprites.other.showdown.back_default
        document.getElementById(`inimigoVida-${n}`).innerHTML = pokemonInimigo.name
        document.getElementById(`inimigoTipo-${n}`).innerHTML = pokemonInimigo.types[0].type.name
        document.getElementById(`seuVida-${n}`).innerHTML = seuPokemon.name
        document.getElementById(`seuTipo-${n}`).innerHTML = seuPokemon.types[0].type.name
        document.getElementById(`inimigoBarra-${n}`).value = `${pokemonInimigo.stats[0].base_stat}`
        document.getElementById(`inimigoBarra-${n}`).setAttribute(`max`, `${pokemonInimigo.stats[0].base_stat}`)
        document.getElementById(`seuBarra-${n}`).value = `${seuPokemon.stats[0].base_stat}`
        document.getElementById(`seuBarra-${n}`).setAttribute(`max`, `${seuPokemon.stats[0].base_stat}`)
        document.getElementById(`seuVidaText-${n}`).innerHTML = `${seuPokemon.stats[0].base_stat}/${seuPokemon.stats[0].base_stat}`
        document.getElementById(`nomeMove1-${n}`).innerHTML  = `${moveSeu[0].name}`
        document.getElementById(`nomeMove2-${n}`).innerHTML  = `${moveSeu[1].name}`
        document.getElementById(`tipoMove1-${n}`).innerHTML  = `${moveSeu[0].type.name}`
        document.getElementById(`tipoMove2-${n}`).innerHTML  = `${moveSeu[1].type.name}`
        document.getElementById(`ppMove1-${n}`).innerHTML  = `${moveSeu[0].pp}/${moveSeu[0].pp}`
        document.getElementById(`ppMove2-${n}`).innerHTML  = `${moveSeu[1].pp}/${moveSeu[1].pp}`
    }
}

var tipoAtacante;
var tipoVitima;
var def;
var sAtq;

function movimentos(n, s){
    console.log("a")
    if(n === 1){
        document.getElementById(`seuTurno-${s}`).style.display = "none"
        document.getElementById(`descAcao-${s}`).style.display = "none"
        document.getElementById(`movesContainer-${s}`).style.display = "flex"
    } else{
        document.getElementById(`descAcao-${s}`).style.display = "none"
        document.getElementById(`movesContainer-${s}`).style.display = "none"
        document.getElementById(`seuTurno-${s}`).style.display = "flex"
    }
}

function atacar(n, s){
    const desc = document.getElementById(`descricao-${s}`)
    document.getElementById(`seuTurno-${s}`).style.display = "none"
    document.getElementById(`movesContainer-${s}`).style.display = "none"
    document.getElementById(`descAcao-${s}`).style.display = "flex"

    var vida;
    if(seuTurno === true){
        vida = `inimigoBarra-${s}`;
        tipoAtacante = moveSeu[n].type.name;
        tipoVitima = (s === 2 ? pokemonsInimigo[eliteP].types[0].type.name : pokemonBatalha[1].types[0].type.name)
        def =  (s === 2 ? pokemonsInimigo[eliteP].stats[2].base_stat : pokemonBatalha[1].stats[2].base_stat);
        sAtq = (s === 2 ? pokemonBatalha[seuP].stats[3].base_stat : pokemonBatalha[0].stats[3].base_stat)
        ppSeu[n] = ppSeu[n] - 1
        console.log(ppSeu)
        document.getElementById(`ppMove${n+1}-${s}`).innerHTML  = `${ppSeu[n]}/${moveSeu[n].pp}`
        desc.innerHTML = `Você usa ${moveSeu[n].name} com ${pokemonBatalha[0].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        });
        seuTurno = false
    } else{
        vida = `seuBarra-${s}`;
        tipoAtacante = (s === 2 ? movesInimigo[eliteP][n].type.name : moveInimigo[n].type.name);
        tipoVitima = (s === 2 ? pokemonBatalha[seuP].types[0].type.name : pokemonBatalha[0].types[0].type.name);
        def = (s === 2 ? pokemonBatalha[seuP].stats[2].base_stat : pokemonBatalha[0].stats[2].base_stat);
        sAtq = (s === 2 ? pokemonsInimigo[eliteP].stats[3].base_stat : pokemonBatalha[1].stats[3].base_stat);
        ppInimigo[n] = ppInimigo[n] - 1
        seuTurno = true
    }

    let acerta = acertarAtaque(n)

    setTimeout(() => {
        if (acerta===false){
            desc.innerHTML = `${seuTurno == false ? (s === 2 ? pokemonBatalha[seuP].name : pokemonBatalha[0].name) : (s === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name)} erra o ataque`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = '';
            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            });

            erroSound.play()
            seuTurno === false ? document.getElementById(`pokemonInimigo-${s}`).style.right= "80px" : document.getElementById(`seuPokemon-${s}`).style.left= "100px"
            seuTurno === false ? document.getElementById(`gifatkInimigo-${s}`).style.left= "80px" : document.getElementById(`gifatkSeu-${s}`).style.right= "100px"
            seuTurno === false ? document.getElementById(`trainerInimigo-${s}`).style.left= "80px" : document.getElementById(`trainerSeu-${s}`).style.right= "100px"
            document.getElementById(`${seuTurno == false ? 'gifatkInimigo-'+s : 'gifatkSeu-'+s}`).style.display = "block"
            setTimeout(()=>{
                document.getElementById(`${seuTurno == false ? 'gifatkInimigo-'+s : 'gifatkSeu-'+s}`).style.display = "none"
                seuTurno === false ? document.getElementById(`gifatkInimigo-${s}`).style.left= "0px" : document.getElementById(`gifatkSeu-${s}`).style.right= "0px"
            }, "1000")
            
            setTimeout(() => {
                if (seuTurno === false){
                    document.getElementById(`pokemonInimigo-${s}`).style.right= "0px"
                    document.getElementById(`trainerInimigo-${s}`).style.left= "0px"
                    return turnoOponente(s)
                } else{
                    document.getElementById(`seuPokemon-${s}`).style.left= "0px"
                    document.getElementById(`trainerSeu-${s}`).style.right= "0px"
                    document.getElementById(`descAcao-${s}`).style.display = "none"
                    document.getElementById(`seuTurno-${s}`).style.display = "flex"
                }
            }, "4000")
            
        } else{
            let bonus = setBonus();
            let stab = (moveSeu[n].type.name === (s === 2 ? pokemonsInimigo[eliteP].types[0].type.name : pokemonBatalha[1].types[0].type.name) ? 1.5 : 1)
            let na = Math.floor(Math.random() * (100 - 85 + 1)) + 85
            let atkPower = moveSeu[n].power
            let dano = ((((2*1/5+2) * atqSeu * atkPower/def)/50 + 2) * stab * bonus * na/100)
            desc.innerHTML = `${seuTurno === false ? (s === 2 ? pokemonBatalha[seuP].name : pokemonBatalha[0].name) : (s === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name)} acerta um ataque ${bonus === 1/2 ? "pouco efetivo" : bonus === 2 ? "super efetivo" : bonus === 0 ? "sem efeito" : ""}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';
            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            });

            console.log(bonus)

            atackSound.play()
            document.getElementById(`${seuTurno == false ? `gifatkInimigo-${s}` : `gifatkSeu-${s}`}`).style.display = "block"
            setTimeout(()=>{
                document.getElementById(`${seuTurno == false ? `gifatkInimigo-${s}` : `gifatkSeu-${s}`}`).style.display = "none"
            }, "1000")
            
            setTimeout(()=>{
                if(vida === `inimigoBarra-${s}`){
                    document.getElementById(vida).value = parseInt(document.getElementById(vida).value - dano);
                } else{
                    document.getElementById(vida).value = parseInt(document.getElementById(vida).value - dano);
                    document.getElementById(`seuVidaText-${s}`).innerHTML = `${document.getElementById(vida).value}/${s===2?pokemonBatalha[seuP].stats[0].base_stat:pokemonBatalha[0].stats[0].base_stat}`
                }

                if (document.getElementById(`seuBarra-${s}`).value <= 0 || document.getElementById(`inimigoBarra-${s}`).value <= 0){
                    if (seuTurno === false){
                        return (s === 2 ? desmaiouPokemon(pokemonBatalha[seuP]) : (fimBatalha(pokemonBatalha[0]), s))
                    } else{
                        return (s === 2 ? desmaiouPokemon(pokemonsInimigo[eliteP]) : (fimBatalha(pokemonBatalha[1]), s))
                    }
                } else{
                    if (seuTurno === false){
                        turnoOponente(s)
                    } else{
                        document.getElementById(`descAcao-${s}`).style.display = "none"
                        document.getElementById(`seuTurno-${s}`).style.display = "flex"
                    }
                }
            }, "4000")
        }
    }, "3000")

}

function turnoOponente(s){
    const desc = document.getElementById(`descricao-${s}`)
    document.getElementById(`seuTurno-${s}`).style.display = "none"
    document.getElementById(`descAcao-${s}`).style.display = "flex"

    var nAleatorio = Math.floor(Math.random()*100)
    var nMove;
    if(nAleatorio > 45){nMove = 1}else{nMove = 0}

    if(document.getElementById(`inimigoBarra-${s}`).value <= (s === 2 ? pokemonsInimigo[eliteP].stats[0].base_stat/3 : pokemonBatalha[1].stats[0].base_stat/3)){
        usarPocao(nMove, s)
    } else if(nAleatorio >= 70){
        usarItem(nMove, s)
    }else{
        desc.innerHTML = `O inimigo usa ${s === 2 ? movesInimigo[eliteP][nMove].name : moveInimigo[nMove].name} com ${s === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
        setTimeout(()=>{
            atacar(nMove, s)
        }, "2000")
    }
}

function acertarAtaque(n){
    var accuracy;
    var evasion;

    if(seuTurno===false){
        accuracy = moveSeu[n].accuracy
        evasion = parseInt(evasionInimigo)
    } else{
        accuracy = moveInimigo[n].accuracy
        evasion = parseInt(evasionSeu)
    }

    let chanceAcerto = accuracy * (1/1)

    let randonNumber = Math.floor(Math.random()*100)

    if(chanceAcerto < randonNumber){
        return false
    } else{
        return true
    }
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
    if(tipoAtacante === "electric"){
        if(tipoVitima === "electric" || tipoVitima === "grass" || tipoVitima === "dragon"){
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
        } else if(tipoVitima === "fire" || tipoVitima === "electric" || tipoVitima === "poison" || tipoVitima === "rock" || tipoVitima === "steel"){
            return 2
        } else if(tipoVitima === "flying"){
            return 0
        } else{
            return 1
        }
    }

    //flying
    if(tipoAtacante === "flying"){
        if(tipoVitima === "electric" || tipoVitima === "rock" || tipoVitima === "steel"){
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
        if(tipoVitima === "fire" || tipoVitima === "water" || tipoVitima === "electric" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "bug" || tipoVitima === "ice" || tipoVitima === "fairy"){
            return 2
        } else{
            return 1
        }
    }

    //fairy
    if(tipoAtacante === "fairy"){
        if(tipoVitima === "fire" || tipoVitima === "poison" || tipoVitima === "steel"){
            return 1/2
        } else if(tipoVitima === "fighting" || tipoVitima === "dragon" || tipoVitima === "dark"){
            return 2
        } else{
            return 1
        }
    }

}

function mochila(n, s){
    if(n === 1){
        document.getElementById(`seuTurno-${s}`).style.display = "none"
        document.getElementById(`descAcao-${s}`).style.display = "none"
        document.getElementById(`mochilaContainer-${s}`).style.display = "grid"
    } else{
        document.getElementById(`descAcao-${s}`).style.display = "none"
        document.getElementById(`mochilaContainer-${s}`).style.display = "none"
        document.getElementById(`seuTurno-${s}`).style.display = "flex"
    }
}

function usarItem(n, s){
    const desc = document.getElementById(`descricao-${s}`)
    document.getElementById(`seuTurno-${s}`).style.display = "none"
    document.getElementById(`mochilaContainer-${s}`).style.display = "none"
    document.getElementById(`descAcao-${s}`).style.display = "flex"

    var item;

    if(seuTurno === true){
        if(n === 1){
            if(suasSpeed <= 0){
                return semItem("X Speed", s)
            } else{
                suasSpeed = suasSpeed - 1
                item = ["X Speed", `quantSpeed-${s}`, suasSpeed]
                accuracySeu = accuracySeu + 10
            }
        } else if (n===2){
            if(suasAttack <= 0){
                return semItem("X Attack", s)
            } else{
                suasAttack = suasAttack - 1
                item = ["X Attack", `quantAttack-${s}`, suasAttack]
                atqSeu = atqSeu + 10 
            }
        } else{
            if(suasDefend <= 0){
                return semItem("X Defend", s)
            } else{
                suasDefend = suasDefend - 1
                item = ["X Defend", `quantDefend-${s}`, suasDefend]
                evasionSeu = evasionSeu + 10
            }
        }

        document.getElementById(`${item[1]}`).innerHTML = `${item[2]}x`
        desc.innerHTML = `Você usou um ${item[0]} em ${s === 2 ? pokemonBatalha[seuP].name : pokemonBatalha[0].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';
        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
        document.getElementById(`trainerSeu-${s}`).style.transform="scale(5) translate(0px, 0px)";
        potionSound.play()
        setTimeout(()=>{
            document.getElementById(`trainerSeu-${s}`).style.transform="scale(5) translate(-50px, 0px)";
        }, "1000")
        setTimeout(()=>{
            seuTurno = false;
            return turnoOponente(s)
        },"4500")
        
    } else{
        var nAleatorio = Math.floor(Math.random()*99)
        if(nAleatorio <= 33){
            if(inimigoSpeed <= 0){
                return semItem(n, s)
            } else{
                inimigoSpeed = inimigoSpeed - 1
                item = ["X Speed", `quantSpeed-${s}`, suasSpeed]
                accuracyInimigo = accuracyInimigo + 10
            }
        } else if(nAleatorio >= 66){
            if(inimigoAttack <= 0){
                return semItem(n, s)
            } else{
                inimigoAttack = inimigoAttack - 1
                item = ["X Attack", `quantAttack-${s}`, suasAttack]
                atqInimigo = atqInimigo + 10
            }  
        } else{
            if(inimigoDefend <= 0){
                return semItem(n, s)
            } else{
                inimigoDefend = inimigoDefend - 1
                item = ["X Defend", `quantDefend-${s}`, suasDefend]
                evasionInimigo = evasionInimigo + 10
            } 
        }

        document.getElementById(`${item[1]}`).innerHTML = `${item[2]}x`
        desc.innerHTML = `O inimigo usou um ${item[0]} em ${s === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';
        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
        document.getElementById(`trainerInimigo-${s}`).style.transform=`${s===2? 'scale(1.1)' : 'scale(1.5)'} translate(0px, 0px)`;
        setTimeout(()=>{
            document.getElementById(`trainerInimigo-${s}`).style.transform=`${s===2? 'scale(1.1) translate(80%, 0px)' : 'scale(1.5) translate(30%, 0px)'}`;
        }, "1000")
        setTimeout(()=>{
            seuTurno = true
            document.getElementById(`seuTurno-${s}`).style.display = "flex"
            document.getElementById(`descAcao-${s}`).style.display = "none"
        },"4500")
    }    
    
}

function usarPocao(n, s){
    const desc = document.getElementById(`descricao-${s}`)
    document.getElementById(`seuTurno-${s}`).style.display = "none"
    document.getElementById(`mochilaContainer-${s}`).style.display = "none"
    document.getElementById(`descAcao-${s}`).style.display = "flex"

    if(seuTurno === true){
        if(suasPocoes <= 0){
            semItem("poções", s)
        } else{
            suasPocoes = suasPocoes - 1
            document.getElementById(`quantPocoes-${s}`).innerHTML = `${suasPocoes}x`
            desc.innerHTML = `Você usou uma poção em ${s === 2 ? pokemonBatalha[seuP].name : pokemonBatalha[0].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            document.getElementById(`trainerSeu-${s}`).style.transform="scale(5) translate(0px, 0px)";
            potionSound.play()
            setTimeout(()=>{
                document.getElementById(`trainerSeu-${s}`).style.transform="scale(5) translate(-50px, 0px)";
            }, "1000")
            setTimeout(()=>{
                seuTurno = false
                document.getElementById(`seuBarra-${s}`).value = parseInt(document.getElementById(`seuBarra-${s}`).value + 20);
                document.getElementById(`seuVidaText-${s}`).innerHTML = `${document.getElementById(`seuBarra-${s}`).value}/${s === 2 ? pokemonBatalha[seuP].stats[0].base_stat : pokemonBatalha[0].stats[0].base_stat}`
                turnoOponente(s)
            },"4500")
        }
    } else{
        if(inimigoPocoes <= 0){
            desc.innerHTML = `O inimigo usa ${s === 2 ? movesInimigo[eliteP][n].name : moveInimigo[n].name} com ${s === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            setTimeout(()=>{
                atacar(n, s)
            }, "4500")
        } else{
            inimigoPocoes = inimigoPocoes - 1
            desc.innerHTML = `O inimigo usou uma poção em ${s === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            document.getElementById(`trainerInimigo-${s}`).style.transform=`${s===2? 'scale(1.1)' : 'scale(1.5)'} translate(0px, 0px)`;
            setTimeout(()=>{
                document.getElementById(`trainerInimigo-${s}`).style.transform=`${s===2? 'scale(1.1) translate(80%, 0px)' : 'scale(1.5) translate(30%, 0px)'}`;
            }, "1000")
            potionSound.play()
            setTimeout(()=>{
                seuTurno = true
                document.getElementById(`inimigoBarra-${s}`).value = parseInt(document.getElementById(`inimigoBarra-${s}`).value + 20)
                document.getElementById(`seuTurno-${s}`).style.display = "flex"
                document.getElementById(`descAcao-${s}`).style.display = "none"
            },"4500")
        }
    }
}
function semItem(item, n){
    const desc = document.getElementById(`descricao-${n}`)
    if(seuTurno === true){
        desc.innerHTML = `Você não tem mais ${item}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';
        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
        setTimeout(()=>{
            document.getElementById(`descAcao-${n}`).style.display = "none"
            document.getElementById(`mochilaContainer-${n}`).style.display = "none"
            document.getElementById(`seuTurno-${n}`).style.display = "flex"
        },"3000")
    } else{
        desc.innerHTML = `O inimigo usa ${n === 2 ? movesInimigo[eliteP][item].name : moveInimigo[item].name} com ${n === 2 ? pokemonsInimigo[eliteP].name : pokemonBatalha[1].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';
        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
        setTimeout(()=>{
            atacar(item, n)
        }, "4500")
    }
}

let musicVitoriaRandon;

function desmaiouPokemon(vencedor){
    const desc = document.getElementById(`descricao-2`)
    if(vencedor === pokemonBatalha[seuP]){
        if(eliteN < 3){
            desc.innerHTML = `Você derrotou ${pokemonsInimigo[eliteP].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';
            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            document.getElementById("inimigoImg-2").style.opacity = "0%"
            document.getElementById(`descAcao-2`).style.display = "flex"
            eliteP === 0 ? "" : document.getElementById("trainerInimigo-2").style.transform = "scale(1.1) translate(700%, 0px)"
            setTimeout(()=>{
                if(eliteP === 0){
                    iniciarLiga(1,eliteN, seuP, 1)
                    desc.innerHTML = `O oponente substitui o pokemon`
                } else{
                    eliteN = eliteN + 1
                    desc.innerHTML = `Outro oponente entra, ${eliteData[eliteN].nome}`
                    iniciarBatalha(2, 0, eliteN, seuP)
                }
                const textoArray = desc.innerHTML.split('');
                desc.innerHTML = ' ';
                textoArray.forEach(function(letra, i){   
                    setTimeout(function(){
                        desc.innerHTML += letra;
                    }, 75 * i)
                })
                setTimeout(()=>{
                    document.getElementById("inimigoImg-2").style.opacity = "100%"
                    document.getElementById("trainerInimigo-2").style.transform = "scale(1.1) translate(80%, 0px)"
                    setTimeout(()=>{
                        seuTurno = true
                        document.getElementById(`descAcao-2`).style.display = "none"
                        document.getElementById(`seuTurno-2`).style.display = "flex"
                    }, "3000")
                }, "1500")
            }, "3000")
        } else{
            fimLiga(1)
        }
    } else{
        if(seuP < 1){
            desc.innerHTML = `${pokemonBatalha[seuP].name} foi derrotado`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';
            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            document.getElementById("seuImg-2").style.opacity = "0%"
            document.getElementById(`descAcao-2`).style.display = "flex"
            setTimeout(()=>{
                iniciarLiga(eliteP,eliteN, 1, 2)
                desc.innerHTML = `Você substitui o pokemon`
                const textoArray = desc.innerHTML.split('');
                desc.innerHTML = ' ';
                textoArray.forEach(function(letra, i){   
                    setTimeout(function(){
                        desc.innerHTML += letra;
                    }, 75 * i)
                })
                setTimeout(()=>{
                    document.getElementById("seuImg-2").style.opacity = "100%"
                    setTimeout(()=>{
                        seuTurno = true
                        document.getElementById(`descAcao-2`).style.display = "none"
                        document.getElementById(`seuTurno-2`).style.display = "flex"
                    }, "3000")
                }, "1500")
            }, "3000")
        } else{
            fimLiga(2)
        }
    }
}

function fimLiga(n){
    const desc = document.getElementById(`descricao-2`)
    document.querySelectorAll(".batalha").forEach(e =>{
        e.style.display = "none"
    })
    document.getElementById(`fimBatalha-2`).style.display = "flex"

    document.getElementById(`seuTurno-2`).style.display = "none"
    document.getElementById(`descAcao-2`).style.display = "flex"

    document.querySelector(".display_elite").style.backgroundImage = "url('./assets/background_pokemon.avif')"
    document.querySelector(".display_elite").style.backgroundPosition = "bottom"

    document.getElementById(`btnFinalizar-2`).style.display = "block"

    batalhaMusic4.pause()
    vitoriaMusic4.currentTime = 0

    if(n === 1){
        document.getElementById(`pokemonVencedor1-2`).src = pokemonBatalha[0].sprites.other.showdown.front_default
        document.getElementById(`pokemonVencedor2-2`).src = pokemonBatalha[1].sprites.other.showdown.front_default
        document.getElementById(`trainerVencedor`).src = './assets/trainerSeufront.webp'
        vitoriaMusic4.play()
        desc.innerHTML = `Parabens! Você ganhou a Liga Pokemon, agora você é o lider!`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
    } else{
        document.getElementById(`pokemonVencedor1-2`).src = pokemonsInimigo[0].sprites.other.showdown.front_default
        document.getElementById(`pokemonVencedor2-2`).src = pokemonsInimigo[1].sprites.other.showdown.front_default
        document.getElementById(`trainerVencedor`).src = './assets/'+eliteData[eliteN].nome.toLowerCase()+'.png'
        derrotaMusic.play()
        desc.innerHTML = `Oh não! Infelizmente você perdeu a liga pokemon contra ${eliteData[eliteN].nome}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
    }
}

function fimBatalha(vencedor, s){
    
    const desc = document.getElementById(`descricao-${s}`)
    let perdedor;
    musicVitoriaRandon = Math.floor(Math.random()*(2.9 - 0)+0)
    vitoriaMusicArr[musicVitoriaRandon].currentTime = 0
    document.querySelectorAll(".batalha").forEach(e =>{
        e.style.display = "none"
    })
    document.getElementById(`fimBatalha-${s}`).style.display = "flex"
    document.getElementById(`pokemonVencedor-${s}`).src = vencedor.sprites.other.showdown.front_default

    document.getElementById(`seuTurno-${s}`).style.display = "none"
    document.getElementById(`descAcao-${s}`).style.display = "flex"

    document.querySelector(".display_pokemons").style.backgroundImage = "url('./assets/background_pokemon.avif')"
    document.querySelector(".display_pokemons").style.backgroundPosition = "bottom"

    document.getElementById(`btnFinalizar-${s}`).style.display = "block"

    s === 2 ? batalhaMusic4.pause() : batalhaMusicArr[musicBatalhaRandon].pause()

    if(vencedor === pokemonBatalha[0]){
        perdedor = pokemonBatalha[1]
        vitoriaMusicArr[musicVitoriaRandon].play()
        desc.innerHTML = `Parabens! Você ganhou a batalha contra ${perdedor.name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
    } else{
        perdedor = pokemonBatalha[0]
        derrotaMusic.play()
        desc.innerHTML = `Oh não! Infelizmente você perdeu a batalha contra ${vencedor.name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
    }
}

function resetBattle(n){
    n === 2 ? vitoriaMusic4.pause() : vitoriaMusicArr[musicVitoriaRandon].pause()
    derrotaMusic.pause()

    document.getElementById(`batalhaPokemon-${n}`).style.display = "none"
    document.getElementById(`btnStart${n}`).style.display = "flex"
    document.getElementById(`equipePokemon-${n}`).style.display = "flex"
    document.getElementById(`searchPokemon-${n}`).style.display = "block"
    document.querySelector(".oponenteEquipe").style.display = "flex"

    document.getElementById(`fimBatalha-${n}`).style.display = "none"
    document.getElementById(`pokemonVencedor-${n}`).src = ""

    document.getElementById(`seuTurno-${n}`).style.display = "none"
    document.getElementById(`descAcao-${n}`).style.display = "none"

    document.getElementById(`${n === 1 ? 'display_pokemons' : 'display_elite'}`).style.backgroundImage = `url(${n === 1 ? './assets/d9spuwer2c491.webp' : './assets/fundoElite.jpg'})`
    document.getElementById(`${n === 1 ? 'display_pokemons' : 'display_elite'}`).style.backgroundPosition = "center"
}