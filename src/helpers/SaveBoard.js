import saveItem, { getSavedItem, saveItemSessionStorage, getItemSessionStorage } from './storage.js';
import { globalState } from './GlobalState.js';
import Componente from './Componente.js';

const TRASH = 'trash';
const BOARDSAVEDLIST = 'boardSavedList';
export const KEY = 'library';

const inputBoardSize = document.getElementById('board-size');
const inputBoardName = document.getElementById('board-name');
const pixelBoard = document.getElementById('pixel-board');
const paragraphMessage = document.getElementById('error-mesage');
const buttonSaveAs = document.getElementById('save-board-as');

export default class SaveBoard extends Componente {
  constructor() {
    super();
    this.binds();
    this.state = {
      author: '',
      board: '',
      boardNumber: 0,
      id: '',
      date: {},
      name: '',
      size: pixelBoard.childElementCount,
      nameRepeated: false,
    };
    this.boardSavedList = getSavedItem(BOARDSAVEDLIST) || [];
    this.trash = getItemSessionStorage(TRASH) || [];
    this.whenTheClassIsReady();
  }

  binds() {
    this.takeTheName = this.takeTheName.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.validateName = this.validateName.bind(this);
    this.generateId = this.generateId.bind(this);
    this.updateBoardInfos = this.updateBoardInfos.bind(this);
    this.addNewBoard = this.addNewBoard.bind(this);
  }

  whenTheClassIsReady() {
    globalState.pushState({
      boardList: this.boardSavedList,
      trash: this.trash,
    }, KEY);
    this.render();
  }

  takeTheName({ target: { value, name } }) {
    this.setState({
        [name]: value,
        nameRepeated: (name === 'name') && this.checksThatTheNameIsNotRepeated(value),
      });
  }

  checksThatTheNameIsNotRepeated(boardName) {
    const result = this.boardSavedList.some(({ name }) => name === boardName);
    if (result) paragraphMessage.innerText = `'${boardName}' já está sendo usado!`;
    else paragraphMessage.innerText = '';
    return result;
  }

  saveBoard() {
    try {
    this.validateName();
    this.setState(this.updateBoardInfos, this.addNewBoard);
    } catch (error) {
      paragraphMessage.innerText = error.message;
      console.log(error);
    }
  }

  updateBoardInfos() {
    const size = pixelBoard.childElementCount;
    const board = pixelBoard.innerHTML;
    const boardNumber = this.boardSavedList.length;
    const id = this.generateId();
    return { size, board, boardNumber, id };
  }

  addNewBoard({ author, board, boardNumber, id, date, name, size }) {
      const newList = [
        ...this.boardSavedList,
        { author, board, date, id, name, boardNumber, size: `${size}/${size}` },
      ];
      this.boardSavedList = newList;
      globalState.pushState({ boardList: newList }, KEY);
      saveItem(BOARDSAVEDLIST, newList);
      this.setState({ nameRepeated: newList.some(({ name: boardName }) => name === boardName) });
  }

  validateName() {
    const { name, nameRepeated } = this.state;
    if (nameRepeated) throw new Error(`'${name}' já está sendo usado!!`);
    if (name === '' || /^(\s+)$/g.test(name)) {
      throw new Error('Digite o nome do quadro para proceguir!');
    }
  }

  generateId() {
    const { name, boardNumber, size } = this.state;
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
    }, KEY);
    saveItem(BOARDSAVEDLIST, this.boardSavedList);
    saveItemSessionStorage(TRASH, this.trash);
  }

  async restoreBoard(boardId) {
    this.boardSavedList = [...this.boardSavedList, this.trash.find(({ id }) => id === boardId)];
    this.trash = this.trash.filter(({ id }) => boardId !== id);
    globalState.pushState({
      boardList: this.boardSavedList,
      trash: this.trash,
    }, KEY);
    saveItem(BOARDSAVEDLIST, this.boardSavedList);
    saveItemSessionStorage(TRASH, this.trash);
  }

  async removeTrashBoard(boardId) {
    this.trash = this.trash.filter(({ id }) => boardId !== id);
    globalState.pushState({ trash: this.trash }, KEY);
    saveItemSessionStorage(TRASH, this.trash);
  }

  render() {
    const { name, size } = this.state;
    inputBoardName.addEventListener('input', this.takeTheName);
    inputBoardName.value = name;
    inputBoardSize.addEventListener('input', this.takeTheName);
    inputBoardSize.value = size;
    buttonSaveAs.addEventListener('click', this.saveBoard);
  }
}

export const saveBoard = new SaveBoard();
