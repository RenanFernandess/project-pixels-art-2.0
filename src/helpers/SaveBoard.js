import saveItem, {
  getSavedItem, saveItemSessionStorage, getItemSessionStorage,
} from './storage.js';
import { globalState } from './GlobalState.js';
import Componente from './Componente.js';

const TRASH = 'trash';
const BOARDSAVEDLIST = 'boardSavedList';
export const LIBRARY = 'library';
export const BOARD = 'board';
const PIXELBOARD = 'pixelBoard';

const pixelBoardElement = document.getElementById('pixel-board');
const paragraphMessage = document.getElementById('error-mesage');

export default class SaveBoard extends Componente {
  constructor() {
    super();
    this.binds();
    this.state = {
      currentBoard: {},
      editing: false,
      editBoardIndex: 0,
      boardNameRepeated: false,
      size: pixelBoardElement.childElementCount,
    };
    this.boardSavedList = getSavedItem(BOARDSAVEDLIST) || [];
    this.trash = getItemSessionStorage(TRASH) || [];
    this.whenTheClassIsReady();
  }

  binds() {
    this.validateName = this.validateName.bind(this);
    this.generateId = this.generateId.bind(this);
    this.addNewBoard = this.addNewBoard.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  whenTheClassIsReady() {
    globalState.pushState({
      boardList: this.boardSavedList,
      trash: this.trash,
    }, LIBRARY);
    this.render();
  }

  setUpdate() {
    const state = globalState.getState(({ pixelBoard }) => pixelBoard);
    const { currentBoard, saveBoard, boardNameRepeated } = state;
    this.setState({ currentBoard, boardNameRepeated }, () => {
      this.addWarningMessage();
      if (saveBoard) {
        globalState.pushState({ saveBoard: false }, PIXELBOARD);
        this.saveBoard();
      }
    });
  }

  addWarningMessage() {
    const { boardNameRepeated } = this.state;
    if (boardNameRepeated) {
      paragraphMessage.innerText = `'${boardNameRepeated}' já está sendo usado!`;
    } else paragraphMessage.innerText = '';
  }

  saveBoard() {
    try {
      this.validateName();
      this.addNewBoard();
    } catch (error) {
      paragraphMessage.innerText = error.message;
      console.log(error);
    }
  }

  addNewBoard() {
      const { currentBoard, currentBoard: { size, name } } = this.state;
      const boardNumber = this.boardSavedList.length;
      const id = this.generateId();
      const newList = [
        ...this.boardSavedList,
        { ...currentBoard, boardNumber, id, size: `${size}/${size}` },
      ];
      this.setState({
        boardNameRepeated: newList.some(({ name: boardName }) => name === boardName),
      });
      this.boardSavedList = newList;
      globalState.pushState({ boardList: newList }, LIBRARY);
      saveItem(BOARDSAVEDLIST, newList);
  }

  validateName() {
    const { currentBoard: { name }, boardNameRepeated } = this.state;
    if (boardNameRepeated) throw new Error(`'${name}' já está sendo usado!!`);
    if (name === '' || /^(\s+)$/g.test(name)) {
      throw new Error('Digite o nome do quadro para proceguir!');
    }
  }

  generateId() {
    const { currentBoard: { name, boardNumber, size } } = this.state;
    const number = Math.round(Math.random() * 999);
    const string = name.replace(/\s+/g, '').substr(0, 4).toUpperCase();
    return `BOARD${number}${string}S${size}Z${boardNumber}`;
  }

  async removeSavedBoard(boardId) {
    this.trash = [...this.trash, this.boardSavedList.find(({ id }) => id === boardId)];
    this.boardSavedList = this.boardSavedList.filter(({ id }) => boardId !== id);
    globalState.pushState({
      boardList: this.boardSavedList,
      trash: this.trash,
    }, LIBRARY);
    saveItem(BOARDSAVEDLIST, this.boardSavedList);
    saveItemSessionStorage(TRASH, this.trash);
  }

  async editBoard(boardId) {
    let editBoardIndex;
    const board = this.boardSavedList.find(({ id }, index) => {
      editBoardIndex = index;
      return id === boardId;
    });
    this.setState({ ...board, size: board.size[0], editing: true, editBoardIndex });
  }

  async restoreBoard(boardId) {
    this.boardSavedList = [...this.boardSavedList, this.trash.find(({ id }) => id === boardId)];
    this.trash = this.trash.filter(({ id }) => boardId !== id);
    globalState.pushState({
      boardList: this.boardSavedList,
      trash: this.trash,
    }, LIBRARY);
    saveItem(BOARDSAVEDLIST, this.boardSavedList);
    saveItemSessionStorage(TRASH, this.trash);
  }

  async removeTrashBoard(boardId) {
    this.trash = this.trash.filter(({ id }) => boardId !== id);
    globalState.pushState({ trash: this.trash }, LIBRARY);
    saveItemSessionStorage(TRASH, this.trash);
  }

  render() {
    return this.state;
  }
}

export const saveBoard = new SaveBoard();
