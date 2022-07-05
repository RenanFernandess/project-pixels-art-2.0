const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');

const colorGenerator = () => {
  const r = Math.round(Math.random() * 250);
  const g = Math.round(Math.random() * 250);
  const b = Math.round(Math.random() * 250);
  return `rgb(${r}, ${g}, ${b})`;
};

const colorAdd = () => [...colors].map(({ style }) => {
  if (style.backgroundColor !== 'black') style.backgroundColor = colorGenerator();
});

// chama functions
colorAdd();
