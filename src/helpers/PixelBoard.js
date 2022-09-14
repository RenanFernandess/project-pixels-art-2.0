import Componente from './Componente.js';
import { globalState } from './GlobalState.js';
import saveItem, { getSavedItem } from './storage.js';
import { BOARD } from './SaveBoard.js';

const PIXELBOARD = 'pixelBoard';

const inputBoardSize = document.getElementById('board-size');
const inputBoardName = document.getElementById('board-name');
// const buttonClear = document.getElementById('clear-board');
const pixelBoard = document.getElementById('pixel-board');
const buttonSave = document.getElementById('save-board');
const buttonSaveAs = document.getElementById('save-board-as');
const paragraphMessage = document.getElementById('error-mesage');

export default class PixelBoard extends Componente {
  constructor() {
    super();
    this.bindAll();

    this.state = {
      author: '',
      board: '',
      boardNumber: 0,
      date: {},
      favorited: false,
      id: '',
      name: '',
      size: '',
      boardNameList: [],
    };
    this.whenTheClassIsReady();
  }

  bindAll() {
    this.whenTheClassIsReady = this.whenTheClassIsReady.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.boardChenge = this.boardChenge.bind(this);
    this.loadSavedBoard = this.loadSavedBoard.bind(this);
    this.saveCurrentBoard = this.saveCurrentBoard.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  whenTheClassIsReady() {
    this.loadSavedBoard();
    const list = globalState.getState(({ library: { boardList } }) => boardList);
    this.setState({ boardNameList: list.map(({ name }) => name) });
  }

  setUpdate() {
    const list = globalState.getState(({ library: { boardList } }) => boardList);
    this.setState({ boardNameList: list.map(({ name }) => name) });
  }

  loadSavedBoard() { this.setState({ ...getSavedItem(BOARD) }); }

  saveCurrentBoard() {
    saveItem(BOARD, this.state);
  }

  saveBoard() {
    const currentBoard = this.state;
    globalState.pushState({ currentBoard, saveBoard: true }, PIXELBOARD);
  }

  inputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, ({ boardNameList }) => {
      if (name === 'name') {
        const boardNameRepeated = boardNameList.find((boardName) => boardName === value);
        globalState.pushState({ boardNameRepeated }, PIXELBOARD);
      }
    });
  }

  boardChenge({ target: { classList, style } }) {
    if (classList.contains('pixel')) {
      const selectedColor = document.querySelector('.selected').style.backgroundColor;
      const targetStyle = style;
      targetStyle.backgroundColor = selectedColor;
      this.setState({ board: pixelBoard.innerHTML });
    }
  }

  render() {
    const { name, size, board } = this.state;
    inputBoardName.addEventListener('input', this.inputChange);
    inputBoardName.value = name;
    inputBoardSize.addEventListener('input', this.inputChange);
    inputBoardSize.value = size;
    buttonSave.addEventListener('click', this.saveCurrentBoard);
    pixelBoard.addEventListener('click', this.boardChenge);
    pixelBoard.innerHTML = board;
    // buttonClear.addEventListener('click', this.clearBoard);
    buttonSaveAs.addEventListener('click', this.saveBoard);
  }
}