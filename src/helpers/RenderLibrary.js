import Componente from './Componente.js';
import { saveBoard } from './SaveBoard.js';
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
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const boardList = globalState.getState(({ library: { boardsList: list } }) => list);
    this.setState({ boardList, ...this.numberOfBoardThatWillBeListed(boardsList, boardList) });
    this.createListingState();
  }

  setUpdate() {
    const boardList = globalState.getState(({ library: { boardsList: list } }) => list);
    this.setState({ boardList });
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
    const { firstIndex, lastIndex, boardList } = this.state;
    if (boardList.length) {
      boardsList.innerHTML = '';
      boardList.slice(firstIndex, lastIndex).forEach((board) => {
        const preview = new CreatePreview(board);
        boardsList.appendChild(preview.renderPreview());
      });
    }
  }
}