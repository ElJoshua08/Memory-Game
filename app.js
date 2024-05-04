// Elementos
let creatingGame = false;
// Columns And rows
let grid = [4, 6];
let initialGrid = [...grid];
let cardContentArray = Array.from({ length: 20 }, (_, index) => index + 1);
let $board = document.getElementById('board');
let $mainMenu = document.querySelector('.main-menu');
let $game = document.querySelector('.game');
let $root = document.querySelector(':root');
let styles = getComputedStyle(document.documentElement);

// Variables
let activeCards = [];

// Función para seleccionar n elementos aleatorios de un array
function selectRandomElements(arr, n) {
  if (n > arr.length) {
    throw new Error('n must be less than or equal to the length of the array');
  }

  const result = new Array(n);
  const arrLength = arr.length;
  let remainingElements = arrLength;

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * remainingElements);
    result[i] = arr[randomIndex];
    arr.splice(randomIndex, 1);
    remainingElements--;
  }

  return result;
}

// Función para barajar un array utilizando el algoritmo Fisher-Yates
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funcion para checkear la victoria
function checkWin() {
  let $board = document.getElementById('board');
  let $cards = $board.querySelectorAll('.card');
  let cardsArray = Array.from($cards);

  if (cardsArray.every((c) => c.classList.contains('correct'))) {
    let $gameWin = document.getElementById('gameWin');

    setTimeout(() => {
      $gameWin.classList.add('active');
    }, 300);
  }
}

// Función para manejar el evento de clic en una carta
function cardClick(card) {
  if (
    !activeCards.find((c) => {
      return c.id == card.id;
    }) &&
    activeCards.length <= 1
  ) {
    activeCards.push(card);
    card.classList.add('active');
  } else {
    card.classList.remove('active');
    activeCards.splice(activeCards.indexOf(card), 1);
  }

  if (activeCards.length == 2) {
    if (activeCards.every((c) => c.dataset.content == card.dataset.content)) {
      activeCards.forEach((c) => {
        setTimeout(() => {
          let $cardBack = c.querySelector('.card-back');
          $cardBack.style.background = `${styles.getPropertyValue(
            '--primary'
          )} url(Images/fruits/${c.dataset.content}.png)`;
          $cardBack.style.backgroundSize = 'cover';
          $cardBack.style.backgroundPosition = 'center';

          c.classList.add('correct');

          checkWin();
        }, 250);
        activeCards = [];
      });
    } else {
      activeCards.forEach((c) => {
        setTimeout(() => {
          c.style.animation = 'wrongCard 250ms linear forwards';
          setTimeout(() => {
            c.classList.remove('active');
            c.style.animation = '';
            activeCards = [];
          }, 500);
        }, 350);
      });
    }
  }
}

let $restartGameButton = document.getElementById('restart');
let $startGameButton = document.getElementById('start');

$startGameButton.addEventListener('click', () => startGame());
$restartGameButton.addEventListener('click', () => restartGame());

function startGame() {
  if (creatingGame) return;
  creatingGame = true;

  let gridSize = grid[0] * grid[1];

  // Calculate the size of the cards
  let cardSize = calculateCardSize(grid);

  // Set the card size as a CSS variable
  $root.style.setProperty('--card-size', cardSize + 'px');

  let cardPairs = selectRandomElements(cardContentArray, gridSize / 2);
  cardPairs = cardPairs.concat(cardPairs);
  cardPairs = shuffleArray(cardPairs);

  let pairIndex = 0;

  for (let row = 0; row < grid[0]; row++) {
    let $row = document.createElement('div');
    $row.classList.add('row');

    for (let col = 0; col < grid[1]; col++) {
      let $card = document.createElement('div');
      $card.classList.add('card');

      let content = cardPairs[pairIndex];
      $card.dataset.content = content;
      $card.classList.add(`content-${content}`);

      pairIndex++;

      $row.appendChild($card);
    }

    $board.appendChild($row);
  }

  let $cards = $board.querySelectorAll('.card');

  $cards.forEach((c, i) => {
    let $cardFront = document.createElement('div');
    $cardFront.classList.add('card-front');
    let $cardBack = document.createElement('div');
    $cardBack.classList.add('card-back');

    let secondaryDarker = styles.getPropertyValue('--secondary-darker');

    $cardBack.style.background = `${secondaryDarker} url(Images/fruits/${c.dataset.content}.png)`;
    $cardBack.style.backgroundSize = 'cover';
    $cardBack.style.backgroundPosition = 'center';

    c.appendChild($cardFront);
    c.appendChild($cardBack);

    c.addEventListener('click', (e) => {
      cardClick(c);
    });

    c.id = i;
  });

  setTimeout(() => {
    $mainMenu.classList.remove('active');
    setTimeout(() => {
      $mainMenu.style.display = 'none';
      $game.classList.add('active');
    }, 300);
  }, 300);
}

function calculateCardSize(grid) {
  // Obtenemos la altura de la pantalla
  let width = window.innerWidth;
  let aviableWidth = width * 0.9;
  let height = window.innerHeight;
  let aviableHeight = height * 0.9;
  let cardSize;

  // Calculamos el número de filas y columnas basado en la cuadrícula proporcionada
  let numRows = grid[0];
  let numColumns = grid[1];

  if (aviableWidth > aviableHeight) {
    cardSize = aviableWidth / numColumns;
    if (cardSize * numRows > height) {
      cardSize = aviableHeight / numRows;
    }
  } else {
    cardSize = aviableHeight / numRows;
    if (cardSize * numColumns > width) {
      cardSize = aviableWidth / numColumns;
    }
  }

  console.log(cardSize);

  return cardSize;
}

window.addEventListener('resize', () => {
  // Calculate the size of the cards
  let cardSize = calculateCardSize(grid);

  // Set the card size as a CSS variable
  $root.style.setProperty('--card-size', cardSize + 'px');
});
