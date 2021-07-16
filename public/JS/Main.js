var canvas;
var contexto;
var ESTADO_INICIAL = 1;
var ESTADO_JOGO = 2;
var ESTADO_GAMEOVER = 3;
var estado = ESTADO_INICIAL;
var imagens = carregaImagens();
var audios = carregaAudios();
var pontuacao = 0;
var vidas;
var objetos = {
    pabllo: undefined,
    inimigos: [],
    tiros: [],
    nuvens: []
};
var mouse = {
    x: undefined,
    y: undefined
};
var porcentagemPerda;

setInterval(function () {
    if (estado === ESTADO_JOGO) {
        if (Math.random() > 0.8 && objetos.inimigos.length < 5 + 1 * (pontuacao / 10)) {
            criarInimigo();
        }
        if (Math.random() > 0.9 && objetos.nuvens.length < 15) {
            criarNuvem();
        }
    }
}, 1000);
document.querySelector("body").addEventListener("load", main());

function main() {
    canvas = document.querySelector("#world");
    if (canvas.getContext("2d")) {
        canvas.width = window.innerWidth - 2;
        canvas.height = window.innerHeight - 6;
        contexto = canvas.getContext("2d");
        canvas.addEventListener("click", function (e) {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        document.querySelector("body").addEventListener("keypress", function (e) {
//            console.log(e);
            executarAcaoTecla(e.key);
        });
        document.querySelector("body").addEventListener("keyup", function (e) {
//            console.log("Soltou");
//            console.log(e);
            pararAcaoTecla(e.key);
        });
        animate();
    } else {
        alert("Ops! Seu navegador não suporta canvas.");
    }
}

function executarAcaoTecla(tecla) {
    if (estado === ESTADO_JOGO) {
        if (tecla === " ") {
            objetos.pabllo.img = imagens.pablloGrito;
            audios.grito.pause();
            audios.grito.currentTime = 0;
            audios.grito.play();
            var tiroNovo = new Desenhavel(objetos.pabllo.x + objetos.pabllo.larguraObj,
                    objetos.pabllo.y, 4, 0, imagens.tiroPabllo, 0.06);
            objetos.tiros.push(tiroNovo);
            setTimeout(function () {
                if(estado===ESTADO_JOGO){
                    objetos.pabllo.img = imagens.pablloVoo;
                }
            }, 1000);
        } else if (tecla === "a") {
            //console.log("Pressionou A");
            if (objetos.pabllo.x > 0) {
                objetos.pabllo.veloX = -objetos.pabllo.veloPadrao;
            } else {
                objetos.pabllo.veloX = 0;
            }
        } else if (tecla === "s") {
            //console.log("Pressionou S");
            if (objetos.pabllo.y < canvas.height - objetos.pabllo.alturaObj) {
                objetos.pabllo.veloY = objetos.pabllo.veloPadrao;
            } else {
                objetos.pabllo.veloY = 0;
            }
        } else if (tecla === "d") {
            // console.log("Pressionou D");
            if (objetos.pabllo.x < canvas.width - objetos.pabllo.larguraObj / 2) {
                objetos.pabllo.veloX = objetos.pabllo.veloPadrao;
            } else {
                objetos.pabllo.veloX = 0;
            }
        } else if (tecla === "w") {
            //console.log("Pressionou W");
            if (objetos.pabllo.y > 0) {
                objetos.pabllo.veloY = -objetos.pabllo.veloPadrao;
            } else {
                objetos.pabllo.veloY = 0;
            }
        }
    } else if (estado === ESTADO_GAMEOVER) {
        if (tecla === "Enter") {
            audios.ressucita.pause();
            audios.ressucita.currentTime = 0;
            audios.ressucita.play();
            iniciaGame();
        }
    }
}

function pararAcaoTecla(tecla) {
    if (estado === ESTADO_JOGO) {
        if (tecla === "a") {
            objetos.pabllo.veloX = 0;
        } else if (tecla === "s") {
            objetos.pabllo.veloY = 0;
        } else if (tecla === "d") {
            objetos.pabllo.veloX = 0;
        } else if (tecla === "w") {
            objetos.pabllo.veloY = 0;
        }
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    if (carregaramImagens()) {
        if (estado === ESTADO_INICIAL) {
            telaPlay();
        } else if (estado === ESTADO_JOGO) {
            telaGame();
        } else if (estado === ESTADO_GAMEOVER) {
            telaGameOver();
        }
    } else {
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        contexto.fillStyle = "rgb(0,0,0)";
        contexto.textAlign = "center";
        contexto.font = "40px arial";
        contexto.fillText("Carregando...", canvas.width / 2, canvas.height / 2);
    }

}

function telaPlay() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    if (imagens.background.width * (canvas.height / imagens.background.height) < canvas.width / 2 - 160) {
        contexto.fillStyle = "rgb(191,87,196)";
		contexto.fillRect(0, 0, canvas.width, canvas.height);
		contexto.drawImage(imagens.background, 0, 0,
                imagens.background.width * (canvas.height / imagens.background.height), imagens.background.height * (canvas.height / imagens.background.height));
        contexto.drawImage(imagens.background, canvas.width - imagens.background.width * (canvas.height / imagens.background.height), 0,
                imagens.background.width * (canvas.height / imagens.background.height), imagens.background.height * (canvas.height / imagens.background.height));
			contexto.fillStyle = "rgb(0,0,0)";
			contexto.fillRect(imagens.background.width * (canvas.height / imagens.background.height), 0, 10, canvas.height);
			contexto.fillRect(canvas.width - imagens.background.width * (canvas.height / imagens.background.height), 0, 10, canvas.height);			
} else {
        contexto.fillStyle = "rgb(191,87,196)";
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.fillStyle = "rgb(255,255,255)";
        contexto.fillRect(0, 0, canvas.width/2-200, canvas.height);
        contexto.fillRect(canvas.width / 2+200, 0, canvas.width/2-200, canvas.height);

        contexto.fillStyle = "rgb(0,0,0)";
        contexto.fillRect(canvas.width / 2-200, 0, 10, canvas.height);
        contexto.fillRect(canvas.width / 2+200, 0, 10, canvas.height);
    }
    contexto.fillStyle = "rgb(0,0,0)";
    contexto.textAlign = "center";
    contexto.font = "50px albas";
    contexto.fillText("Pabllo invaders", canvas.width / 2, 150);
    contexto.drawImage(imagens.play, canvas.width / 2 - (imagens.play.width * 1.25) / 2,
            canvas.height / 2 - (imagens.play.height * 1.25) / 2, imagens.play.width * 1.25, imagens.play.height * 1.25);
    contexto.save();
    contexto.filter = "contrast(70)";
    contexto.drawImage(imagens.botaoPlay,
            canvas.width / 2 - (imagens.play.width * 1.25) / 2 + 30,
            canvas.height / 2 + 150,
            imagens.botaoPlay.width * 0.3, imagens.botaoPlay.height * 0.3);
    contexto.restore();
    var dist = Math.sqrt((canvas.width / 2 - mouse.x) * (canvas.width / 2 - mouse.x) +
            (canvas.height / 2 + imagens.botaoPlay.height / 2 - mouse.y) *
            (canvas.height / 2 + imagens.botaoPlay.height / 2 - mouse.y));
    if (dist <= imagens.botaoPlay.height / 2) {
        audios.background.addEventListener("ended", function () {
            this.currentTime = 0;
            this.play();
        });
        iniciaGame();
    }
}

function iniciaGame() {
    audios.background.pause();
    audios.background.currentTime = 0;
    audios.background.play();
    porcentagemPerda = -1;
    vidas = 3;
    pontuacao = 0;
    estado = ESTADO_JOGO;
    objetos.inimigos = [];
    objetos.tiros = [];
    objetos.nuvens = [];
    objetos.pabllo = new Desenhavel(0, parseInt((canvas.height / 2 - imagens.pablloVoo.height * 0.1 / 2) + ""), 0, 0, imagens.pablloVoo, 0.1);
    objetos.pabllo.update = function () {
        if ((this.y + this.alturaObj >= canvas.height && this.veloY > 0) || (this.y <= 0 && this.veloY < 0)) {
            this.veloY = 0;
            if (this.y + this.alturaObj >= canvas.height) {
                this.y = canvas.height - this.alturaObj;
            } else {
                this.y = 0;
            }
        }
        if ((this.x <= 0 && this.veloX < 0) || (this.x + this.larguraObj >= canvas.width && this.veloX > 0)) {
            this.veloY = 0;
            if (this.x <= 0) {
                this.x = 0;
            } else {
                this.x = canvas.width - this.larguraObj;
            }
        }
        this.x += this.veloX;
        this.y += this.veloY;
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    };
    objetos.pabllo.veloPadrao = 2.8;
    for (var i = 0; i <= 2; i++) {
        criarInimigo();
        objetos.inimigos[i].x = objetos.inimigos[i].x - objetos.inimigos[i].larguraObj;
    }
    objetos.nuvens.push(new Desenhavel(canvas.width / 2, canvas.height / 2,
            -0.2, 0, imagens.nuvem, 0.2));
    objetos.nuvens.push(new Desenhavel(200, 100,
            -0.2, 0, imagens.nuvem, 0.3));
    objetos.nuvens.push(new Desenhavel(canvas.width - 300, 150,
            -0.4, 0, imagens.nuvem, 0.4));
    objetos.nuvens.push(new Desenhavel(canvas.width / 4, canvas.height / 2 + 100,
            -0.4, 0, imagens.nuvem, 0.6));
    objetos.nuvens.push(new Desenhavel(3 * canvas.width / 4, canvas.height - 250,
            -0.2, 0, imagens.nuvem, 0.2));
    objetos.nuvens.push(new Desenhavel(canvas.width / 2 - 100, 175,
            -0.4, 0, imagens.nuvem, 0.5));
}

function telaGame() {
    tratarColisao();
    if (estado === ESTADO_GAMEOVER) {
        objetos.inimigos.forEach(function (inimigoAtual) {
            inimigoAtual.veloX = 0;
            inimigoAtual.veloY = 0;
        });
        objetos.nuvens.forEach(function (nuvemAtual) {
            nuvemAtual.veloX = 0;
            nuvemAtual.veloY = 0;
        });
        objetos.tiros.forEach(function (tiroAtual) {
            tiroAtual.veloX = 0;
            tiroAtual.veloY = 0;
        });
        objetos.pabllo.veloX = 0;
        objetos.pabllo.veloY = 0;
    }

    desenhaObjetos();

    var remover = [];
    for (var i = 0; i < objetos.nuvens.length; i++) {
        var nuvemAtual = objetos.nuvens[i];
        if (nuvemAtual.x <= -nuvemAtual.larguraObj) {
            remover.push(i);
        }
    }
    for (var i = 0; i < remover.length; i++) {
        objetos.nuvens.splice(remover[i], 1);
        for (var j = i + 1; j < remover.length; j++) {
            remover[j] = remover[j] - 1;
        }
    }

    remover = [];
    for (var i = 0; i < objetos.inimigos.length; i++) {
        var inimigoAtual = objetos.inimigos[i];
        if (inimigoAtual.x <= -inimigoAtual.larguraObj) {
            remover.push(i);
        }
    }
    for (var i = 0; i < remover.length; i++) {
        objetos.inimigos.splice(remover[i], 1);
        for (var j = i + 1; j < remover.length; j++) {
            remover[j] = remover[j] - 1;
        }
    }

    remover = [];
    for (var i = 0; i < objetos.tiros.length; i++) {
        var tiroAtual = objetos.tiros[i];
        if (tiroAtual.x <= -tiroAtual.larguraObj || tiroAtual.x >= canvas.width) {
            remover.push(i);
        }
    }
    for (var i = 0; i < remover.length; i++) {
        objetos.tiros.splice(remover[i], 1);
        for (var j = i + 1; j < remover.length; j++) {
            remover[j] = remover[j] - 1;
        }
    }

    if (estado === ESTADO_JOGO) {
        if (objetos.inimigos.length <= pontuacao / 50) {
            criarInimigo();
        }
        //Sorteia tiros.
        objetos.inimigos.forEach(function (inimigoAtual) {
            if (!inimigoAtual.morto && contaTirosInimigos() < objetos.inimigos.length && Math.random() * 10 > inimigoAtual.numTiros) {
                objetos.tiros.push(new Desenhavel(inimigoAtual.x - imagens.bolsonaro.width * 0.05,
                        inimigoAtual.y, -4, 0, imagens.tiroBolsonaro, 0.05));
            }
        });
    }

}

function desenhaObjetos() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.fillStyle = "rgb(135,206,250)";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    objetos.nuvens.forEach(function (nuvemAtual) {
        nuvemAtual.draw();
        nuvemAtual.update();
    });
    if (porcentagemPerda<0 && objetos.pabllo.morto) {
        explodePabllo();
    }

    objetos.pabllo.draw();
    objetos.pabllo.update();

    objetos.inimigos.forEach(function (porquinhoAtual) {
        porquinhoAtual.draw();
        porquinhoAtual.update();
    });
    objetos.tiros.forEach(function (tiroAtual) {
        tiroAtual.draw();
        tiroAtual.update();
    });

    //Desenha vidas.
    for (var i = 0; i <= vidas - 1; i++) {
        contexto.drawImage(imagens.life, canvas.width - (imagens.life.width * 0.15) * 3 + (imagens.life.width * 0.15) * i,
                0, imagens.life.width * 0.15, imagens.life.height * 0.15);
    }
    contexto.font = "30px arial";
    contexto.fillStyle = "black";
    contexto.fillText("Vidas:", canvas.width - (imagens.life.width * 0.15) * 3 - 50, 50);
    contexto.fillText("" + pontuacao, canvas.width - imagens.score.width * 0.2 - 40, canvas.height - 20);
    contexto.drawImage(imagens.score, canvas.width - 10 - imagens.score.width * 0.2,
            canvas.height - 10 - imagens.score.height * 0.2, imagens.score.width * 0.2, imagens.score.height * 0.2);
    contexto.font = "13px arial";
    contexto.textAlign = "center";
    contexto.fillText("@glaucienelaura", canvas.width / 2 - 80, canvas.height - 9);
    contexto.fillText("@iagoizi", canvas.width / 2, canvas.height - 9);
    contexto.fillText("@yasminvilero", canvas.width / 2 + 70, canvas.height - 9);
}

function criarInimigo() {
    var novoInimigo = new Desenhavel(canvas.width, Math.random() * (canvas.height - 0.1 * imagens.bolsonaro.height),
            Math.random() * (-0.9), Math.random() * 4, imagens.bolsonaro, 0.1);
    novoInimigo.numTiros = parseInt(Math.random() * 4) + 6;
    //console.log(novoInimigo);
    objetos.inimigos.push(novoInimigo);
}

function criarNuvem() {
    var propNuvem = Math.random() * 0.7;
    objetos.nuvens.push(new Desenhavel(canvas.width, Math.random() * (canvas.height - propNuvem * imagens.nuvem.height),
            Math.random() * (-0.9), 0, imagens.nuvem, propNuvem));
}

function tratarColisao() {
    //Trata tiro no inimigo.
    objetos.tiros.forEach(function (tiroAtual) {
        objetos.inimigos.forEach(function (inimigoAtual) {
            if (tiroAtual.veloX >= 0 && !inimigoAtual.morto) {
                if (((tiroAtual.x - inimigoAtual.x) * (tiroAtual.x - inimigoAtual.x) < tiroAtual.larguraObj * tiroAtual.larguraObj)
                        && ((tiroAtual.y - inimigoAtual.y) * (tiroAtual.y - inimigoAtual.y) < tiroAtual.alturaObj * tiroAtual.alturaObj)) {
                    explodePorco(inimigoAtual);
                    objetos.tiros.splice(objetos.tiros.indexOf(tiroAtual), 1);
                }
            }
        });
    });
    //Trata colisão corpo a corpo.
    objetos.inimigos.forEach(function (inimigoAtual) {
        if (!inimigoAtual.morto) {
            if (((objetos.pabllo.x - inimigoAtual.x) * (objetos.pabllo.x - inimigoAtual.x) < (objetos.pabllo.larguraObj / 2) * (objetos.pabllo.larguraObj / 2))
                    && ((objetos.pabllo.y + objetos.pabllo.alturaObj / 2 - inimigoAtual.y) * (objetos.pabllo.y + objetos.pabllo.alturaObj / 2 - inimigoAtual.y) < (objetos.pabllo.alturaObj / 2) * (objetos.pabllo.alturaObj / 2))) {
                explodePorco(inimigoAtual);
                machucaPabllo();
            }
        }
    });
    //Trata tiro na Pabllo.
    objetos.tiros.forEach(function (tiroAtual) {
        if (((objetos.pabllo.x - tiroAtual.x) * (objetos.pabllo.x - tiroAtual.x) < (objetos.pabllo.larguraObj / 2) * (objetos.pabllo.larguraObj / 2))
                && ((objetos.pabllo.y + objetos.pabllo.alturaObj / 2 - tiroAtual.y) * (objetos.pabllo.y + objetos.pabllo.alturaObj / 2 - tiroAtual.y) <
                        (objetos.pabllo.alturaObj / 2) * (objetos.pabllo.alturaObj / 2))) {
            machucaPabllo();
            objetos.tiros.splice(objetos.tiros.indexOf(tiroAtual), 1);
        }
    });
    if (vidas <= 0) {
        estado = ESTADO_GAMEOVER;
        objetos.pabllo.morto = true;
    }
}

function machucaPabllo() {
    vidas--;
    audios.ai.pause();
    audios.ai.currentTime = 0;
    if (vidas > 0) {
        audios.ai.play();
    } else {
        var posicaoAleatoria = (Math.random() >= 0.5) ? 1 : 0;
        audios.morte[posicaoAleatoria].currentTime = 0;
        audios.morte[posicaoAleatoria].play();
    }

}

function contaTirosInimigos() {
    var cont = 0;
    objetos.tiros.forEach(function (tiroAtual) {
        if (tiroAtual.veloX < 0) {
            cont++;
        }
    });
    return cont;
}

function explodePorco(inimigoAtual) {
    inimigoAtual.morto = true;
    pontuacao = pontuacao + 5;
    inimigoAtual.img = imagens.explosao1;
    inimigoAtual.veloX = 0;
    inimigoAtual.veloY = 0;
    var novaExplosao = new Audio();
    novaExplosao.src = audios.explosao.src;
    novaExplosao.play();
    setTimeout(function () {
        inimigoAtual.img = imagens.explosao2;
        setTimeout(function () {
            objetos.inimigos.splice(objetos.inimigos.indexOf(inimigoAtual), 1);
        }, 400);
    }, 500);
}

function explodePabllo() {
    var novaExplosao = new Audio();
    novaExplosao.src = audios.explosao.src;
    novaExplosao.play();
    objetos.pabllo.img = imagens.explosao1;
    setTimeout(function () {
        objetos.pabllo.img = imagens.explosao2;
        objetos.pabllo.draw();
        porcentagemPerda = 100;
    }, 500);
}

function telaGameOver() {
    if (porcentagemPerda >= 0) {
        desenhaObjetos();
        contexto.save();
        contexto.filter = "blur(" + porcentagemPerda + "px)";
        contexto.drawImage(imagens.gameOver, canvas.width / 2 - imagens.gameOver.width / 2, canvas.height / 2 - imagens.gameOver.height / 2);
        contexto.restore();
        porcentagemPerda=porcentagemPerda-4;
    }
}