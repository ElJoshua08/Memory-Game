let gridSize = 2;

let $gridSizeInput = document.getElementById('gridSizeInput');
let $gridSize = document.querySelector('.grid-size');
let $startGameButton = document.getElementById('startGameButton');
let $root = document.querySelector(':root');

let cardContentArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
]


function mapValue(value, fromMin, fromMax, toMin, toMax) {
  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;
  const scaleFactor = toRange / fromRange;
  return toMin + (value - fromMin) * scaleFactor;
}

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

$gridSizeInput.addEventListener('input', (e) => {
  //? 40 Is the max of the input value, 6 its the max grid size
  gridSize = Math.floor(mapValue(e.target.value, 2, 40, 2, 6));

  $gridSize.innerHTML = `${gridSize} <span>x</span> ${gridSize}`;
  $root.style.setProperty('--grid-size', gridSize);
});

$startGameButton.addEventListener('click', () => {
  createGame();
  console.log('creating game');
});

function cardClick(card) {
  card.classList.toggle('active');
}

function createGame() {
  let $board = document.getElementById('board');
  let $mainMenu = document.querySelector('.main-menu');
  let $game = document.querySelector('.game');

  for (let row = 0; row < gridSize; row++) {
    let $row = document.createElement('div');
    $row.classList.add('row');
    for (let col = 0; col < gridSize; col++) {
      let $card = document.createElement('div');
      $card.classList.add('card');

      $row.appendChild($card);
    }

    $board.appendChild($row);
  }

  $cards = $board.querySelectorAll('.card');

  $cards.forEach((c, i) => {
    let $cardFront = document.createElement('div');
    $cardFront.classList.add('card-front');
    let $cardBack = document.createElement('div');
    $cardBack.classList.add('card-back');

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
