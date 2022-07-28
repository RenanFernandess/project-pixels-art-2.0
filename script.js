const paletteContainer = document.getElementById('palette-container');
const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const buttonClear = document.getElementById('clear-board');
const colorSelector = document.getElementById('box-new-color');
const inputColor = document.getElementById('new-color');
const buttonSave = document.getElementById('save-board');
const inputBoardSize = document.getElementById('board-size');
const setBoard = document.getElementById('generate-board');
const buttonSaveAs = document.getElementById('save-board-as');
const inputBoardName = document.getElementById('board-name');
const boardsList = document.getElementById('boards-list');
const navOpitions = document.getElementById('nav-opitions');

const selected = () => document.querySelector('.selected');

const colorGenerator = () => {
  const [r, g, b] = ['r', 'g', 'b'].map((value) => value = Math.round(Math.random() * 250));
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

const colored = ({ target: { classList, style } }) => {
  if (classList.contains('pixel')) style
    .backgroundColor = selected().style.backgroundColor;
};

const clearBoard = () => {
  const pixels = document.querySelectorAll('div#pixel-board .pixel');
  [...pixels].map(({ style }) => { style.backgroundColor = 'white'; });
};

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

const saveItemSessionStorage = (name, item) => sessionStorage.setItem(name, JSON.stringify(item));

const getItemSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));

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

const AddPixelBoard = ({ attributes }) => {
  const id = attributes['data-id'].value;
  const board = document.querySelector(`#${id} div.thumbnail`).innerHTML;
  pixelBoard.innerHTML = board;
};

const removePreviewBoard = (id) => {
  document.getElementById(convertNameToId(id)).remove();
};

const moveToTrash = (board) => {
  const trash = (!getItemSessionStorage('trash')) ? [] : getItemSessionStorage('trash');
  trash.push(board);
  saveItemSessionStorage('trash', trash);
}

const removeSavedBoard = ({ attributes }) => {
  const nameBoard = attributes['data-name'].value;
  let boardSavedList = getSavedItem('boardSavedList');
  moveToTrash(boardSavedList.find(({ name }) => name === nameBoard));
  boardSavedList = boardSavedList.filter(({ name }) => nameBoard !== name);
  saveItem('boardSavedList', boardSavedList);
  removePreviewBoard(nameBoard);
};

const deleteTrashItem = ({ attributes }) => {
  const nameBoard = attributes['data-name'].value;
  let trash = getItemSessionStorage('trash');
  trash = trash.filter(({ name }) => nameBoard !== name);
  saveItemSessionStorage('trash', trash);
  removePreviewBoard(nameBoard);
  console.log(trash);
}

const trashButtons = (name) => (
  `<button class="buttons primary-button" data-id="${name}" name="restore-board" >Restaurar</button>
  <button class="buttons danger-button" data-name="${name}" name="delete-preview" >Apagar</button>`
);

const libraryButtons = (name) => (
  `<button class="buttons primary-button" data-id="${convertNameToId(name)}" name="edit-board" >EDITAR</button>
  <button class="buttons danger-button" data-name="${name}" name="remove-preview" >REMOVER</button>`
);

const createPreview = async ({ name, size, board }, callback) => {
  const preview = (
    `<section id=${convertNameToId(name)} class="preview display" >
      <div class="thumbnail">${board}</div>
      <p><strong>${name}</strong></p>
      <p>Tamanho: ${size}</p>
      <div class="display options">
        ${callback(name)}
      </div>
    </section>`
  )
  boardsList.innerHTML += preview;
}

const listBoard = (boolean) => {
  const boardSavedList = getSavedItem('boardSavedList');
  if (boardSavedList) {
    if (!boolean) boardSavedList.map((item) => createPreview(item, libraryButtons));
    if (boolean) createPreview(boardSavedList[boardSavedList.length - 1], libraryButtons);
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

const showTrash = () => {
  const { attributes: { name, name: { value } } } = boardsList;
  if (value !== 'trash') {
    name.value = 'trash';
    const trash = getItemSessionStorage('trash');
    if (trash) {
      boardsList.innerHTML = '';
      trash.map((item) => createPreview(item, trashButtons));
    }
  }
}

const showLibrary = () => {
  const { attributes: { name, name: { value } } } = boardsList;
  if (!value !== 'library') {
    name.value = 'library';
    boardsList.innerHTML = '';
    listBoard()
  }
}

const paletteContainerEvents = ({ target: { classList, id } }) => {
  selectColor(classList);
  if (id === 'news-colors') colorAdd();
};

const boardsListEvent = ({ target }) => {
  if (target.name === 'remove-preview') removeSavedBoard(target);
  if (target.name === 'edit-board') AddPixelBoard(target);
  if (target.name === 'delete-preview') deleteTrashItem(target);
};

const navOpitionsEvents = ({ target }) => {
  if (target.id === 'trash') showTrash();
  if (target.id === 'library') showLibrary();
};

const events = () => {
  paletteContainer.addEventListener('click', paletteContainerEvents);
  pixelBoard.addEventListener('click', colored);
  buttonClear.addEventListener('click', clearBoard);
  inputColor.addEventListener('input', selectNewColor);
  buttonSave.addEventListener('click', saveBoard);
  setBoard.addEventListener('click', createPixelBoard);
  buttonSaveAs.addEventListener('click', addsTheBoardToTheSavedBoardsList);
  boardsList.addEventListener('click', boardsListEvent);
  navOpitions.addEventListener('click', navOpitionsEvents);
};

window.onload = () => {
  chargeBoard();
  colorAdd();
  listBoard();
  events();
};