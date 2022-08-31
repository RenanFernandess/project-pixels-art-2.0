import Componente from './Componente.js';
import { saveBoard } from './SaveBoard.js';
import CreatePreview from './CreatePreview.js';

const boardsList = document.getElementById('boards-list');
export default class RenderLibrary extends Componente {
  constructor() {
    super();

    this.resetList = this.resetList.bind(this);
    this.removeBoard = this.removeBoard.bind(this);
    this.whenTheClassIsReady = this.whenTheClassIsReady.bind(this);
    this.nextListOfBoard = this.nextListOfBoard.bind(this);
    this.previousListOfBoard = this.previousListOfBoard.bind(this);

    this.state = {
      boardList: [],
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const boardList = saveBoard.getBoardSavedList();
    this.setState({ boardList, ...this.numberOfBoardThatWillBeListed(boardsList, boardList) });
    this.createListingState();
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

  removeBoard(boardId) {
    console.log(boardId);
    saveBoard.removeSavedBoard(boardId);
    boardsList.querySelector(`#${boardId}`).remove();
    const boardList = saveBoard.getBoardSavedList();
    this.setState({ boardList });
  }

  async render() {
    const { firstIndex, lastIndex, boardList } = this.state;
    console.log('render: ', this.state);
    if (boardList.length) {
      boardsList.innerHTML = '';
      boardList.slice(firstIndex, lastIndex).forEach((board) => {
        const preview = new CreatePreview(board, null, this.removeBoard);
        boardsList.appendChild(preview.renderPreview());
      });
    }
  }
}