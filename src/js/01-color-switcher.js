function getRandowHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

// console.log(startBtn);

let timer = null;

startBtn.addEventListener('click', event => {
  timer = setInterval(
    () => (body.style.backgroundColor = getRandowHexColor()),
    1000
  );
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', event => {
  clearInterval(timer);
  startBtn.disabled = false;
});
