const boardsList = document.getElementById('boards-list');
class Componente {
  constructor() {
    this.state = {};
  }

  getSavedState() { this.state = getItemSessionStorage('state') || this.state; }

  setState(object, callback) {
    this.state = Object.assign(this.state, object);
    console.log('state: ', this.state);
    saveItemSessionStorage('state', this.state);
    callback();
    this.render();
  }

  createListingState() {
    this.state = {
      number: 0,
      lastIndex: 0,
      firstIndex: 0,
      numberOfBoard: 0,
      pagesNumber: 0,
      currentPage: 1,
    };
    this.numberOfBoardThatWillBeListed();
  }

  numberOfBoardThatWillBeListed() {
    let number = (Math.floor(boardsList.offsetWidth / 200) - 1);
    const numberOfBoard = (this.boardSavedList) ? this.boardSavedList.length : 0;
    number = (number <= 0) ? 1 : number;
    this.setState({
      number: (number > numberOfBoard) ? numberOfBoard : number,
      numberOfBoard,
      pagesNumber: (Math.round(numberOfBoard / number)),
    });
  }

  calculateNextIndex() {
    const { currentPage, lastIndex, number, pageNumber, numberOfBoard } = this.state;
    const nextPage = currentPage + 1;
    let newlastIndex = (nextPage === pageNumber) ? numberOfBoard : lastIndex + number;
    newlastIndex = (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex;
    const firstIndex = (newlastIndex - number);
    this.setState({
      currentPage: nextPage,
      firstIndex: (firstIndex < 0) ? 0 : firstIndex,
      lastIndex: newlastIndex,
    });
  }
  
  calculatePreviousIndex() {
    const { currentPage, firstIndex, number } = this.state;
    const previousPage = (firstIndex - number > 0) ? currentPage - 1 : 1;
    console.log(previousPage);
    const nextFirstIndex = (previousPage === 1) ? 0 : firstIndex - number;
    this.setState({
      currentPage: previousPage,
      firstIndex: ((nextFirstIndex < 0) ? 0 : nextFirstIndex),
      lastIndex: (previousPage === 1) ? number : firstIndex,
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = { Componente };
}
