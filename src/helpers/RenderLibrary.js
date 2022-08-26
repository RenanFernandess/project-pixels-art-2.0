const boardsList = document.getElementById('boards-list');

class RenderLibrary extends Componente {
  constructor() {
    super();

    this.resetList = this.resetList.bind(this);

    this.state = {};
    this.libraryState = {};
    this.currentBoard = {};
    this.saveBoard = new SaveBoard();
    this.boardSavedList = this.saveBoard.getBoardSavedList();
    this.createListingState();
    this.numberOfBoardThatWillBeListed(boardsList, this.boardSavedList);
  }

  nextListOfBoard() {
    const { lastIndex, numberOfBoard } = this.state;
    if (lastIndex !== numberOfBoard) {
      this.calculateNextIndex();
    }
  }

  previousListOfBoard() {
    const { firstIndex } = this.state;
    if (firstIndex) {
      this.calculatePreviousIndex();
    }
  }

  resetList() {
    this.checkIfChanged(boardsList, this.boardSavedList);
  }

  removeBoard(boardId) {
    this.saveBoard.removeSavedBoard(boardId);
    boardsList.querySelector(`#${boardId}`).remove();
    this.boardSavedList = this.saveBoard.getBoardSavedList();
    this.render();
  }

  render() {
    const { firstIndex, lastIndex } = this.state;

    boardsList.innerHTML = '';
    this.boardSavedList.slice(firstIndex, lastIndex).forEach((board) => {
      boardsList.innerHTML += new CreatePreview(board);
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = { RenderLibrary };
}