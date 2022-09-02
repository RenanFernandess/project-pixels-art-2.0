import { globalState } from './helpers/GlobalState.js';
import { saveBoard, KEY } from './helpers/SaveBoard.js';
import RenderLibrary from './helpers/RenderLibrary.js';
import RenderTrash from './helpers/RenderTrash.js';
import saveItem, { getSavedItem } from './helpers/storage.js';

const paletteContainer = document.getElementById('palette-container');
// const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const buttonClear = document.getElementById('clear-board');
const colorSelector = document.getElementById('box-new-color');
const inputColor = document.getElementById('new-color');
const buttonSave = document.getElementById('save-board');
const inputBoardSize = document.getElementById('board-size');
const setBoard = document.getElementById('generate-board');
const libraryContainer = document.getElementById('library-container');
const navOpitions = document.getElementById('nav-opitions');
// const searchBoardInput = document.getElementById('search-board');

// ------------------------------------------------------------------------------------------------------------------------------
// generic functions

const renderTrash = new RenderTrash();
const renderLibrary = new RenderLibrary();
globalState.createState(null, () => {
  renderLibrary.setUpdate();
  renderTrash.setUpdate();
});

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

const colored = ({ target: { classList, style } }) => {
  if (classList.contains('pixel')) {
    style.backgroundColor = selected().style.backgroundColor; 
}
};

const clearBoard = () => {
  const pixels = document.querySelectorAll('div#pixel-board .pixel');
  [...pixels].forEach(({ style }) => { style.backgroundColor = 'white'; });
};

const saveCurrentBoard = () => {
  const board = pixelBoard.innerHTML;
  saveItem('board', board);
};

const chargeBoard = () => {
  const board = getSavedItem('board');
  if (board) pixelBoard.innerHTML = board;
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

const showTrash = (currentLocation) => {
  if (currentLocation !== 'trash') {
    globalState.pushState({ currentLocation: 'trash' }, KEY);
  }
};

const showLibrary = (currentLocation) => {
  if (currentLocation !== 'library') {
    globalState.pushState({ currentLocation: 'library' }, KEY);
  }
};

// library render
// -------------------------------------------------------------------------------------------------------------------------------
// library filtering

// const searchBoard = ({ target: { value } }) => {
//   console.log('ok');
// };

// const filterBoardList = () => { };

// library filtering
// -------------------------------------------------------------------------------------------------------------------------------
// events

const paletteContainerEvents = ({ target: { classList, id } }) => {
  selectColor(classList);
  if (id === 'news-colors') colorAdd();
};

const exchangeBoardInLibrary = ({ id }, currentLocation) => {
  if (currentLocation === 'library') {
    if (id === 'next-list') renderLibrary.nextListOfBoard();
    if (id === 'previous-list') renderLibrary.previousListOfBoard();
  }
};

const libraryContainerEvent = ({ target }) => {
  const { currentLocation } = globalState.getState(({ library }) => library);
  exchangeBoardInLibrary(target, currentLocation);
};

const navOpitionsEvents = ({ target }) => {
  const { currentLocation } = globalState.getState(({ library }) => library);
  if (target.id === 'trash') showTrash(currentLocation);
  if (target.id === 'library') showLibrary(currentLocation);
};

const events = () => {
  paletteContainer.addEventListener('click', paletteContainerEvents);
  pixelBoard.addEventListener('click', colored);
  buttonClear.addEventListener('click', clearBoard);
  inputColor.addEventListener('input', selectNewColor);
  buttonSave.addEventListener('click', saveCurrentBoard);
  setBoard.addEventListener('click', createPixelBoard);
  libraryContainer.addEventListener('click', libraryContainerEvent);
  navOpitions.addEventListener('click', navOpitionsEvents);
  window.addEventListener('resize', renderLibrary.resetList);
  // searchBoardInput.addEventListener('input', searchBoard);
};

window.onload = () => {
  chargeBoard();
  colorAdd();
  events();
};
