class RenderLibrary extends Componente {
  constructor() {
    super();

    this.state = {};
    this.libraryState = {};
    this.currentBoard = {};
    this.saveBoard = new SaveBoard();
    this.boardSavedList = this.saveBoard.getBoardSavedList();
    this.createListingState();
    this.getSavedState();
  }

  // renderList() {
  //   this.boardSavedList.forEach((board) => {
  //     boardsList.innerHTML += new CreatePreview(board);
  //   });
  // }

  // render() {

  // }
}

if (typeof module !== 'undefined') {
  module.exports = { RenderLibrary };
}