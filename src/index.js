import { globalState } from './helpers/GlobalState.js';
import { LIBRARY, saveBoard } from './helpers/SaveBoard.js';
import RenderLibrary from './helpers/RenderLibrary.js';
import PixelBoard from './helpers/PixelBoard.js';

const paletteContainer = document.getElementById('palette-container');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const buttonClear = document.getElementById('clear-board');
const colorSelector = document.getElementById('box-new-color');
const inputColor = document.getElementById('new-color');
const inputBoardSize = document.getElementById('board-size');
const setBoard = document.getElementById('generate-board');
const navOpitions = document.getElementById('nav-opitions');

// ------------------------------------------------------------------------------------------------------------------------------
// generic functions

const selected = () => document.querySelector('.selected');

// generic functions
// --------------------------------------------------------------------------------------------------------------------------
// color palet

const colorGenerator = () => {
  const [r, g, b] = Array(3).fill(0).map(() => Math.round(Math.random() * 250));
  return `rgb(${r}, ${g}, ${b})`;
};

const colorAdd = () => [...colors].map(({ style }) => {
  if (style.backgroundColor !== 'black') style.backgroundColor = colorGenerator();
});

const selectColor = (classList) => {
  if (classList.contains('color') || classList.contains('color-input')) {
    selected().classList.remove('selected');
    classList.add('selected');
  }
};

const colorSelectorAddcolor = (value) => { colorSelector.style.background = value; };

const selectedAddNewColor = (value) => {
  const { style } = selected();
  style.backgroundColor = value;
};

const selectNewColor = ({ target: { value } }) => {
  colorSelectorAddcolor(value);
  selectedAddNewColor(value);
};

// color palet
// ------------------------------------------------------------------------------------------------------------------------------
// pixel board opitions

const clearBoard = () => {
  const pixels = document.querySelectorAll('div#pixel-board .pixel');
  [...pixels].forEach(({ style }) => { style.backgroundColor = 'white'; });
};

const createPixelDiv = async (value) => {
  const element = document.createElement('div');
  element.classList.add('display');
  element.innerHTML = Array(value).fill('<div class="pixel"></div>')
    .reduce((HTML, element) => HTML += element);
  pixelBoard.appendChild(element);
};

const createPixelBoard = () => {
  pixelBoard.innerHTML = '';
  const value = Number(inputBoardSize.value);
  for (let index = 1; index <= value; index += 1) {
    createPixelDiv(value);
  }
};

// pixel board opitions
// -------------------------------------------------------------------------------------------------------------------------
// library render

const pixelBoardRender = new PixelBoard();
const renderLibrary = new RenderLibrary();

globalState.createState(null, () => {
  renderLibrary.setUpdate();
  saveBoard.setUpdate();
  pixelBoardRender.setUpdate();
});

const showTrash = (currentLocation) => {
  if (currentLocation !== 'trash') {
    globalState.pushState(
      { currentLocation: 'Lixeira', currentList: 'trash', favorites: false }, 
      LIBRARY,
    );
  }
};

const showLibrary = (currentLocation) => {
  if (currentLocation !== 'library') {
    globalState.pushState(
      { currentLocation: 'Biblioteca', currentList: 'boardList', favorites: false },
      LIBRARY,
    );
  }
};

const showFavorites = (currentLocation) => {
  if (currentLocation !== 'favorites') {
    globalState.pushState(
      { currentLocation: 'Favoritos', currentList: 'boardList', favorites: true },
      LIBRARY,
    );
  }
};

const navOpitionsEvents = ({ target }) => {
  const { currentLocation } = globalState.getState(({ library }) => library);
  if (target.id === 'trash') showTrash(currentLocation);
  if (target.id === 'library') showLibrary(currentLocation);
  if (target.id === 'favorites') showFavorites(currentLocation);
};

// library render
// -------------------------------------------------------------------------------------------------------------------------------
// events

const paletteContainerEvents = ({ target: { classList, id } }) => {
  selectColor(classList);
  if (id === 'news-colors') colorAdd();
};

const events = () => {
  paletteContainer.addEventListener('click', paletteContainerEvents);
  // pixelBoard.addEventListener('click', colored);
  buttonClear.addEventListener('click', clearBoard);
  inputColor.addEventListener('input', selectNewColor);
  setBoard.addEventListener('click', createPixelBoard);
  navOpitions.addEventListener('click', navOpitionsEvents);
};

window.onload = () => {
  colorAdd();
  events();
};
