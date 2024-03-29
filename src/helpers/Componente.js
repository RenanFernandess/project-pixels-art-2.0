import { getItemSessionStorage } from './storage.js';

export default class Componente {
  constructor() {
    this.state = {};
    this.history = { currentItem: null, currentIndex: 0, historic: [] };
  }

  getSavedState() { this.state = getItemSessionStorage('state') || this.state; }

  async setState(objectOrCallback, callback) {
    if (typeof objectOrCallback === 'function') {
      this.state = Object.assign(this.state, objectOrCallback(this.state));
    } else this.state = Object.assign(this.state, objectOrCallback);
    if (callback) callback(this.state);
    this.render();
    console.log('state: ', this.state);
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
    this.setState(({ firstIndex, lastIndex }) => {
      const currentPage = Math.round((firstIndex + 1) / number);
      let newlastIndex = lastIndex;
      let newFirstIndex = firstIndex;
      if (lastIndex === numberOfBoard) newFirstIndex = lastIndex - number;
      else newlastIndex = firstIndex + number;
    
      return {
        currentPage: (currentPage < 1) ? 1 : currentPage,
        lastIndex: (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex,
        firstIndex: newFirstIndex,
        number,
        numberOfBoard,
        pagesNumber: (Math.round(numberOfBoard / number)),
      };
    });
  }

  async checkIfChanged(container, boardList) {
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
    this.setState(({ currentPage, lastIndex, number, pageNumber, numberOfBoard }) => {
      const nextPage = currentPage + 1;
      let newlastIndex = (nextPage === pageNumber) ? numberOfBoard : lastIndex + number;
      newlastIndex = (newlastIndex > numberOfBoard) ? numberOfBoard : newlastIndex;
      const firstIndex = (newlastIndex - number);
      return {
        currentPage: nextPage,
        firstIndex: (firstIndex < 0) ? 0 : firstIndex,
        lastIndex: newlastIndex,
      };
    });
  }
  
  calculatePreviousIndex() {
    this.setState(({ currentPage, firstIndex, number }) => {
      const previousPage = (firstIndex - number > 0) ? currentPage - 1 : 1;
      const nextFirstIndex = (previousPage === 1) ? 0 : firstIndex - number;
      return {
        currentPage: previousPage,
        firstIndex: ((nextFirstIndex < 0) ? 0 : nextFirstIndex),
        lastIndex: (previousPage === 1) ? number : firstIndex,
      };
    });
  }

  orUpdateTheList(container, list, state = {}) {
    this.setState(({ firstIndex }) => {
      const listState = this.numberOfBoardThatWillBeListed(container, list);
      const { number, numberOfBoard, pagesNumber } = listState;
      let lastIndex = (firstIndex + number);
      lastIndex = (lastIndex > numberOfBoard) ? numberOfBoard : lastIndex;
      return {
        firstIndex: (lastIndex - number),
        lastIndex,
        number,
        pagesNumber,
        numberOfBoard,
        ...state,
      };
    });
  }

  setHistory(item) {
    const { historic } = this.history;
    const updatedHistory = [...historic, item];
    this.history = {
      currentItem: item,
      currentIndex: updatedHistory.length - 1,
      historic: updatedHistory,
    }
  }

  nextHistoricalItem() {
    const { historic, currentIndex, currentItem } = this.history;
    if ( currentIndex < (historic.length - 1) ) {
      const nextIndex = currentIndex + 1;
      const nextItem = historic[nextIndex];
      this.history = {
        currentItem: nextItem,
        currentIndex: nextIndex,
        historic,
      }
      return nextItem;
    }
    return currentItem;
  }

  previousHistoricalItem() {
    const { historic, currentIndex, currentItem } = this.history;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      const prevItem = historic[prevIndex];
      this.history = {
        currentItem: prevItem,
        currentIndex: prevIndex,
        historic,
      }
      return prevItem;
    }
    return currentItem;
  }

}
