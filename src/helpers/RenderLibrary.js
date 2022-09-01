import Componente from './Componente.js';
import CreatePreview from './CreatePreview.js';
import { globalState } from './GlobalState.js';

const boardsList = document.getElementById('boards-list');
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
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const boardList = globalState.getState(({ library: { boardList: list } }) => list);
    console.log('uai', boardList);
    this.setState({ boardList, ...this.numberOfBoardThatWillBeListed(boardsList, boardList) });
    this.createListingState();
  }

  setUpdate() {
    const state = globalState.getState(
      ({ library: { boardList, currentLocation } }) => ({ boardList, currentLocation }),
    );
    this.setState({ ...state });
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
    const { firstIndex, lastIndex, boardList, currentLocation } = this.state;
    if (boardList.length && currentLocation === 'library') {
      boardsList.innerHTML = '';
      boardList.slice(firstIndex, lastIndex).forEach((board) => {
        const preview = new CreatePreview(board);
        boardsList.appendChild(preview.renderPreview());
      });
    }
  }
}