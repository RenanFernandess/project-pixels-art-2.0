import Componente from './Componente.js';
import { saveBoard } from './SaveBoard.js';
import CreatePreview from './CreatePreview.js';
import { globalState } from './GlobalState.js';

const boardsList = document.getElementById('boards-list');

export default class RenderTrash extends Componente {
  constructor() {
    super();

    this.resetList = this.resetList.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.whenTheClassIsReady = this.whenTheClassIsReady.bind(this);
    this.nextListOfBoard = this.nextListOfBoard.bind(this);
    this.previousListOfBoard = this.previousListOfBoard.bind(this);

    this.state = {
      trash: [],
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const trash = globalState.getState(({ library: { trash: list } }) => list);
    this.setState({ trash, ...this.numberOfBoardThatWillBeListed(boardsList, trash) });
    this.createListingState();
  }

  setUpdate() {
    const trash = globalState.getState(({ library: { trash: list } }) => list);
    this.setState({ trash });
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
    const { trash } = this.state;
    this.checkIfChanged(boardsList, trash);
  }

  render() {
    const { firstIndex, lastIndex } = this.state;
    const trash = saveBoard.getTrash();
    console.log('trash');
    console.log(trash);
    if (trash.length) {
      boardsList.innerHTML = '';
      trash.slice(firstIndex, lastIndex).forEach((board) => {
        const preview = new CreatePreview(board, true);
        boardsList.appendChild(preview.renderPreview());
      });
    } else boardsList.innerHTML = '<p>Lixeira esta vaisa<p>';
  }
}