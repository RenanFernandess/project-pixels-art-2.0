const paletteContainer = document.getElementById('palette-container');
const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const buttonClear = document.getElementById('clear-board');
const colorSelector = document.getElementById('box-new-color');
const inputColor = document.getElementById('new-color');
const buttonSave = document.getElementById('save-board');
const inputBoardSize = document.getElementById('board-size');
const setBoard = document.getElementById('generate-board');
const buttonSaveAs = document.getElementById('save-board-as');
const inputBoardName = document.getElementById('board-name');
const boardsList = document.getElementById('boards-list');
const newsColorsButton = document.getElementById('news-colors')

const selected = () => document.querySelector('.selected');

const colorGenerator = () => {
  const [r, g, b] = ['r', 'g', 'b'].map((value) => value = Math.round(Math.random() * 250));
  return `rgb(${r}, ${g}, ${b})`;
};

const colorAdd = () => [...colors].map(({ style }) => {
  if (style.backgroundColor !== 'black') style.backgroundColor = colorGenerator();
});

const selectColor = ({ target: { classList } }) => {
  if (classList.contains('color') || classList.contains('color-input')) {
    selected().classList.remove('selected');
    classList.add('selected');
  };
};

const colored = ({ target: { classList, style } }) => {
  if (classList.contains('pixel')) style
    .backgroundColor = selected().style.backgroundColor;
};

const clearBoard = () => [...pixels].map(({ style }) => { style.backgroundColor = 'white'; });

const colorSelectorAddcolor = (value) => colorSelector.style.background = value;

const selectedAddNewColor = (value) => {
  const { style } = selected();
  style.backgroundColor = value;
}

const selectNewColor = ({ target: { value } }) => {
  colorSelectorAddcolor(value);
  selectedAddNewColor(value);
}

const saveItem = (name, item) => localStorage.setItem(name, (JSON.stringify(item)));

const getSavedItem = (name) => JSON.parse(localStorage.getItem(name));

const saveBoard = () => {
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

const getTheBoardSize = () => `${pixelBoard.childNodes.length} / ${pixelBoard.childNodes.length}`;

const checksThatTheNameIsNotRepeated = (boardName) => {
  const boardSavedList = getSavedItem('boardSavedList');
  if (boardSavedList) {
    const result = boardSavedList.some(({ name }) => name === boardName);
    if (result) throw new Error(`'${boardName}' já está sendo usado!`);
  }
};

const takeTheName = () => {
  const { value } = inputBoardName;
  if (value === '' || /^(\s+)$/g.test(value)) throw new Error('Digite o nome do quadro para proceguir!');
  checksThatTheNameIsNotRepeated(value);
  inputBoardName.value = '';
  return value;
};

const addTheBoardInformationToTheList = (array) => {
  const board = {
    name: takeTheName(),
    size: getTheBoardSize(),
    board: pixelBoard.innerHTML,
  }
  array.push(board);
  return array
};

const convertNameToId = (name) => name.replace(/\s+/g, '-');

const classChange = (item) => item.replace(/pixel/g, 'min-pixel');

const AddPixelBoard = (board) => { pixelBoard.innerHTML = board };

const removePreviewBoard = (id) => {
  document.getElementById(convertNameToId(id)).remove();
};

const removeSavedBoard = (nameBoard) => {
  let boardSavedList = getSavedItem('boardSavedList');
  boardSavedList = boardSavedList.filter(({ name }) => nameBoard !== name);
  console.log(boardSavedList);
  saveItem('boardSavedList', boardSavedList);
  removePreviewBoard(nameBoard);
};

const CreateButton = (callback, value, text, clas) => {
  const element = document.createElement('button');
  element.className = `buttons ${clas}`;
  element.innerText = text;
  element.addEventListener('click', () => { callback(value) });
  return element;
};

const createButtonsArea = (board, name) => {
  const div = document.createElement('div');
  div.className = 'display options'
  div.appendChild(CreateButton(AddPixelBoard, board, 'EDITAR', 'primary-button'));
  div.appendChild(CreateButton(removeSavedBoard, name, 'REMOVER', 'danger-button'));
  return div;
};

const createPreview = async ({ name, size, board }) => {
  const element = document.createElement('section');
  element.id = convertNameToId(name);
  element.className = 'preview display';
  element.innerHTML = `<div>${classChange(board)}</div> <p>Nome: ${name}</p> <p>Tamanho: ${size}</p>`;
  element.appendChild(createButtonsArea(board, name));
  boardsList.appendChild(element);
}

const listBoard = (boolean) => {
  const boardSavedList = getSavedItem('boardSavedList');
  if (boardSavedList) {
    if (!boolean) boardSavedList.map((item) => createPreview(item));
    if (boolean) createPreview(boardSavedList[boardSavedList.length - 1]);
  }
};

const addsTheBoardToTheSavedBoardsList = () => {
  try {
    let boardSavedList = (!getSavedItem('boardSavedList')) ? [] : getSavedItem('boardSavedList');
    boardSavedList = addTheBoardInformationToTheList(boardSavedList);
    console.log(boardSavedList);
    saveItem('boardSavedList', boardSavedList);
    listBoard(true);
  } catch (error) {
    console.log(error);
  }
};

const events = () => {
  paletteContainer.addEventListener('click', selectColor);
  pixelBoard.addEventListener('click', colored);
  buttonClear.addEventListener('click', clearBoard);
  inputColor.addEventListener('input', selectNewColor);
  buttonSave.addEventListener('click', saveBoard);
  setBoard.addEventListener('click', createPixelBoard);
  buttonSaveAs.addEventListener('click', addsTheBoardToTheSavedBoardsList);
  newsColorsButton.addEventListener('click', colorAdd);
};

window.onload = () => {
  chargeBoard();
  colorAdd();
  listBoard();
  events();
};