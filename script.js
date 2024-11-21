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

const desc = document.getElementById("descricao")

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
var vitoriaMusic1 = new Audio("./assets/vitoriaMusic1.mp3")
var vitoriaMusic2 = new Audio("./assets/vitoriaMusic2.mp3")
var vitoriaMusic3 = new Audio("./assets/vitoriaMusic3.mp3")
var derrotaMusic = new Audio("./assets/derrotaMusic.mp3")
derrotaMusic.loop = true

const batalhaMusicArr = [batalhaMusic1, batalhaMusic2, batalhaMusic3]
batalhaMusicArr.forEach(audio => {
    audio.loop = true
})
const vitoriaMusicArr = [vitoriaMusic1, vitoriaMusic2, vitoriaMusic3]
vitoriaMusicArr.forEach(audio => {
    audio.loop = true
})

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

    setBackground(pokemon);

    const id = document.getElementById(`id${pokemonAtualCont}`)
    const nome = document.getElementById(`nome${pokemonAtualCont}`)
    const tipo = document.getElementById(`tipo${pokemonAtualCont}`)
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

function setBackground(pokemon){
    if(pokemon.types[0].type.name === "normal"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "gray"
    } else if (pokemon.types[0].type.name === "fire"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "orange"
    }else if (pokemon.types[0].type.name === "water"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "lightblue"
    }else if (pokemon.types[0].type.name === "electric"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(207, 176, 0)"
    }else if (pokemon.types[0].type.name === "grass"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "green"
    }else if (pokemon.types[0].type.name === "fighting"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "darkred"
    }else if (pokemon.types[0].type.name === "poison"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "purple"
    }else if (pokemon.types[0].type.name === "ground"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(109, 82, 47)"
    }else if (pokemon.types[0].type.name === "flying"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(199, 199, 199)"
    }else if (pokemon.types[0].type.name === "psychic"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(160, 74, 182)"
    }else if (pokemon.types[0].type.name === "bug"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "lightgreen"
    }else if (pokemon.types[0].type.name === "rock"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(72, 88, 0)"
    }else if (pokemon.types[0].type.name === "ghost"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(61, 39, 104)"
    }else if (pokemon.types[0].type.name === "dragon"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "blue"
    }else if (pokemon.types[0].type.name === "steel"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "rgb(59, 59, 59)"
    }else if (pokemon.types[0].type.name === "fairy"){
        document.querySelector(`.equipe${pokemonAtualCont}`).style.backgroundColor = "pink"
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
var musicBatalhaRandon;
var suasPocoes;
var inimigoPocoes;
function iniciarBatalha(){
    seuTurno = true;

    suasPocoes = 2;
    inimigoPocoes = 2;

    document.querySelectorAll(".batalha").forEach(e =>{
        e.style.display = "flex"
    })

    document.getElementById("btnFinalizar").style.display = "none"
    document.getElementById("seuTurno").style.display = "flex"
    document.getElementById("descAcao").style.display = "none"

    document.querySelector(".equipe_pokemons").style.display = "none"
    document.getElementById("btnStartBattle").style.display = "none"
    document.querySelector(".searchPokemon").style.display = "none"
    document.querySelector(".batalha_pokemon").style.display = "flex"

    let seuPokemon = pokemonBatalha[0]
    let pokemonInimigo = pokemonBatalha[1]

    musicBatalhaRandon = Math.floor(Math.random()*(2.9 - 0)+0)
    batalhaMusicArr[musicBatalhaRandon].currentTime = 0
    batalhaMusicArr[musicBatalhaRandon].play()

    document.getElementById("inimigoImg").src = pokemonInimigo.sprites.other.showdown.front_default
    document.getElementById("seuImg").src = seuPokemon.sprites.other.showdown.back_default
    document.getElementById("inimigoVida").innerHTML = pokemonInimigo.name
    document.getElementById("inimigoTipo").innerHTML = pokemonInimigo.types[0].type.name
    document.getElementById("seuVida").innerHTML = seuPokemon.name
    document.getElementById("seuTipo").innerHTML = seuPokemon.types[0].type.name
    document.getElementById("inimigoBarra").value = `${pokemonInimigo.stats[0].base_stat}`
    document.getElementById("inimigoBarra").setAttribute("max", `${pokemonInimigo.stats[0].base_stat}`)
    document.getElementById("seuBarra").value = `${seuPokemon.stats[0].base_stat}`
    document.getElementById("seuBarra").setAttribute("max", `${seuPokemon.stats[0].base_stat}`)
    document.getElementById("seuVidaText").innerHTML = `${seuPokemon.stats[0].base_stat}/${seuPokemon.stats[0].base_stat}`
}

var tipoAtacante;
var tipoVitima;
let atq;
let def;
let sAtq;
let accuracy;
let evasion;

function atacar(){

    document.getElementById("seuTurno").style.display = "none"
    document.getElementById("descAcao").style.display = "flex"

    var vida;
    if(seuTurno === true){
        vida = "inimigoBarra";
        tipoAtacante = pokemonBatalha[0].types[0].type.name;
        tipoVitima = pokemonBatalha[1].types[0].type.name;
        atq = pokemonBatalha[0].stats[1].base_stat;
        def = pokemonBatalha[1].stats[2].base_stat;
        sAtq = pokemonBatalha[0].stats[3].base_stat;
        accuracy = pokemonBatalha[0].stats[5].base_stat;
        evasion = pokemonBatalha[1].stats[4].base_stat
        desc.innerHTML = `Você ataca com o ${pokemonBatalha[0].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        });
        seuTurno = false
    } else{
        vida = "seuBarra";
        tipoAtacante = pokemonBatalha[1].types[0].type.name;
        tipoVitima = pokemonBatalha[0].types[0].type.name;
        atq = pokemonBatalha[1].stats[1].base_stat;
        def = pokemonBatalha[0].stats[2].base_stat;
        sAtq = pokemonBatalha[1].stats[3].base_stat;
        accuracy = pokemonBatalha[1].stats[5].base_stat;
        evasion = pokemonBatalha[0].stats[4].base_stat
        seuTurno = true
    }

    let acerta = acertarAtaque()

    setTimeout(() => {
        if (acerta===false){
            desc.innerHTML = `${seuTurno == false ? pokemonBatalha[0].name : pokemonBatalha[1].name} erra o ataque`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = '';
            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            });

            erroSound.play()
            seuTurno === false ? document.querySelector(".pokemonInimigo").style.right= "80px" : document.querySelector(".seuPokemon").style.left= "100px"
            seuTurno === false ? document.getElementById("gifatkInimigo").style.left= "80px" : document.getElementById("gifatkSeu").style.right= "100px"
            seuTurno === false ? document.getElementById("trainerInimigo").style.left= "80px" : document.getElementById("trainerSeu").style.right= "100px"
            document.getElementById(`${seuTurno == false ? "gifatkInimigo" : "gifatkSeu"}`).style.display = "block"
            setTimeout(()=>{
                document.getElementById(`${seuTurno == false ? "gifatkInimigo" : "gifatkSeu"}`).style.display = "none"
                seuTurno === false ? document.getElementById("gifatkInimigo").style.left= "0px" : document.getElementById("gifatkSeu").style.right= "0px"
            }, "1000")
            
            setTimeout(() => {
                if (seuTurno === false){
                    document.querySelector(".pokemonInimigo").style.right= "0px"
                    document.getElementById("trainerInimigo").style.left= "0px"
                    return turnoOponente()
                } else{
                    document.querySelector(".seuPokemon").style.left= "0px"
                    document.getElementById("trainerSeu").style.right= "0px"
                    document.getElementById("descAcao").style.display = "none"
                    document.getElementById("seuTurno").style.display = "flex"
                }
            }, "4000")
            
        } else{
            let bonus = setBonus();
            let stab = pokemonBatalha[0].types[0].type.name === pokemonBatalha[1].types[0].type.name ? 1.5 : 1
            let na = Math.floor(Math.random() * (100 - 85 + 1)) + 85
            let dano = (((((1 * 2/5) + 2) * sAtq * atq/def)/50 + 2) * stab * bonus * na/100)

            desc.innerHTML = `${seuTurno === false ? pokemonBatalha[0].name : pokemonBatalha[1].name} acerta um ataque ${bonus === 1/2 ? "pouco efetivo" : bonus === 2 ? "super efetivo" : bonus === 0 ? "sem efeito" : ""}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';
            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            });

            console.log(bonus)

            atackSound.play()
            document.getElementById(`${seuTurno == false ? "gifatkInimigo" : "gifatkSeu"}`).style.display = "block"
            setTimeout(()=>{
                document.getElementById(`${seuTurno == false ? "gifatkInimigo" : "gifatkSeu"}`).style.display = "none"
            }, "1000")
            
            setTimeout(()=>{
                if(vida === "inimigoBarra"){
                    document.getElementById(vida).value = parseInt(document.getElementById(vida).value - dano);
                } else{
                    document.getElementById(vida).value = parseInt(document.getElementById(vida).value - dano);
                    document.getElementById("seuVidaText").innerHTML = `${document.getElementById(vida).value}/${pokemonBatalha[0].stats[0].base_stat}`
                }

                if (document.getElementById("seuBarra").value <= 0 || document.getElementById("inimigoBarra").value <= 0){
                    if (seuTurno === false){
                        return fimBatalha(pokemonBatalha[0])
                    } else{
                        return fimBatalha(pokemonBatalha[1])
                    }
                } else{
                    if (seuTurno === false){
                        turnoOponente()
                    } else{
                        document.getElementById("descAcao").style.display = "none"
                        document.getElementById("seuTurno").style.display = "flex"
                    }
                }
            }, "4000")
        }
    }, "3000")

}

function turnoOponente(){
    document.getElementById("seuTurno").style.display = "none"
    document.getElementById("descAcao").style.display = "flex"

    if(document.getElementById("inimigoBarra").value <= (pokemonBatalha[1].stats[0].base_stat/3)){
        usarPocao()
    } else{
        desc.innerHTML = `O inimigo ataca com o ${pokemonBatalha[1].name}`
        const textoArray = desc.innerHTML.split('');
        desc.innerHTML = ' ';

        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                desc.innerHTML += letra;
            }, 75 * i)
        })
        setTimeout(()=>{
            atacar()
        }, "2000")
    }
}

let musicVitoriaRandon;

function fimBatalha(vencedor){
    let perdedor;
    musicVitoriaRandon = Math.floor(Math.random()*(2.9 - 0)+0)
    vitoriaMusicArr[musicVitoriaRandon].currentTime = 0
    document.querySelectorAll(".batalha").forEach(e =>{
        e.style.display = "none"
    })
    document.getElementById("fimBatalha").style.display = "flex"
    document.getElementById("pokemonVencedor").src = vencedor.sprites.other.showdown.front_default

    document.getElementById("seuTurno").style.display = "none"
    document.getElementById("descAcao").style.display = "flex"

    document.querySelector(".display_pokemons").style.backgroundImage = "url('./assets/background_pokemon.avif')"
    document.querySelector(".display_pokemons").style.backgroundPosition = "bottom"

    document.getElementById("btnFinalizar").style.display = "block"

    batalhaMusicArr[musicBatalhaRandon].pause()

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

function acertarAtaque(){
    let calcMultiplicador = (Math.random()*(2 - 0.3) + 0.3).toString()
    let multiplicador = parseFloat(calcMultiplicador.slice(0, 4))
    
    let chanceAcerto = multiplicador * (accuracy/evasion)

    console.log(chanceAcerto)

    if(chanceAcerto >= 1){
        return true
    } else{
        return false
    }
}

function setBonus(){
    console.log(tipoAtacante)
    console.log(tipoVitima)
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

function abrirMochila(){
    document.getElementById("seuTurno").style.display = "none"
    document.getElementById("descAcao").style.display = "none"
    document.querySelector(".mochila_container").style.display = "grid"
}

function usarPocao(){
    document.getElementById("seuTurno").style.display = "none"
    document.querySelector(".mochila_container").style.display = "none"
    document.getElementById("descAcao").style.display = "flex"

    if(seuTurno === true){
        if(suasPocoes <= 0){
            desc.innerHTML = `Você não tem mais poções`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            setTimeout(()=>{
                document.getElementById("descAcao").style.display = "none"
                document.querySelector(".mochila_container").style.display = "none"
                document.getElementById("seuTurno").style.display = "flex"
            },"3000")
        } else{
            suasPocoes = suasPocoes - 1
            document.getElementById("quantPocoes").innerHTML = `${suasPocoes}x`
            desc.innerHTML = `Você usou uma poção no ${pokemonBatalha[0].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            document.getElementById("trainerSeu").style.transform="scale(5) translate(0px, 0px)";
            potionSound.play()
            setTimeout(()=>{
                document.getElementById("trainerSeu").style.transform="scale(5) translate(-50px, 0px)";
            }, "1000")
            setTimeout(()=>{
                seuTurno = false
                document.getElementById("seuBarra").value = parseInt(document.getElementById("seuBarra").value + 20);
                document.getElementById("seuVidaText").innerHTML = `${document.getElementById("seuBarra").value}/${pokemonBatalha[0].stats[0].base_stat}`
                turnoOponente()
            },"3000")
        }
    } else{
        if(inimigoPocoes <= 0){
            desc.innerHTML = `O inimigo ataca com o ${pokemonBatalha[1].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            setTimeout(()=>{
                atacar()
            }, "3000")
        } else{
            inimigoPocoes = inimigoPocoes - 1
            desc.innerHTML = `O inimigo usou uma poção no ${pokemonBatalha[1].name}`
            const textoArray = desc.innerHTML.split('');
            desc.innerHTML = ' ';

            textoArray.forEach(function(letra, i){   
                setTimeout(function(){
                    desc.innerHTML += letra;
                }, 75 * i)
            })
            document.getElementById("trainerInimigo").style.transform="scale(1.5) translate(0px, 0px)";
            setTimeout(()=>{
                document.getElementById("trainerInimigo").style.transform="scale(1.5) translate(30%, 0px)";
            }, "1000")
            potionSound.play()
            setTimeout(()=>{
                seuTurno = true
                document.getElementById("inimigoBarra").value = parseInt(document.getElementById("inimigoBarra").value + 20)
                document.getElementById("seuTurno").style.display = "flex"
                document.getElementById("descAcao").style.display = "none"
            },"3000")
        }
    }
}

function resetBattle(){
    vitoriaMusicArr[musicVitoriaRandon].pause()
    derrotaMusic.pause()

    document.querySelector(".batalha_pokemon").style.display = "none"
    document.getElementById("btnStartBattle").style.display = "flex"
    document.querySelector(".equipe_pokemons").style.display = "flex"
    document.querySelector(".searchPokemon").style.display = "block"

    document.getElementById("fimBatalha").style.display = "none"
    document.getElementById("pokemonVencedor").src = ""

    document.getElementById("seuTurno").style.display = "none"
    document.getElementById("descAcao").style.display = "none"

    document.querySelector(".display_pokemons").style.backgroundImage = "url('./assets/d9spuwer2c491.webp')"
    document.querySelector(".display_pokemons").style.backgroundPosition = "center"
}