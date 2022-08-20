class Componente {
  constructor() {
    this.state = {};
  }

  getSavedState() { this.state = getItemSessionStorage('state') || this.state; }

  setState(object) {
    this.state = Object.assign(this.state, object);
    console.log('state: ', this.state);
    saveItemSessionStorage('state', this.state);
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
  }

  numberOfBoardThatWillBeListed(container, list) {
    let number = (Math.floor(container.offsetWidth / 200) - 1);
    const numberOfBoard = list.length;
    number = (number <= 0) ? 1 : number;
    number = (number > numberOfBoard) ? numberOfBoard : number;
    this.setState({
      number,
      numberOfBoard,
      pagesNumber: (Math.round(numberOfBoard / number)),
    });
  }

  stateRecalculator() {
    const { firstIndex, lastIndex, number, numberOfBoard } = this.state;
    const currentPage = Math.round((firstIndex + 1) / number);
    let newlastIndex = lastIndex;
    let newFirstIndex = firstIndex;
    if (lastIndex === numberOfBoard) newFirstIndex = lastIndex - number;
    else newlastIndex = firstIndex + number;

    this.setState({
      currentPage: (currentPage < 1) ? 1 : currentPage,
      lastIndex: (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex,
      firstIndex: newFirstIndex,
    });
  }

  checkIfChanged(container, list) {
    const { pageNumber: previousPages } = this.state;
    this.numberOfBoardThatWillBeListed(container, list);
    const { pageNumber, numberOfBoard } = this.state;
      if (previousPages !== pageNumber && numberOfBoard) this.stateRecalculator();
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
