import { globalState } from './helpers/GlobalState.js';
import { saveBoard } from './helpers/SaveBoard.js';
import RenderLibrary from './helpers/RenderLibrary.js';
import PixelBoard from './helpers/PixelBoard.js';
import {
  BUTTON_CLEAR,
  BUTTON_SET_BOARD,
  COLORS_DIV,
  INPUT_BOARD_SIZE,
  INPUT_COLOR,
  INPUT_COLOR_CONTAINER,
  LIBRARY, NAV_OPITIONS,
  PALETTE_CONTAINER,
  PIXEL_BOARD,
} from './services/constants.js';

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

const colorAdd = () => [...COLORS_DIV].map(({ style }) => {
  if (style.backgroundColor !== 'black') style.backgroundColor = colorGenerator();
});

const selectColor = (classList) => {
  if (classList.contains('color') || classList.contains('color-input')) {
    selected().classList.remove('selected');
    classList.add('selected');
  }
};

const colorSelectorAddcolor = (value) => { INPUT_COLOR_CONTAINER.style.background = value; };

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
  PIXEL_BOARD.appendChild(element);
};

const createPixelBoard = () => {
  PIXEL_BOARD.innerHTML = '';
  const value = Number(INPUT_BOARD_SIZE.value);
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
  PALETTE_CONTAINER.addEventListener('click', paletteContainerEvents);
  BUTTON_CLEAR.addEventListener('click', clearBoard);
  INPUT_COLOR.addEventListener('input', selectNewColor);
  BUTTON_SET_BOARD.addEventListener('click', createPixelBoard);
  NAV_OPITIONS.addEventListener('click', navOpitionsEvents);
};

window.onload = () => {
  colorAdd();
  events();
};
