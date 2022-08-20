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

  numberOfBoardThatWillBeListed(element, list) {
    let number = (Math.floor(element.offsetWidth / 200) - 1);
    const numberOfBoard = list.length;
    number = (number <= 0) ? 1 : number;
    this.setState({
      number: (number > numberOfBoard) ? numberOfBoard : number,
      numberOfBoard,
      pagesNumber: (Math.round(numberOfBoard / number)),
    });
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