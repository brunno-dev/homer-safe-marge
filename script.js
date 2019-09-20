//CRIA O CONTEXTO E FAZ AJUSTES NAS DIMENSÕES DO CANVAS
//iniciar o contexto canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.65
canvas.height = window.innerHeight * 0.77


//CLASSES CRIADAS PARA OS OBJETOS DO JOGO
class Player {
  constructor(img) {
    this.moveRight = this.moveLeft = this.moveDown = this.moveUp = this.fight = false;
    this.sourceX = this.sourceY = 0;
    this.width = 40;
    this.height = 71;
    this.x = 50;
    this.y = 240;
    this.img = img;
    this.speed = 10;
    this.health = 100;
    this.strength = 5;
  }
  //desenhar o contexto da imagem do Player criado, com base nos parâmetros abaixo
  draw() {
    ctx.drawImage(this.img, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, 60, 105);
  }
  // comandos de movimento do Player, com todas as trocas de sprites
  move() {
    //arrays com o "corte" da posição X dos sprites de movimento 
    let fightSprites = [60.5, 60.5, 163, 113, 9, 662, 60.5, 60.5, 60.5];
    // let leftSprites = [667, 614, 568, 525, 476, 667, 667]
    let upDownSprites = [184, 184, 236, 334, 377, 470, 184]
    //função que será utilizada para randomizar os sprites
    let spriteRandom = Math.floor(Math.random() * 6);

    //para a direção "direita", existe uma ordem de sprites, implementada abaixo com switch; RIGHT
    if (frames % 3 === 0) {
      if (this.moveRight && this.x < 955 - (this.width * 1.25)) {
        this.x += (this.speed);
        switch (this.sourceX) {
          case 0:
            this.sourceX = 184;
            this.sourceY = 0;
            break;
          case 713:
            this.sourceX = 184;
            this.sourceY = 0;
            break;
          case 184:
            this.sourceX = 236;
            break;
          case 236:
            this.sourceX = 334;
            break;
          case 334:
            this.sourceX = 377;
            break;
          case 377:
            this.sourceX = 470;
            break;
          default:
            this.sourceX = 0;
            break;
        }
      } //para a "esquerda" tem um sprite randômico; LEFT
      if (this.moveLeft && this.x > (this.width - 50)) {
        this.x -= (this.speed)
        switch (this.sourceX) {
          case 713:
            this.sourceX = 667;
            this.sourceY = 72;
            break;
          case 667:
            this.sourceX = 614;
            this.sourceY = 72;
            break;
          case 614:
            this.sourceX = 568;
            this.sourceY = 72;
            break;
          case 568:
            this.sourceX = 525;
            this.sourceY = 72;
            break;
          case 525:
            this.sourceX = 476;
            this.sourceY = 72;
            break;
          case 476:
            this.sourceX = 433;
            this.sourceY = 72;
            break;
          default:
            this.sourceX = 713;
            this.sourceY = 72;
            break;
        }
      }
      //para "baixo" tem um sprite randômico; DOWN
      if (this.moveDown && this.y < 480 - (this.height * 1.50)) {
        this.y += this.speed;
        this.sourceX = upDownSprites[spriteRandom];
        this.sourceY = 0;
      } //para "cima" tem um sprite randômico; UP
      if (this.moveUp && this.y > this.height + 20) {
        this.y -= this.speed;
        this.sourceX = upDownSprites[spriteRandom];
        this.sourceY = 0;
      } //Sprites randômicos para o fight; SPACE
      if (this.fight) {
        this.sourceX = fightSprites[spriteRandom];
        this.sourceY = 158;
      }
      if (bartDark.stateCrash && !this.fight) {
        damageHomer.play();
        this.x -= 10;
        this.health -= 5;
        this.sourceX = 13;
        this.sourceY = 2040;
      }
      if (bartDark.stateCrash && this.fight) {
        punchTwoSound.play()
      }
      if (this.health <= 0) {
        GAMEOVER = true;
      }

    }
  }
  attack() {
    if (this.fight && this.stateFight === false) {
      this.stateFight = true;
      Enemy.health - 5
      this.score += 5;
    }
  }
  crashPlayer() {
    if (this.x + this.width > Enemy.x && this.x < Enemy.x + Enemy.width && this.y + this.height > Enemy.y && this.y < Enemy.y + Enemy.height) {
      return console.log("bateu no fantasma")
    }
  }

}

class Familymarge {
  constructor(width, height, x, y, img) {
    this.moveRight = this.moveLeft = this.moveDown = this.moveUp = this.fight = false;
    this.sourceX = this.sourceY = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = img;
  }
  draw() {
    ctx.drawImage(this.img, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, 80, 160);
  }
  move() {
    if (frames % 10 === 0) {
      let arrMarge = [0, 41, 0, 41, 0, 0, 0]
      let spriteRandom = Math.floor(Math.random() * arrMarge.length)
      if (homer.fight) {
        this.sourceX = arrMarge[spriteRandom];
      }
    }
  }
}

class Duff {
  constructor(width, height, x, y, img) {
    this.sourceX = this.sourceY = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = img;
  }
  draw() {
    ctx.drawImage(this.img, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, 70, 40);
  }
}

class Life {
  constructor(width, height, x, y, img) {
    this.moveRight = this.moveLeft = this.moveDown = this.moveUp = this.fight = false;
    this.sourceX = 30;
    this.sourceY = 10;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = img;
  }
  draw() {
    ctx.drawImage(this.img, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, 110, 120);
  }
  move() {
    if (homer.health < 70 && homer.health > 50) {
      this.sourceX = 160;
    }
    if (homer.health < 20) {
      this.sourceX = 288;
    }
  }
}

class BackgroundImage {
  constructor(img) {
    this.img = img;
    this.x = 0;
    this.speed = 1.5;
  }

  move() {
    if (homer.moveRight) {
      // this.x -= this.speed;
      // this.x %= canvas.width;x
    }
  }

  draw() {
    ctx.drawImage(this.img, this.x, 0);
    // if (this.speed < 0) {
    //   ctx.drawImage(this.img, this.x - img.width, 0);
    // } else {
    //   ctx.drawImage(this.img, this.x + img.width, 0);
    // }
  }
};

class Enemy {
  constructor(img) {
    this.sourceX = 791;
    this.sourceY = 192;
    this.width = 40;
    this.height = 71;
    this.x = 1000;
    this.y = Math.floor(Math.random() * (400 - 100)) + 100;
    this.img = img;
    this.speed = 4;
    this.health = 30;
    this.attack = 5;
    this.stateCrash = false;
  }

  //desenhar o contexto da imagem do Player criado, com base nos parâmetros abaixo
  draw() {
    ctx.drawImage(this.img, this.sourceX, this.sourceY, 60, this.height, this.x, this.y, 60, 105);
  }
  //comandos de movimento do Player, com todas as trocas de sprites
  move() {
    if (frames % 3 === 0) {
      let fly = [657, 724, 657, 657, 657, 657]
      let spriteRandom = Math.floor(Math.random() * fly.length);
      this.x -= this.speed;
      if (this.health > 15) {
        this.sourceX = fly[spriteRandom]
      } else {
        this.sourceX = 790;
      }
    }
  }
  checkEnemyCrash() {

    if (this.x + this.width > homer.x && this.x < homer.x + homer.width && this.y + this.height > homer.y && this.y < homer.y + homer.height) {
      return this.stateCrash = true;
    } else {
      this.stateCrash = false
    }
  }
}

class FinalEnemy {
  constructor(img) {
    this.sourceX = 0;
    this.sourceY = 0;
    this.width = 50;
    this.height = 71;
    this.x = 1000;
    this.y = 250;
    this.img = img;
    this.speed = 3;
    this.health = 200;
    this.attack = 5;
    this.stateCrash = false;
  }

  //desenhar o contexto da imagem do Player criado, com base nos parâmetros abaixo
  draw() {
    ctx.drawImage(this.img, this.sourceX, this.sourceY, 60, this.height, this.x, this.y, 100, 140);
  }
  //comandos de movimento do Player, com todas as trocas de sprites
  move() {
    let fly = [0, 58, 0, 112, 58, 0, 58]
    let flyDead = [285, 225, 285, 340, 0, 58, 112, 0, 0]
    let spriteRandom = Math.floor(Math.random() * fly.length);
    if (frames % 3 === 0) {
      this.x -= this.speed;
      if (this.health <= 100) {
        this.sourceX = flyDead[spriteRandom]
      } else {
        this.sourceX = fly[spriteRandom]
      }
    }
  }
  checkEnemyCrash() {

    if (this.x + this.width > homer.x && this.x < homer.x + homer.width && this.y + this.height > homer.y && this.y < homer.y + homer.height) {
      return this.stateCrash = true;
    } else {
      this.stateCrash = false
    }
  }
}

///FUNÇÕES QUE "RECEBEM" OS EVENTOS DAS TECLAS PRESSIONADAS 
//recebe e identifica o evento de tecla pressionada
window.addEventListener("keydown", keydownHandler)
//função que recebe a tecla pressionada e transforma em true. Com isso, gera o movimento da classe Player.
function keydownHandler(e) {
  switch (e.keyCode) {
    case UP:
      homer.moveUp = true;
      break;
    case DOWN:
      homer.moveDown = true;
      break;
    case LEFT:
      homer.moveLeft = true;
      break;
    case RIGHT:
      homer.moveRight = true;
      break;
    case SPACE:
      homer.fight = true;
      break;
    case ENTER:
      startSound.play()
      startSound.volume = 0.4;
      START = true;
      break;
    case P:
      levelOne.pause();
      if (!STATEPAUSE) {
        PAUSE = true;
        STATEPAUSE = true;
        pauseSound.play();
        ctx.drawImage(pauseImg, 370, 150, 180, 210)
        break;
      } else {
        PAUSE = false;
        STATEPAUSE = false;
        break;
      }
      case 16:
        if (stateFinal || GAMEOVER) {
          window.location.reload()
        }
        break;
  }
}
//recebe e identifica o evento de tecla que deixou de ser pressionada
window.addEventListener("keyup", keyupHandler)
//função que recebe o evento da tecla específica que deixou de ser pressionada(false). Com isso o Player fica parado.
function keyupHandler(e) {
  switch (e.keyCode) {
    case UP:
      homer.moveUp = false;
      homer.moveDown = false;
      homer.sourceX = 0;
      homer.sourceY = 0;
      break;
    case DOWN:
      homer.moveDown = false;
      homer.sourceX = 0;
      homer.sourceY = 0;
      homer.moveUp = false;
      break;
    case LEFT:
      homer.moveLeft = false;
      homer.moveRight = false;
      homer.sourceX = 713;
      homer.sourceY = 72;
      break;
    case RIGHT:
      homer.sourceX = 0;
      homer.sourceY = 0;
      homer.moveRight = false;
      homer.moveLeft = false;
      break;
    case SPACE:
      homer.fight = false;
      punchSound.pause();
      homer.stateFight = false
      homer.sourceX = 0;
      homer.sourceY = 0;
      break;
    case ENTER:
      LOADING = true
      break;
  }
}


//ESTADOS DO JOGO E INSTANCIAS CRIADAS
//Associa as keycodes das teclas em variáveis de movimento/ação.
const UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
  ENTER = 13,
  SPACE = 32;
  P = 80;

let START = LOADING = GAMEOVER = PAUSE = false;
let STATEGAME = false;
let STATEPAUSE = false;

let frames = 0;
let counterEnemy = 0;
let tankGhost = [];
let tankGhostDead = [];
let crashed = nextEnemy = enemyAgain = finalGame = stateVictoryGame = stateImg = stateGameOverSound = stateFinal = false;

//cria a imagem e objeto do player
const playerOne = new Image()
playerOne.src = 'images/homer.png'
const homer = new Player(playerOne);

//cria a imagem e objetos de background
const img = new Image();
img.src = "images/scene.png";
let imgBackground = new BackgroundImage(img)

const imgOne = new Image();
imgOne.src = "images/scene - night.png";
let imgBackgroundOne = new BackgroundImage(imgOne)

const imgTwo = new Image();
imgTwo.src = "images/scene - night2.png";
let imgBackgroundTwo = new BackgroundImage(imgTwo)

const imgTree = new Image();
imgTree.src = "images/scene - night3.png";
let imgBackgroundTree = new BackgroundImage(imgTree)

const imgIntro = new Image()
imgIntro.src = "images/seriesList2.png"

const pauseImg = new Image()
pauseImg.src = "images/Homer_pause.png"

const imgVictory = new Image();
imgVictory.src = "images/victory.png"

const gameOverImg = new Image();
gameOverImg.src = 'images/gameOver.png'

const duff = new Image();
duff.src = 'images/duff.png'
const duffImg = new Duff(duff.width, duff.height, 80, 250, duff)

const life = new Image();
life.src = 'images/life.png'
const lifeImg = new Life(100, 120, 750, 10, life)

//cria a imagem e objeto inimigo
const enemyOne = new Image()
enemyOne.src = 'images/all-cut.png'

const margeImage = new Image()
margeImage.src = 'images/margie.png'
const marge = new Familymarge(50, 100, -5, 200, margeImage);

const enemyTwo = new Image()
enemyTwo.src = 'images/FinalEnemy.png'
let bartDark = new FinalEnemy(enemyTwo)



//sons do jogo
const pauseSound = new Audio('sounds/audio/Pause Sound.m4a');

const levelOne = new Audio('sounds/audio/129-Stage 1 - (Downtown Springfield).wav')

const introSound = new Audio('sounds/audio/01-simpsons-theme-song.mp3')

const nextEnemySound = new Audio('sounds/audio/40_Mr_ Burns 3.mp3')

const endGameSound = new Audio('sounds/audio/139-Ending & Credits.wav');

const startSound = new Audio('sounds/audio/start.mp3');

const gameOverSound = new Audio('sounds/audio/43-game-over.mp3');

const punchSound = new Audio('sounds/audio/Whoosh Punch Sound Effect Series.m4a');

const punchTwoSound = new Audio('sounds/audio/Punch Sound Effect.m4a');

const victorySound = new Audio('sounds/audio/victory.mp3');

const damageHomer = new Audio('sounds/audio/Homer Simpson Doh Sound FX.m4a')

//FUNÇÕES QUE CONTROLAM AÇÕES COM BASE EM ESTADOS DO JOGO
//Função que controla as ações dos fantasmas e do último inimigo.

window.onload = function () {
  introSound.play()
}

function updateEnemy() {
  if (START || LOADING) {
    if (tankGhost.length >= 0) {
      for (i = 0; i < tankGhost.length; i++) {
        tankGhost[i].move();
        tankGhost[i].draw();
        if (tankGhost[i].stateCrash && homer.fight) {
          tankGhost[i].health -= 3
          tankGhost[i].x += 10
          punchSound.pause()
          punchTwoSound.play()
        }
        if (!tankGhost[i].stateCrash && homer.fight) {
          punchSound.play()
        }
        if (tankGhost[i].stateCrash && !homer.fight) {
          homer.x -= 10;
          homer.health -= 3;
          homer.sourceX = 10;
          homer.sourceY = 2040;
          damageHomer.play();
        }
        if (tankGhost[i].x < homer.x && tankGhost[i].x < 150) {
          tankGhost[i].y = 250;
        }
        if (tankGhostDead.length >= 2) {
          tankGhost[i].speed += 0.1;
        }
        if (tankGhost[i].x <= 25) {
          GAMEOVER = true;
        }
        if (tankGhost[i].health <= 0) {
          let ghostDead = tankGhost.splice(i, 1);
          tankGhostDead.push(ghostDead)
        }
      }
      if (bartDark.stateCrash && homer.fight) {
        bartDark.health -= 5;
        bartDark.x += 15;
        bartDark.speed += 0.3;
      }
      if (bartDark.x < homer.x && bartDark.x < 150) {
        bartDark.y = 250;
      }
      if (bartDark.health <= 0 && !enemyAgain) {
        bartDark.x = 1300;
        bartDark.health = 100;
        bartDark.speed = 30;
        bartDark.y = Math.floor(Math.random() * (400 - 100)) + 100;
        enemyAgain = true;
      }
      if (bartDark.health <= 0 && enemyAgain) {
        bartDark.x = -100;
        finalGame = true;
        nextEnemy = false;
      }
      if (finalGame && homer.x === 80) {
        stateFinal = true;
      }
      counterEnemy += 1;
    }
    if (tankGhostDead.length < 11)
      if (counterEnemy % 150 === 0) {
        tankGhost.push(new Enemy(enemyOne))
        counterEnemy = 0;
      } if (tankGhostDead.length > 2 && tankGhost.length === 0) {
      nextEnemy = true;
    }
    if (bartDark.x <= 25 && bartDark.x > 0) {
      GAMEOVER = true;
    }
    crashed = tankGhost.some(item => item.checkEnemyCrash())
  }
}


//Função que controla a entrada e saída da maioria dos sons do jogo
function sounds() {
  if (START && LOADING) {
    introSound.pause()
  }
  if (START) {
    levelOne.play();
  }
  if (homer.fight) {
    levelOne.volume = 0.8;
  } else {
    levelOne.volume = 1;
  }
  if (nextEnemy) {
    levelOne.pause();
    nextEnemySound.play();
  }
}

//Função que desenha com a condição de frames
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // if (STATEPAUSE === false) {
  //   ctx.drawImage(pauseImg, 450, 250, 180, 880)
  // }
  if (!START && !LOADING) {
    ctx.drawImage(imgIntro, 0, 0, canvas.width, canvas.height)
  }
  if (START && LOADING && !nextEnemy) {
    imgBackground.draw();
  }
  if (START && LOADING && nextEnemy) {
    imgBackgroundTwo.draw();
  }
  if (START || LOADING) {
    homer.draw();
    marge.draw();
    lifeImg.draw();
    if (nextEnemy) {
      bartDark.draw()
      bartDark.move()
    }
  }
  if (finalGame) {
    imgBackground.draw();
    duffImg.draw();
    homer.draw();
    marge.draw();
  }
}

//função "motor", que inicia todas as outras funções e renderizações do jogo com condições
function startRender() {
  if (!GAMEOVER) { //Se o estado não for GAMEOVER ele executa toda a função
    if (!STATEPAUSE) { //se o estado não for PAUSE, ele executa todas as ações do bloco
      homer.move();
      marge.move()
      lifeImg.move();
      bartDark.checkEnemyCrash()
      homer.attack();
      draw();
      frames += 1;
      homer.crashPlayer();
      updateEnemy();
      if (!finalGame) {
        sounds()
      } else {
        nextEnemySound.pause();
      }
    }
  }
  if (GAMEOVER) { //se o estado GAMEOVER for true, ele faz apenas executa apenas este bloco
    ctx.drawImage(gameOverImg, 0, 0, canvas.width, canvas.height)
    levelOne.pause();

    nextEnemySound.pause()
    if (!stateGameOverSound) {
      stateGameOverSound = true;
      gameOverSound.play()
    }
  } else {
    gameOverSound.pause();
  }
  if (finalGame) {
    levelOne.play();
  }

  if (stateFinal) {
    ctx.drawImage(imgVictory, 0, 0, canvas.width, canvas.height);
    levelOne.pause();
    if (!stateVictoryGame) {
      victorySound.play();
      stateVictoryGame = true;
    } else {
      stateVictoryGame.pause();
    }

  }
  requestAnimationFrame(startRender);
}

requestAnimationFrame(startRender)