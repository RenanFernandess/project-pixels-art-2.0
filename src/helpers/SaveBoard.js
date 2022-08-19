import saveItem, { getSavedItem } from './service/storage';

const inputBoardName = document.getElementById('board-name');
const pixelBoard = document.getElementById('pixel-board');
const paragraphMessage = document.getElementById('error-mesage');
const boardsList = document.getElementById('boards-list');

class SaveBoard {
  constructor() {
    this.name = '';
    this.size = '';
    this.board = pixelBoard.innerHTML;
    this.boardSavedList = getSavedItem('boardSavedList') || [];
    this.boardNumber = this.boardSavedList.length;
  }

  getTheBoardSize() {
    const size = pixelBoard.childNodes.length;
    this.size = `${size} / ${size}`;
  }

  takeTheName() {
    const { value } = inputBoardName;
    if (value === '' || /^(\s+)$/g.test(value)) {
      throw new Error('Digite o nome do quadro para proceguir!');
    }
    this.checksThatTheNameIsNotRepeated(value);
    paragraphMessage.innerText = '';
    this.name = value;
  }

  checksThatTheNameIsNotRepeated(boardName) {
    const result = this.boardSavedList.some(({ name }) => name === boardName);
    if (result) throw new Error(`'${boardName}' já está sendo usado!`);
  }

  generateId() {
    const number = Math.round(Math.random() * 999);
    const string = this.name.replace(/\s+/g, '').substr(0, 4).toUpperCase();
    const boardSize = this.size[0];
    return `BOARD${number}${string}S${boardSize}Z${this.boardNumber}`;
  }

  getInfoFromBoard() {
    return {
      author: '',
      name: this.name,
      size: this.size,
      id: this.generateId(),
      date: {},
      board: this.board,
      boardNumber: this.boardNumber,
    };
  }

  saveframe() {
    try {
      this.takeTheName();
      this.getTheBoardSize();
      this.boardNumber += 1;
      const board = this.getInfoFromBoard();
      this.boardSavedList.push(board);
      // saveItem('boardSavedList', this.boardSavedList);
      this.createPreview();
      console.log(this.boardSavedList);
    } catch (error) {
      paragraphMessage.innerText = error.message;
      console.log(error);
    }
  }

  createPreview() {
    const preview = (
      `<section id=${this.id} class="preview display">
        <div class="thumbnail">${this.board}</div>
        <p><strong>${this.name}</strong></p>
        <p>Tamanho: ${this.size}</p>
        <div class="display options">
        </div>
      </section>`
    );
    boardsList.innerHTML += preview;
  }
}

// if (typeof module !== 'undefined') {
//   module.exports = { SaveBoard };
// }

export default SaveBoard;
