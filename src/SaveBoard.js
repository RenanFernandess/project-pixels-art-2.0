const inputBoardName = document.getElementById('board-name');
const pixelBoard = document.getElementById('pixel-board');
// const boardsList = document.getElementById('boards-list');

class SaveBoard {
  constructor() {
    this.getBoardSavedList();
    this.getTheBoardSize();

    this.author = '';
    this.name = this.takeTheName();
    this.size = '';
    this.id = this.generateId();
    this.date = {};
    this.board = pixelBoard.innerHTML;
    this.boardSavedList = [];
    this.boardNumber = this.boardSavedList.length;
  }

  getBoardSavedList() {
    const boardSavedList = getSavedItem('boardSavedList');
    this.boardSavedList = (boardSavedList) || [];
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
    // paragraphMessage.innerText = '';
    return value;
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

  saveframe() {
    this.boardNumber += 1;
    const board = {
      author: this.author,
      name: this.name,
      size: this.size,
      id: this.id,
      date: this.date,
      board: this.board,
      boardNumber: this.boardNumber,
    };

    this.boardSavedList.push(board);
    console.log(this.boardSavedList);
  }
}

export default SaveBoard;