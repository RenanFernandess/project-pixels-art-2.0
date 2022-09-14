import { globalState } from './helpers/GlobalState.js';
import { saveBoard } from './helpers/SaveBoard.js';
import RenderLibrary from './helpers/RenderLibrary.js';
import PixelBoard from './helpers/PixelBoard.js';
import {
  COLORS_DIV,
  INPUT_COLOR,
  INPUT_COLOR_CONTAINER,
  LIBRARY, NAV_OPITIONS,
  PALETTE_CONTAINER,
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
  INPUT_COLOR.addEventListener('input', selectNewColor);
  NAV_OPITIONS.addEventListener('click', navOpitionsEvents);
};

window.onload = () => {
  colorAdd();
  events();
};
