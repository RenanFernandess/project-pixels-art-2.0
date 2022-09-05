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
    this.inputChange = this.inputChange.bind(this);

    this.state = {
      boardList: [],
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

  setUpdate() {
    const state = globalState.getState(({ library }) => library);
    const { currentList } = state;
    const list = state[currentList];
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

  inputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async render() {
    const { firstIndex, lastIndex, list, currentList, search, currentLocation } = this.state;
      if (list.length) {
        window.addEventListener('resize', this.resetList);
        buttonNext.addEventListener('click', this.nextListOfBoard);
        buttonPrevious.addEventListener('click', this.previousListOfBoard);
        searchBoardInput.addEventListener('input', this.inputChange);
        searchBoardInput.value = search;
        boardsList.innerHTML = '';
        list.filter(({ name, id }) => name.includes(search) || search === id || !search)
          .slice(firstIndex, lastIndex).forEach((board) => {
          const preview = new CreatePreview(board, currentList === 'trash');
          boardsList.appendChild(preview.renderPreview());
        });
      } else boardsList.innerHTML = `<p>${currentLocation} está vaisa<p>`;
  }
}