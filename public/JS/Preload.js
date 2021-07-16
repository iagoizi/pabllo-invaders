var imagensCarregar = {
    pablloVoo: null,
    pablloGrito: null,
    nuvem: null,
    tiroBolsonaro: null,
    bolsonaro: null,
    tiroPabllo: null,
    score: null,
    explosao1: null,
    explosao2: null,
    life: null,
    play: null,
    botaoPlay: null,
    botaoPause: null,
    gameOver: null,
    background: null
};

var nImagensCarregadas=0;
var nImagens=0;

function novaImg(src){
  nImagens++;
  var novo = new Image();
  novo.src=src;
  novo.addEventListener("load",function(){nImagensCarregadas++;});
  return novo;
}

imagensCarregar.pablloVoo = novaImg("IMG/voo.png");
imagensCarregar.pablloGrito = novaImg("IMG/voo-grito.png");
imagensCarregar.bolsonaro = novaImg("IMG/bolsonaro-porco.png");
imagensCarregar.tiroBolsonaro = novaImg("IMG/cocô.png");
imagensCarregar.tiroPabllo = novaImg("IMG/mona.png");
imagensCarregar.explosao1 = novaImg("IMG/explosao1.png");
imagensCarregar.explosao2 = novaImg("IMG/explosao2.png");
imagensCarregar.life = novaImg("IMG/life.png");
imagensCarregar.play = novaImg("IMG/icon.png");
imagensCarregar.score = novaImg("IMG/score.jpeg");
imagensCarregar.nuvem = novaImg("IMG/nuvem.png");
imagensCarregar.botaoPlay = novaImg("IMG/botao-play.png");
imagensCarregar.botaoPause = novaImg("IMG/botao-pause.png");
imagensCarregar.gameOver = novaImg("IMG/gameover.png");
imagensCarregar.background= novaImg("IMG/back.jpg");

function carregaramImagens(){
    if(nImagensCarregadas===nImagens){
        return true;
    }else{
        return false;
    }
}

function carregaImagens() {
    return imagensCarregar;
}

var audiosCarregar = {
    background: new Audio(),
    grito: new Audio(),
    explosao: new Audio(),
    ressucita: new Audio(),
    ai:new Audio(),
    morte:[]
};

audiosCarregar.morte.push(new Audio());
audiosCarregar.morte[0].src = "AUDIOS/morte.mp3";
audiosCarregar.morte.push(new Audio());
audiosCarregar.morte[1].src = "AUDIOS/morte2.wav";
audiosCarregar.background.src = "AUDIOS/ko.mp3";
audiosCarregar.grito.src="AUDIOS/yuke.mp3";
audiosCarregar.ressucita.src="AUDIOS/ressucita.mp3";
audiosCarregar.ai.src = "AUDIOS/ai.mp3";
audiosCarregar.explosao.src="AUDIOS/explosao.wav";


function carregaAudios() {
    return audiosCarregar;
}

