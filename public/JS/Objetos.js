var canvas = document.querySelector("#world");
var contexto = canvas.getContext("2d");

function Desenhavel(x, y, veloX, veloY, imagem, proporcao) {
    this.x = x;
    this.y = y;
    this.veloX = veloX;
    this.veloY = veloY;
    this.img = imagem;
    this.proporcao = proporcao;
    this.alturaObj = this.img.height * this.proporcao;
    this.larguraObj = this.img.width * this.proporcao;
    this.acabouDeViver = true;
    this.morto=false;
    this.draw = function () {
        contexto.drawImage(this.img, this.x, this.y, this.larguraObj, this.alturaObj);
    };
    this.update = function () {
        if (this.acabouDeViver) {
            if (this.y > 0 && this.y + this.alturaObj < canvas.height) {
                this.acabouDeViver = false;
            }
        } else {
            if (this.y + this.alturaObj >= canvas.height || this.y <= 0) {
                this.veloY = -this.veloY;
            }
        }
        this.x += this.veloX;
        this.y += this.veloY;

    };
}
