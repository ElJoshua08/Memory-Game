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

let activeCards = [];

// Función para manejar el evento de clic en una carta
function cardClick(card) {
  if (
    !activeCards.find((c) => {
      return c.id == card.id;
    })
  ) {
    activeCards.push(card);
    card.classList.add('active');
  } else {
    card.classList.remove('active');
    activeCards.splice(activeCards.indexOf(card), 1);
  }

  if (activeCards.length === 2) {
    if (activeCards.every((c) => c.dataset.content == card.dataset.content)) {
    } else {
      activeCards.forEach((c) => {
        setTimeout(() => {
          c.style.animation = 'wrongCard .3s linear forwards';
          setTimeout(() => {
            c.classList.remove('active');
            c.style.animation = '';
          }, 800);
        }, 350);
      });

      activeCards = [];
    }
  }
}

function setRangeSlider($gridSizeInput) {
  const percent =
    ($gridSizeInput.value - $gridSizeInput.min) /
    ($gridSizeInput.max - $gridSizeInput.min);

  let completeColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary');
  let notCompleteColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--secondary-darker');
  let color = `linear-gradient(to right, ${completeColor} ${
    percent * 100
  }%, ${notCompleteColor} ${percent * 100}%)`;

  $gridSizeInput.style.background = color;
}

// Función para crear el juego de memoria
function createGame() {
  let creatingGame = false;
  let gridSize = 2;
  let cardContentArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let $board = document.getElementById('board');
  let $mainMenu = document.querySelector('.main-menu');
  let $game = document.querySelector('.game');
  let $gridSizeInput = document.getElementById('gridSizeInput');
  let $gridSizeElement = document.querySelector('.grid-size');
  let $root = document.querySelector(':root');
  let $startGameButton = document.getElementById('startGameButton');

  // Actualizar el tamaño del tablero cuando cambia el valor del input
  $gridSizeInput.addEventListener('input', (e) => {
    gridSize = e.target.value;
    $gridSizeElement.innerHTML = `${gridSize} <span>x</span> ${gridSize}`;
    $root.style.setProperty('--grid-size', gridSize);
    setRangeSlider($gridSizeInput);
  });

  // Inicializar el juego cuando se hace clic en el botón de iniciar juego
  $startGameButton.addEventListener('click', () => {
    if (creatingGame) return;

    creatingGame = true;

    let cardPairs = selectRandomElements(cardContentArray, gridSize ** 2 / 2);
    cardPairs = cardPairs.concat(cardPairs);
    cardPairs = shuffleArray(cardPairs);

    let pairIndex = 0;

    for (let row = 0; row < gridSize; row++) {
      let $row = document.createElement('div');
      $row.classList.add('row');
      for (let col = 0; col < gridSize; col++) {
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

      let secondaryDarker = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--secondary-darker');


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
  });
}

// Iniciar el juego al cargar la página
createGame();
