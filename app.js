// TODO: Change the grid size depending on the range input
let gridSize = 2;

let $gridSizeInput = document.getElementById('gridSizeInput');
let $gridSize = document.querySelector('.grid-size');
let $startGameButton = document.getElementById('startGameButton');
let $root = document.querySelector(':root');

function mapValue(value, fromMin, fromMax, toMin, toMax) {
  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;
  const scaleFactor = toRange / fromRange;
  return toMin + (value - fromMin) * scaleFactor;
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
