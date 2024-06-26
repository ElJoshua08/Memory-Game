// Make each letter of the title animate in
function enhanceTitle() {
  let $title = document.querySelector('.title');
  let splitTitle = $title.innerText.split('');
  $title.innerHTML = '';

  splitTitle.forEach((letter, index) => {
    let $letter = document.createElement('span');
    $letter.innerText = letter;

    $letter.style.transform = 'translateY(-200px)';

    $title.appendChild($letter);
  });
}

function animateTitle() {
  enhanceTitle()

  let $title = document.querySelector('.title');
  let $letters = $title.querySelectorAll('span');

  $letters.forEach((letter, index) => {
    letter.style.animation = `fadeInDown 0.5s ease-in-out ${
      index * 0.2
    }s forwards`;
  });
}

window.addEventListener('load', () => {
  animateTitle();
});
