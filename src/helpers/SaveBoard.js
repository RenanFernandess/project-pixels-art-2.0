import saveItem, { getSavedItem } from './storage.js';

const inputBoardName = document.getElementById('board-name');
const pixelBoard = document.getElementById('pixel-board');
const paragraphMessage = document.getElementById('error-mesage');

export default class SaveBoard {
  constructor() {
    this.boardSavedList = getSavedItem('boardSavedList') || [];
    this.trash = [];
    this.currentBoard = {
      author: '',
      name: '',
      date: {},
      size: '',
      board: '',
      boardNumber: this.boardSavedList.length,
    };
  }

  getTheBoardSize() {
    const size = pixelBoard.childNodes.length;
    this.currentBoard.size = `${size} / ${size}`;
  }

  takeTheName() {
    const { value } = inputBoardName;
    if (value === '' || /^(\s+)$/g.test(value)) {
      throw new Error('Digite o nome do quadro para proceguir!');
    }
    this.checksThatTheNameIsNotRepeated(value);
    paragraphMessage.innerText = '';
    this.currentBoard.name = value;
  }

  checksThatTheNameIsNotRepeated(boardName) {
    const result = this.boardSavedList.some(({ name }) => name === boardName);
    if (result) throw new Error(`'${boardName}' já está sendo usado!`);
  }

  generateId() {
    const { size, name, boardNumber } = this.currentBoard;
    const number = Math.round(Math.random() * 999);
    const string = name.replace(/\s+/g, '').substr(0, 4).toUpperCase();
    this.currentBoard.id = `BOARD${number}${string}S${size[0]}Z${boardNumber}`;
  }

  saveframe() {
    try {
      this.currentBoard.board = pixelBoard.innerHTML;
      this.takeTheName();
      this.getTheBoardSize();
      this.currentBoard.boardNumber += 1;
      this.generateId();
      this.boardSavedList.push(this.currentBoard);
      console.log(this.boardSavedList);
      saveItem('boardSavedList', this.boardSavedList);
    } catch (error) {
      paragraphMessage.innerText = error.message;
      console.log(error);
    }
  }

  removeSavedBoard(boardId) {
    this.trash = this.boardSavedList.find(({ id }) => id === boardId);
    this.boardSavedList = this.boardSavedList.filter(({ id }) => boardId !== id);
    saveItem('boardSavedList', this.boardSavedList);
  }

  getBoardSavedList() {
    return this.boardSavedList;
  }

  getTrash() {
    return this.trash;
  }

  getCurrentBoard() {
    return this.currentBoard;
  }
}

export const saveBoard = new SaveBoard();
