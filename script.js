const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const tamanhoBloco = 10;
let velocidade = 100; // Velocidade em milissegundos
let cobrinha = [{ x: 100, y: 100 }];
let comida = { x: 200, y: 150 };
let direcao = "direita";
let pontuacao = 0;
let intervaloJogo;

function desenharCobrinha() {
  ctx.fillStyle = " rgb(0, 253, 42)";
  cobrinha.forEach(bloco => {
    ctx.fillRect(bloco.x, bloco.y, tamanhoBloco, tamanhoBloco);
  });
}

function desenharComida() {
  ctx.fillStyle = " rgb(255, 0, 0)";
  ctx.fillRect(comida.x, comida.y, tamanhoBloco, tamanhoBloco);
}

function moverCobrinha() {
  const cabeca = { ...cobrinha[0] };

  if (direcao === "direita") cabeca.x += tamanhoBloco;
  if (direcao === "esquerda") cabeca.x -= tamanhoBloco;
  if (direcao === "baixo") cabeca.y += tamanhoBloco;
  if (direcao === "cima") cabeca.y -= tamanhoBloco;

  cobrinha.unshift(cabeca);

  if (cabeca.x === comida.x && cabeca.y === comida.y) {
    pontuacao++;
    gerarComida();
  } else {
    cobrinha.pop();
  }
}

function gerarComida() {
  comida = {
    x: Math.floor(Math.random() * (canvas.width / tamanhoBloco)) * tamanhoBloco,
    y: Math.floor(Math.random() * (canvas.height / tamanhoBloco)) * tamanhoBloco
  };
}

function mudarDirecao(evento) {
  const tecla = evento.keyCode;

  if (tecla === 37 && direcao !== "direita") direcao = "esquerda";
  if (tecla === 38 && direcao !== "baixo") direcao = "cima";
  if (tecla === 39 && direcao !== "esquerda") direcao = "direita";
  if (tecla === 40 && direcao !== "cima") direcao = "baixo";

    // Barra de espaço para reduzir velocidade
    if (tecla === 32) {
        clearInterval(intervaloJogo); // Limpa o intervalo atual
        velocidade = 200; // Define a velocidade para o dobro (metade da velocidade original)
        intervaloJogo = setInterval(jogo, velocidade); // Inicia um novo intervalo com a velocidade reduzida
    }
}

function aumentarVelocidade(evento) {
    const tecla = evento.keyCode;

    if (tecla === 32) {
        clearInterval(intervaloJogo); // Limpa o intervalo atual
        velocidade = 100; // Define a velocidade para a velocidade original
        intervaloJogo = setInterval(jogo, velocidade); // Inicia um novo intervalo com a velocidade original
    }
}

function desenharJogo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  desenharComida();
  desenharCobrinha();
}

function jogo() {
  moverCobrinha();
  desenharJogo();

  // Verificar colisão com a borda
  const cabeca = cobrinha[0];
  if (cabeca.x < 0 || cabeca.x >= canvas.width || cabeca.y < 0 || cabeca.y >= canvas.height) {
    clearInterval(intervaloJogo);
    alert("Game Over! Pontuação: " + pontuacao);
    location.reload(); // Recarrega a página para reiniciar o jogo
  }

  // Verificar colisão com o próprio corpo
  for (let i = 1; i < cobrinha.length; i++) {
    if (cabeca.x === cobrinha[i].x && cabeca.y === cobrinha[i].y) {
      clearInterval(intervaloJogo);
      alert("Game Over! Pontuação: " + pontuacao);
      location.reload(); // Recarrega a página para reiniciar o jogo
    }
  }
}

gerarComida();
intervaloJogo = setInterval(jogo, velocidade);
document.addEventListener("keydown", mudarDirecao);
document.addEventListener("keyup", aumentarVelocidade);

const btnReduzirVelocidade = document.getElementById("btnReduzirVelocidade");
let velocidadeAtual = 100; // Velocidade inicial do jogo

btnReduzirVelocidade.addEventListener("click", function() {
  if (velocidadeAtual === 100) {
    velocidadeAtual = 200; // Metade da velocidade original
  } else {
    velocidadeAtual = 100; // Velocidade normal
  }
  clearInterval(intervaloJogo); // Limpa o intervalo atual
  intervaloJogo = setInterval(jogo, velocidadeAtual); // Inicia um novo intervalo com a velocidade atual
});