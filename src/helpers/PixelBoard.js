import Componente from './Componente.js';
import { globalState } from './GlobalState.js';
import saveItem, { getSavedItem } from './storage.js';
import {
  BOARD,
  BUTTON_SAVE,
  BUTTON_SAVE_AS,
  INPUT_BOARD_NAME,
  INPUT_BOARD_SIZE,
  PIXELBOARD,
  PIXEL_BOARD,
} from '../services/constants.js';

// const buttonClear = document.getElementById('clear-board');

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
    const {
      author, board, boardNumber, date, favorited, id, name, size,
    } = this.state;
    const currentBoard = { author, board, boardNumber, date, favorited, id, name, size };
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
      this.setState({ board: PIXEL_BOARD.innerHTML });
    }
  }

  render() {
    const { name, size, board } = this.state;
    INPUT_BOARD_NAME.addEventListener('input', this.inputChange);
    INPUT_BOARD_NAME.value = name;
    INPUT_BOARD_SIZE.addEventListener('input', this.inputChange);
    INPUT_BOARD_SIZE.value = size;
    BUTTON_SAVE.addEventListener('click', this.saveCurrentBoard);
    PIXEL_BOARD.addEventListener('click', this.boardChenge);
    PIXEL_BOARD.innerHTML = board;
    BUTTON_SAVE_AS.addEventListener('click', this.saveBoard);
  }
}