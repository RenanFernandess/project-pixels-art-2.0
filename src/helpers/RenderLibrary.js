import Componente from './Componente.js';
import CreatePreview from './CreatePreview.js';
import { globalState } from './GlobalState.js';

const boardsList = document.getElementById('boards-list');
const buttonNext = document.getElementById('next-list');
const buttonPrevious = document.getElementById('previous-list');

export default class RenderLibrary extends Componente {
  constructor() {
    super();

    this.resetList = this.resetList.bind(this);
    this.whenTheClassIsReady = this.whenTheClassIsReady.bind(this);
    this.nextListOfBoard = this.nextListOfBoard.bind(this);
    this.previousListOfBoard = this.previousListOfBoard.bind(this);
    this.setUpdate = this.setUpdate.bind(this);

    this.state = {
      boardList: [],
      currentLocation: 'library',
      currentList: 'boardList',
      trash: [],
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const state = globalState.getState(({ library }) => library);
    const { currentList } = state;
    console.log('uai', state[currentList]);
    this.setState({
      ...state,
      ...this.numberOfBoardThatWillBeListed(boardsList, state[currentList]),
    });
    this.createListingState();
  }

  setUpdate() {
    const state = globalState.getState(({ library }) => library);
    const { currentList } = state;
    this.orUpdateTheList(boardsList, state[currentList], state);
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
    const { boardList } = this.state;
    this.checkIfChanged(boardsList, boardList);
  }

  async render() {
    const { firstIndex, lastIndex, currentList } = this.state;
      if (this.state[currentList].length) {
        window.addEventListener('resize', this.resetList);
        buttonNext.addEventListener('click', this.nextListOfBoard);
        buttonPrevious.addEventListener('click', this.previousListOfBoard);
        boardsList.innerHTML = '';
        this.state[currentList].slice(firstIndex, lastIndex).forEach((board) => {
          const preview = new CreatePreview(board, currentList === 'trash');
          boardsList.appendChild(preview.renderPreview());
        });
      } else boardsList.innerHTML = '<p>vaisa<p>';
  }
}