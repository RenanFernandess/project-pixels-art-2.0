import { getItemSessionStorage } from './storage.js';

export default class Componente {
  constructor() {
    this.state = {};
  }

  getSavedState() { this.state = getItemSessionStorage('state') || this.state; }

  async setState(objectOrCallback, callback) {
    if (typeof objectOrCallback === 'function') {
      objectOrCallback(this.state);
    } else this.state = Object.assign(this.state, objectOrCallback);
    console.log('state: ', this.state);
    if (callback) callback();
    this.render();
  }

  createListingState() {
    const state = {
      number: 0,
      firstIndex: 0,
      lastIndex: 0,
      numberOfBoard: 0,
      pagesNumber: 0,
      currentPage: 1,
    };
    this.state = Object.assign(state, this.state);
  }

  numberOfBoardThatWillBeListed(container, boardList = []) {
    const { lastIndex } = this.state;
    let number = (Math.floor(container.offsetWidth / 200) - 1);
    const numberOfBoard = boardList.length;
    number = (number <= 0) ? 1 : number;
    number = (number > numberOfBoard) ? numberOfBoard : number;
    return {
      number,
      lastIndex: lastIndex || number,
      numberOfBoard,
      pagesNumber: (Math.round(numberOfBoard / number)),
    };
  }

  stateRecalculator({ number, numberOfBoard }) {
    const { firstIndex, lastIndex } = this.state;
    const currentPage = Math.round((firstIndex + 1) / number);
    let newlastIndex = lastIndex;
    let newFirstIndex = firstIndex;
    if (lastIndex === numberOfBoard) newFirstIndex = lastIndex - number;
    else newlastIndex = firstIndex + number;

    this.setState({
      currentPage: (currentPage < 1) ? 1 : currentPage,
      lastIndex: (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex,
      firstIndex: newFirstIndex,
      number,
      numberOfBoard,
    });
  }

  checkIfChanged(container, boardList) {
    const { pagesNumber: previousPages } = this.state;
    const states = this.numberOfBoardThatWillBeListed(container, boardList);
    const { pagesNumber, numberOfBoard } = states;
    if (previousPages !== pagesNumber && numberOfBoard) {
        console.log('previousPages: ', previousPages);
        console.log('pagesNumber: ', pagesNumber);
        this.stateRecalculator(states);
      }
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
