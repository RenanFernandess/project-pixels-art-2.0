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
const libraryContainer = document.getElementById('library-container');
const navOpitions = document.getElementById('nav-opitions');
const paragraphMessage = document.getElementById('error-mesage');

// -------------------------------------------------------------------------------------------------------------------------
// state

function numberOfBoardThatWillBeListed() {
  let number = (Math.floor(boardsList.offsetWidth / 200) - 1);
  const boardSavedList = getSavedItem('boardSavedList');
  const numberOfBoard = (boardSavedList) ? boardSavedList.length : 0;
  number = (number <= 0) ? 1 : number;
  number = (number > numberOfBoard) ? numberOfBoard : number ;

  return [number , numberOfBoard, (Math.round(numberOfBoard / number))];
};

function createState() {
  let state = getItemSessionStorage('state');
  const [number , numberOfBoard] = numberOfBoardThatWillBeListed();
  state = ((state) ? state : {
    libraryState: {
      currentPage: 1,
      firstIndex: 0,
      lastIndex: number,
      pageNumber: (Math.round(numberOfBoard / number)),
      number,
    },
    trash: [],
    numberOfBoard,
  });
  console.log('state: ', state);
  saveItemSessionStorage('state', state);
}

function setState(object) {
  const state = getItemSessionStorage('state');
  const newState = Object.assign(state, object);
  saveItemSessionStorage('state', newState);
  console.log('state: ', state);
}

function orUpgradeStorage(name) {
  if (name === 'boardSavedList') {
    const { libraryState: { currentPage, firstIndex, lastIndex }} = getItemSessionStorage('state');
    const [number , numberOfBoard, pages] = numberOfBoardThatWillBeListed();
    setState({
      libraryState: {
        currentPage,
        firstIndex,
        lastIndex: ((lastIndex > number) ? lastIndex : number),
        number,
        pageNumber: pages,
      },
      numberOfBoard,
    })
  }
}

// state
// ------------------------------------------------------------------------------------------------------------------------------
// generic functions

const selected = () => document.querySelector('.selected');

function saveItem(name, item) {
  localStorage.setItem(name, (JSON.stringify(item)));
  orUpgradeStorage(name);
};

const getSavedItem = (name) => JSON.parse(localStorage.getItem(name));

function saveItemSessionStorage(name, item) { sessionStorage.setItem(name, JSON.stringify(item)); };

const getItemSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));

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

const colorSelectorAddcolor = (value) => colorSelector.style.background = value;

const selectedAddNewColor = (value) => {
  const { style } = selected();
  style.backgroundColor = value;
}

const selectNewColor = ({ target: { value } }) => {
  colorSelectorAddcolor(value);
  selectedAddNewColor(value);
}


// color palet
// ------------------------------------------------------------------------------------------------------------------------------
// pixel board opitions

const colored = ({ target: { classList, style } }) => {
  if (classList.contains('pixel')) style
    .backgroundColor = selected().style.backgroundColor;
};

const clearBoard = () => {
  const pixels = document.querySelectorAll('div#pixel-board .pixel');
  [...pixels].map(({ style }) => { style.backgroundColor = 'white'; });
};

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

// pixel board opitions
// -------------------------------------------------------------------------------------------------------------------------
// library render

const generateId = (name, size, boardNumber) => {
  const number = Math.round(Math.random() * 999);
  const string = name.replace(/\s+/g, '').substr(0, 4).toUpperCase();
  const boardSize = size.substr(0, 1);
  return `BOARD${number}${string}S${boardSize}Z${boardNumber}`;
};

const getTheBoardSize = () => {
  const size = pixelBoard.childNodes.length
  return `${size} / ${size}`
};

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
  paragraphMessage.innerText = '';
  return value;
};

function addTheBoardInformationToTheList(array) {
  const name = takeTheName();
  const size = getTheBoardSize();
  const boardNumber = array.length + 1;
  const id = generateId(name, size, boardNumber);
  
  const board = {
    name,
    size,
    boardNumber,
    board: pixelBoard.innerHTML,
    id,
  }
  return [...array, board];
};

const AddPixelBoard = ({ attributes }) => {
  const id = attributes['data-id'].value;
  const board = document.querySelector(`#${id} div.thumbnail`).innerHTML;
  pixelBoard.innerHTML = board;
};

const removePreviewBoard = (id) => {
  document.getElementById(id).remove();
};

const moveToTrash = (board) => {
  const { trash } = getItemSessionStorage('state');
  setState({ trash: [...trash, board] });
}

const removeSavedBoard = ({ attributes }) => {
  const boardId = attributes['data-id'].value;
  let boardSavedList = getSavedItem('boardSavedList');
  moveToTrash(boardSavedList.find(({ id }) => id === boardId));
  boardSavedList = boardSavedList.filter(({ id }) => boardId !== id);
  saveItem('boardSavedList', boardSavedList);
  removePreviewBoard(boardId);
};

const deleteTrashItem = ({ attributes }) => {
  const boardId = attributes['data-id'].value;
  const { trash } = getItemSessionStorage('state');
  setState({ trash: trash.filter(({ id }) => boardId !== id) });
  removePreviewBoard(boardId);
}

const restoreTrashBoard = ({ attributes }) => {
  const boardId = attributes['data-id'].value;
  const { trash } = getItemSessionStorage('state');
  const boardSavedList = getSavedItem('boardSavedList');
  const newBoardList = [...boardSavedList, trash.find(({ id }) => id === boardId)];
  setState({ trash: trash.filter(({ id }) => boardId !== id) });
  saveItem('boardSavedList', newBoardList);
  removePreviewBoard(boardId)
}

const trashButtons = (id) => (
  `<button class="buttons primary-button" data-id="${id}" name="restore-board" >Restaurar</button>
  <button class="buttons danger-button" data-id="${id}" name="delete-preview" >Apagar</button>`
);

const libraryButtons = (id) => (
  `<button class="buttons primary-button" data-id="${id}" name="edit-board" >EDITAR</button>
  <button class="buttons danger-button" data-id="${id}" name="remove-preview" >REMOVER</button>`
);

const createPreview = ({ name, size, board, id }, callback) => {
  const preview = (
    `<section id=${id} class="preview display" >
      <div class="thumbnail">${board}</div>
      <p><strong>${name}</strong></p>
      <p>Tamanho: ${size}</p>
      <div class="display options">
        ${callback(id)}
      </div>
    </section>`
  )
  boardsList.innerHTML += preview;
}

function listBoard(boolean) {
  const boardSavedList = getSavedItem('boardSavedList');
  if (boardSavedList) {
    const { libraryState: { firstIndex, lastIndex, number } } = getItemSessionStorage('state');
    if (!boolean) boardSavedList.slice(firstIndex, lastIndex).map((item) => createPreview(item, libraryButtons));
    if (boardsList.childElementCount < number) {
      if (boolean) createPreview(boardSavedList[lastIndex - 1], libraryButtons);
    }
  }
};

const addsTheBoardToTheSavedBoardsList = () => {
  try {
    let boardSavedList = getSavedItem('boardSavedList');
    boardSavedList = (boardSavedList) ? boardSavedList : [];
    boardSavedList = addTheBoardInformationToTheList(boardSavedList);
    console.log(boardSavedList);
    saveItem('boardSavedList', boardSavedList.sort(({ boardNumber: a }, { boardNumber: b }) => a - b));
    listBoard(true);
  } catch (error) {
    paragraphMessage.innerText = error.message;
    console.log(error);
  }
};

function clearAndListBoard() {
  boardsList.innerHTML = '';
  listBoard()
}

const renderTrash = () => {
  const { trash } = getItemSessionStorage('state');
  boardsList.innerHTML = '';
  trash.map((item) => createPreview(item, trashButtons));
}

const showTrash = () => {
  const { attributes: { name, name: { value } } } = boardsList;
  if (value !== 'trash') {
    name.value = 'trash';
    renderTrash();
  }
};

const showLibrary = () => {
  const { attributes: { name, name: { value } } } = boardsList;
  if (!value !== 'library') {
    name.value = 'library';
    clearAndListBoard();
  }
};

// library render
// --------------------------------------------------------------------------------------------------------------------------
// library listing

const calculateNextIndex = ({ libraryState, numberOfBoard }) => {
  const { currentPage, lastIndex, number, pageNumber } = libraryState;
  const nextPage = currentPage + 1;
  let newlastIndex = (nextPage === pageNumber) ? numberOfBoard : lastIndex + number;
  newlastIndex = (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex
  const firstIndex = (newlastIndex - number);
  const boardListed = {
    currentPage: nextPage,
    firstIndex: (firstIndex < 0) ? 0 : firstIndex,
    lastIndex: newlastIndex,
    number,
    pageNumber,
  };
  setState({ libraryState: boardListed });
};

const calculatePreviousIndex = ({ libraryState: { currentPage, firstIndex, number, pageNumber } }) => {
  const previousPage = (firstIndex - number > 0) ? currentPage - 1 : 1;
  console.log(previousPage);
  const nextFirstIndex = (previousPage === 1) ? 0 : firstIndex - number;
  const boardListed = {
    currentPage: previousPage,
    firstIndex: ((nextFirstIndex < 0) ? 0 : nextFirstIndex),
    lastIndex: (previousPage === 1) ? number : firstIndex,
    number,
    pageNumber,
  };
  setState({ libraryState: boardListed });
};

const nextListOfBoard = () => {
  const state = getItemSessionStorage('state');
  const { libraryState: { lastIndex }, numberOfBoard } = state;
  if (lastIndex !== numberOfBoard) {
    calculateNextIndex(state);
    clearAndListBoard();
  }
};

const previousListOfBoard = () => {
  const state = getItemSessionStorage('state');
  const { libraryState: { firstIndex } } = state;
  if (firstIndex) {
    calculatePreviousIndex(state);
    clearAndListBoard();
  }
};

const adjustList = () => {
  let { libraryState: { firstIndex, lastIndex, pageNumber } } = getItemSessionStorage('state');
  const [number , numberOfBoard, pages] = numberOfBoardThatWillBeListed();
  if (numberOfBoard) {
    if (pages !== pageNumber) {
      let newlastIndex = lastIndex;
      const currentPage = Math.round((firstIndex + 1) / number);
      if (lastIndex === numberOfBoard) firstIndex = lastIndex - number;
      else newlastIndex = firstIndex + number;
      const newState = {
        libraryState: {
          currentPage: (currentPage < 1) ? 1 : currentPage,
          firstIndex,
          lastIndex: (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex,
          number,
          pageNumber: pages,
        },
        numberOfBoard,
      };
      setState(newState);
      clearAndListBoard();
    }
  }
}

// library listing
// -------------------------------------------------------------------------------------------------------------------------------
// events

const paletteContainerEvents = ({ target: { classList, id } }) => {
  selectColor(classList);
  if (id === 'news-colors') colorAdd();
};

const libraryContainerEvent = ({ target, target: { name, id } }) => {
  if (name === 'remove-preview') removeSavedBoard(target);
  if (name === 'edit-board') AddPixelBoard(target);
  if (name === 'delete-preview') deleteTrashItem(target);
  if (name === 'restore-board') restoreTrashBoard(target);
  if (id === 'next-list') nextListOfBoard();
  if (id === 'previous-list') previousListOfBoard();
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
  libraryContainer.addEventListener('click', libraryContainerEvent);
  navOpitions.addEventListener('click', navOpitionsEvents);
  window.addEventListener('resize', adjustList);
}

window.onload = () => {
  chargeBoard();
  colorAdd();
  createState();
  listBoard();
  events();
};