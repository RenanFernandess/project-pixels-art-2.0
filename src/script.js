const paletteContainer = document.getElementById('palette-container');
// const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
// const pixelBoard = document.getElementById('pixel-board');
const buttonClear = document.getElementById('clear-board');
const colorSelector = document.getElementById('box-new-color');
const inputColor = document.getElementById('new-color');
const buttonSave = document.getElementById('save-board');
const inputBoardSize = document.getElementById('board-size');
const setBoard = document.getElementById('generate-board');
const buttonSaveAs = document.getElementById('save-board-as');
// const inputBoardName = document.getElementById('board-name');
// const boardsList = document.getElementById('boards-list');
const libraryContainer = document.getElementById('library-container');
const navOpitions = document.getElementById('nav-opitions');
// const paragraphMessage = document.getElementById('error-mesage');
// const searchBoardInput = document.getElementById('search-board');

// ------------------------------------------------------------------------------------------------------------------------------
// generic functions

const selected = () => document.querySelector('.selected');

// generic functions
// -------------------------------------------------------------------------------------------------------------------------
// state

// function numberOfBoardThatWillBeListed() {
//   let number = (Math.floor(boardsList.offsetWidth / 200) - 1);
//   const boardSavedList = getSavedItem('boardSavedList');
//   const numberOfBoard = (boardSavedList) ? boardSavedList.length : 0;
//   number = (number <= 0) ? 1 : number;
//   number = (number > numberOfBoard) ? numberOfBoard : number;

//   return [number, numberOfBoard, (Math.round(numberOfBoard / number))];
// }

// const getState = () => getItemSessionStorage('state');

// function createState() {
//   let state = getState();
//   const [number, numberOfBoard] = numberOfBoardThatWillBeListed();
//   state = ((state) || {
//     libraryState: {
//       currentPage: 1,
//       firstIndex: 0,
//       lastIndex: number,
//       pageNumber: (Math.round(numberOfBoard / number)),
//       number,
//     },
//     trash: [],
//     numberOfBoard,
//   });
//   console.log('state: ', state);
//   saveItemSessionStorage('state', state);
// }

// function setState(object) {
//   const state = getState();
//   const newState = Object.assign(state, object);
//   saveItemSessionStorage('state', newState);
//   console.log('state: ', state);
// }

function orUpgradeStorage(name) {
  if (name === 'boardSavedList') {
    const { libraryState: { currentPage, firstIndex, lastIndex } } = getState();
    const [number, numberOfBoard, pages] = numberOfBoardThatWillBeListed();
    setState({
      libraryState: {
        currentPage,
        firstIndex,
        lastIndex: ((lastIndex > number) ? lastIndex : number),
        number,
        pageNumber: pages,
      },
      numberOfBoard,
    });
    // listBoard(true);
  }
}

// state
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

// const saveBoard = new SaveBoard();
const renderLibrary = new RenderLibrary();

// const generateId = (name, size, boardNumber) => {
//   const number = Math.round(Math.random() * 999);
//   const string = name.replace(/\s+/g, '').substr(0, 4).toUpperCase();
//   const boardSize = size.substr(0, 1);
//   return `BOARD${number}${string}S${boardSize}Z${boardNumber}`;
// };

// const getTheBoardSize = () => {
//   const size = pixelBoard.childNodes.length
//   return `${size} / ${size}`
// };

// const checksThatTheNameIsNotRepeated = (boardName) => {
//   const boardSavedList = getSavedItem('boardSavedList');
//   if (boardSavedList) {
//     const result = boardSavedList.some(({ name }) => name === boardName);
//     if (result) throw new Error(`'${boardName}' já está sendo usado!`);
//   }
// };

// const takeTheName = () => {
//   const { value } = inputBoardName;
//   if (value === '' || /^(\s+)$/g.test(value)) throw new Error('Digite o nome do quadro para proceguir!');
//   checksThatTheNameIsNotRepeated(value);
//   paragraphMessage.innerText = '';
//   return value;
// };

// function addTheBoardInformationToTheList(array) {
//   const name = takeTheName();
//   const size = getTheBoardSize();
//   const boardNumber = array.length + 1;
//   const id = generateId(name, size, boardNumber);

//   const board = {
//     author: '',
//     date: '',
//     name,
//     size,
//     boardNumber,
//     board: pixelBoard.innerHTML,
//     id,
//   }
//   return [...array, board];
// };

// const addPixelBoard = ({ attributes }) => {
//   const id = attributes['data-id'].value;
//   const name = attributes['data-name'].value;
//   const board = document.querySelector(`#${id} div.thumbnail`).innerHTML;
//   pixelBoard.innerHTML = board;
//   inputBoardName.value = name;
// };

// const removePreviewBoard = (id) => {
//   document.getElementById(id).remove();
// };

// removeBoard(boardId)

// const moveToTrash = (board) => {
//   const { trash } = getState();
//   setState({ trash: [...trash, board] });
// };

// const removeSavedBoard = ({ attributes }) => {
//   const boardId = attributes['data-id'].value;
//   renderLibrary.removeBoard(boardId);
// };

// const removeSavedBoard = ({ attributes }) => {
//   const boardId = attributes['data-id'].value;
//   let boardSavedList = getSavedItem('boardSavedList');
//   moveToTrash(boardSavedList.find(({ id }) => id === boardId));
//   boardSavedList = boardSavedList.filter(({ id }) => boardId !== id);
//   saveItem('boardSavedList', boardSavedList);
//   removePreviewBoard(boardId);
// };

// const deleteTrashItem = ({ attributes }) => {
//   const boardId = attributes['data-id'].value;
//   const { trash } = getState();
//   setState({ trash: trash.filter(({ id }) => boardId !== id) });
//   removePreviewBoard(boardId);
// };

// const restoreTrashBoard = ({ attributes }) => {
//   const boardId = attributes['data-id'].value;
//   const { trash } = getState();
//   const boardSavedList = getSavedItem('boardSavedList');
//   const newBoardList = [...boardSavedList, trash.find(({ id }) => id === boardId)];
//   setState({ trash: trash.filter(({ id }) => boardId !== id) });
//   saveItem('boardSavedList', newBoardList);
//   removePreviewBoard(boardId);
// };

// const trashButtons = (id) => (
//   `<button class="buttons primary-button" data-id="${id}" name="restore-board" >Restaurar</button>
//   <button class="buttons danger-button" data-id="${id}" name="delete-preview" >Apagar</button>`
// );

// const libraryButtons = (id) => (
//   `<button class="buttons primary-button" data-id="${id}" name="edit-board" >EDITAR</button>
//   <button class="buttons danger-button" data-id="${id}" name="remove-preview" >REMOVER</button>`
// );

// const createPreview = ({ name, size, board, id }, callback) => {
//   const preview = (
//     `<section id=${id} class="preview display" >
//       <div class="thumbnail">${board}</div>
//       <p><strong>${name}</strong></p>
//       <p>Tamanho: ${size}</p>
//       <div class="display options">
//         ${callback(id)}
//       </div>
//     </section>`
//   );
//   boardsList.innerHTML += preview;
// };

// function listBoard(boolean) {
//   const boardSavedList = getSavedItem('boardSavedList');
//   if (boardSavedList) {
//     const { libraryState: { firstIndex, lastIndex, number } } = getState();
//     if (!boolean) boardSavedList.slice(firstIndex, lastIndex).map((item) => createPreview(item, libraryButtons));
//     if (boardsList.childElementCount < number) {
//       if (boolean) createPreview(boardSavedList[lastIndex - 1], libraryButtons);
//     }
//   }
// }

// const addsTheBoardToTheSavedBoardsList = () => {
//   try {
//     let boardSavedList = getSavedItem('boardSavedList');
//     boardSavedList = (boardSavedList) || [];
//     boardSavedList = addTheBoardInformationToTheList(boardSavedList);
//     console.log(boardSavedList);
//     saveItem('boardSavedList', boardSavedList.sort(({ boardNumber: a }, { boardNumber: b }) => a - b));
//     listBoard(true);
//   } catch (error) {
//     paragraphMessage.innerText = error.message;
//     console.log(error);
//   }
// };

// const renderTrash = () => {
//   const { trash } = getState();
//   boardsList.innerHTML = '';
//   trash.map((item) => createPreview(item, trashButtons));
// };

const showTrash = () => {
  const { attributes: { name, name: { value } } } = boardsList;
  if (value !== 'trash') {
    name.value = 'trash';
    boardsList.innerHTML = '';
  }
};

const showLibrary = () => {
  const { attributes: { name, name: { value } } } = boardsList;
  if (!value !== 'library') {
    name.value = 'library';
    renderLibrary.render();
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

const exchangeBoardInLibrary = ({ id }) => {
  const { attributes: { name: { value } } } = boardsList;
  if (value === 'library') {
    if (id === 'next-list') renderLibrary.nextListOfBoard();
    if (id === 'previous-list') renderLibrary.previousListOfBoard();
  }
};

const libraryContainerEvent = ({ target, target: { name } }) => {
  // if (name === 'remove-preview') removeSavedBoard(target);
  // if (name === 'edit-board') addPixelBoard(target);
  // if (name === 'delete-preview') deleteTrashItem(target);
  // if (name === 'restore-board') restoreTrashBoard(target);
  exchangeBoardInLibrary(target);
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
  buttonSave.addEventListener('click', saveCurrentBoard);
  setBoard.addEventListener('click', createPixelBoard);
  // buttonSaveAs.addEventListener('click', addsTheBoardToTheSavedBoardsList);
  buttonSaveAs.addEventListener('click', () => { saveBoard.saveframe(); });
  libraryContainer.addEventListener('click', libraryContainerEvent);
  navOpitions.addEventListener('click', navOpitionsEvents);
  window.addEventListener('resize', renderLibrary.resetList);
  // searchBoardInput.addEventListener('input', searchBoard);
};

window.onload = () => {
  chargeBoard();
  colorAdd();
  // createState();
  // listBoard();
  events();
};
