class RenderLibrary extends StateControl {
  constructor() {
    super();

    this.state = {};
    this.itsTrash = false;
    this.trash = [];
    this.libraryState = {};
    this.currentBoard = {};
    this.saveBoard = new SaveBoard();
    this.boardSavedList = this.saveBoard.getBoardSavedList();

    this.getSavedState();
  }

  test() {
    this.setState({ nome: 'test' });
  }

  testando() {
    console.log(this.state);
  }

  renderList() {
    this.boardSavedList.forEach((board) => {
      boardsList.innerHTML += new CreatePreview(board);
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = { RenderLibrary };
}