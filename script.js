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

// -------------------------------------------------------------------------------------------------------------------------
// state

const numberOfBoardThatWillBeListed = () => {
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
    boardListedNumber: {
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

const setState = (object) => {
  const state = getItemSessionStorage('state');
  const newState = Object.assign(state, object);
  saveItemSessionStorage('state', newState);
  console.log('state: ', state);
}

const orUpgradeStorage = (name) => {
  if (name === 'boardSavedList') {
    const { boardListedNumber: { firstIndex, lastIndex }} = getItemSessionStorage('state');
    const [number , numberOfBoard, pages] = numberOfBoardThatWillBeListed();
    setState({
      boardListedNumber: {
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

const saveItem = (name, item) => {
  localStorage.setItem(name, (JSON.stringify(item)));
  orUpgradeStorage(name);
};

const getSavedItem = (name) => JSON.parse(localStorage.getItem(name));

const saveItemSessionStorage = (name, item) => sessionStorage.setItem(name, JSON.stringify(item));

const getItemSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));

const convertNameToId = (name) => name.replace(/\s+/g, '-');

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
  return [...array, board];
};

const AddPixelBoard = ({ attributes }) => {
  const id = attributes['data-id'].value;
  const board = document.querySelector(`#${id} div.thumbnail`).innerHTML;
  pixelBoard.innerHTML = board;
};

const removePreviewBoard = (name) => {
  document.getElementById(convertNameToId(name)).remove();
};

const moveToTrash = (board) => {
  const { trash } = getItemSessionStorage('state');
  setState({ trash: [...trash, board] });
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
  const { trash } = getItemSessionStorage('state');
  setState({ trash: trash.filter(({ name }) => nameBoard !== name) });
  removePreviewBoard(nameBoard);
}

const restoreTrashBoard = ({ attributes }) => {
  const nameBoard = attributes['data-name'].value;
  const { trash } = getItemSessionStorage('state');
  const boardSavedList = getSavedItem('boardSavedList');
  const newBoardList = [...boardSavedList, trash.find(({ name }) => name === nameBoard)];
  setState({ trash: trash.filter(({ name }) => nameBoard !== name) });
  saveItem('boardSavedList', newBoardList);
  removePreviewBoard(nameBoard)
}

const trashButtons = (name) => (
  `<button class="buttons primary-button" data-name="${name}" name="restore-board" >Restaurar</button>
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
    const { boardListedNumber: { firstIndex, lastIndex, number } } = getItemSessionStorage('state');
    if (!boolean) boardSavedList.slice(firstIndex, lastIndex).map((item) => createPreview(item, libraryButtons));
    if (boardsList.childElementCount < number) {
      if (boolean) createPreview(boardSavedList[boardSavedList.length - 1], libraryButtons);
    }
  }
};

const addsTheBoardToTheSavedBoardsList = () => {
  try {
    let boardSavedList = getSavedItem('boardSavedList');
    boardSavedList = (boardSavedList) ? addTheBoardInformationToTheList(boardSavedList) : [];
    console.log(boardSavedList);
    saveItem('boardSavedList', boardSavedList);
    listBoard(true);
  } catch (error) {
    console.log(error);
  }
};

const clearAndListBoard = () => {
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

const calculateNextIndex = () => {
  const { boardListedNumber: { lastIndex, number, pageNumber }, numberOfBoard } = getItemSessionStorage('state');
  const newlastIndex = lastIndex + number;
  const boardListedNumber = {
    firstIndex: lastIndex,
    lastIndex: (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex,
    number,
    pageNumber,
  };
  setState({ boardListedNumber });
};

const calculatePreviousIndex = () => {
  const { boardListedNumber: { firstIndex, number, pageNumber } } = getItemSessionStorage('state');
  const newFirstIndex = firstIndex - number;
  const boardListedNumber = {
    firstIndex: ((newFirstIndex < 0) ? 0 : newFirstIndex),
    lastIndex: firstIndex,
    number,
    pageNumber,
  };
  setState({ boardListedNumber });
};

const nextListOfBoard = () => {
  const { boardListedNumber: { lastIndex }, numberOfBoard } = getItemSessionStorage('state');
  if (lastIndex !== numberOfBoard) {
    calculateNextIndex();
    clearAndListBoard();
  }
};

const previousListOfBoard = () => {
  const { boardListedNumber: { firstIndex: firstCurrentIndex } } = getItemSessionStorage('state');
  if (firstCurrentIndex) {
    calculatePreviousIndex();
    clearAndListBoard();
  }
};

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

const adjustList = () => {
  const { boardListedNumber: { pageNumber } } = getItemSessionStorage('state');
  const [number , numberOfBoard, pages] = numberOfBoardThatWillBeListed();
  if (pages !== pageNumber) {
    const newState = {
      boardListedNumber: {
        firstIndex: 0,
        lastIndex: number,
        number,
        pageNumber: pages,
      },
      numberOfBoard,
    };
    setState(newState);
    clearAndListBoard();
  }
}

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