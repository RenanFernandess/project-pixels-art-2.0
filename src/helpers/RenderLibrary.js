import Componente from './Componente.js';
import CreatePreview from './CreatePreview.js';
import { globalState } from './GlobalState.js';

const boardsList = document.getElementById('boards-list');
const buttonNext = document.getElementById('next-list');
const buttonPrevious = document.getElementById('previous-list');
const searchBoardInput = document.getElementById('search-board');

export default class RenderLibrary extends Componente {
  constructor() {
    super();

    this.resetList = this.resetList.bind(this);
    this.whenTheClassIsReady = this.whenTheClassIsReady.bind(this);
    this.nextListOfBoard = this.nextListOfBoard.bind(this);
    this.previousListOfBoard = this.previousListOfBoard.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.searchBoard = this.searchBoard.bind(this);

    this.state = {
      boardList: [],
      favorites: false,
      list: [],
      search: '',
      trash: [],
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const state = globalState.getState(({ library }) => library);
    const { boardList } = state;
    console.log('uai', boardList);
    this.setState({
      ...state,
      ...this.numberOfBoardThatWillBeListed(boardsList, boardList),
    });
    this.createListingState();
  }

  setUpdate(state) {
    const { currentList, favorites } = state;
    const list = state[currentList].filter(({ favorited }) => favorited || !favorites);
    this.orUpdateTheList(boardsList, list, { ...state, list });
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
    const { list } = this.state;
    this.checkIfChanged(boardsList, list);
  }

  searchBoard({ target: { value } }) {
    this.setState({ search: value }, (state) => {
      const { search, currentList } = state;
      const list = state[currentList]
      .filter(({ name, id }) => name.includes(search) || search === id || !search);
        this.orUpdateTheList(boardsList, list, { list });
    });
  }

  async render() {
    const { firstIndex, lastIndex, list, currentList, search, currentLocation } = this.state;
      if (list.length) {
        window.addEventListener('resize', this.resetList);
        buttonNext.addEventListener('click', this.nextListOfBoard);
        buttonPrevious.addEventListener('click', this.previousListOfBoard);
        searchBoardInput.addEventListener('input', this.searchBoard);
        searchBoardInput.value = search;
        boardsList.innerHTML = '';
          list.slice(firstIndex, lastIndex).forEach((board) => {
          const preview = new CreatePreview(board, currentList === 'trash');
          boardsList.appendChild(preview.renderPreview());
        });
      } else boardsList.innerHTML = `<p>${currentLocation} está vaisa<p>`;
  }
}