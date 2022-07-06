const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const buttonClear = document.getElementById('clear-board');

const selected = () => document.querySelector('.selected');

const colorGenerator = () => {
  const r = Math.round(Math.random() * 250);
  const g = Math.round(Math.random() * 250);
  const b = Math.round(Math.random() * 250);
  return `rgb(${r}, ${g}, ${b})`;
};

const colorAdd = () => [...colors].forEach(({ style }) => {
  if (style.backgroundColor !== 'black') style.backgroundColor = colorGenerator();
});

const selectColor = ({ target: { classList } }) => {
  if (classList.contains('color')) {
    selected().classList.remove('selected');
    classList.add('selected');
  };
};

const colored = ({ target: { classList, style } }) => {
  if (classList.contains('pixel')) style
    .backgroundColor = selected().style.backgroundColor;
};

const clearBoard = () => [...pixels].map(({ style }) => { style.backgroundColor = 'white'; });

const events = () => {
  colorPalette.addEventListener('click', selectColor)
  pixelBoard.addEventListener('click', colored);
  buttonClear.addEventListener('click', clearBoard);
};

// chama functions
colorAdd();
events();
