import Componente from './Componente.js';
import { globalState } from './GlobalState.js';
import saveItem, { getSavedItem } from './storage.js';
import {
  BOARD,
  BUTTON_CLEAR,
  BUTTON_SAVE,
  BUTTON_SAVE_AS,
  BUTTON_SET_BOARD,
  INPUT_BOARD_NAME,
  INPUT_BOARD_SIZE,
  PIXELBOARD,
  PIXEL_BOARD,
  RGB_COLOR_REGEXP,
} from '../services/constants.js';
import { concatHTML } from './CreateHTMLElementes.js';

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
      editingBoard: false,
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
    this.createPixelBoard = this.createPixelBoard.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
  }

  whenTheClassIsReady() {
    this.loadSavedBoard();
    const list = globalState.getState(({ library: { boardList } }) => boardList);
    this.setState({ boardNameList: list.map(({ name }) => name) });
  }

  setUpdate() {
    const state = globalState.getState(({
      library: { boardList }, pixelBoard: { editingBoardInfo },
    }) => ({ boardList, editingBoardInfo }));
    const { boardList, editingBoardInfo } = state;
    this.setState({ boardNameList: boardList.map(({ name }) => name) });
    if (editingBoardInfo.name) {
      const { size } = editingBoardInfo;
      this.setState({ ...editingBoardInfo, size: size[0], editingBoard: true });
    }
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
    globalState.pushState({
      currentBoard,
      saveBoard: true,
      boardNameRepeated: this.checkNameIsRepeated(name) }, PIXELBOARD);
  }

  inputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      if (name === 'name') {
        globalState.pushState({ boardNameRepeated: this.checkNameIsRepeated(value) }, PIXELBOARD);
      }
    });
  }

  checkNameIsRepeated(name) {
    const { boardNameList } = this.state;
    return boardNameList.find((boardName) => boardName === name);
  }

  boardChenge({ target: { classList, style } }) {
    if (classList.contains('pixel')) {
      const selectedColor = document.querySelector('.selected').style.backgroundColor;
      const targetStyle = style;
      targetStyle.backgroundColor = selectedColor;
      this.setState({ board: PIXEL_BOARD.innerHTML });
    }
  }

  clearBoard() {
    this.setState(({ board }) => ({ board: board.replace(RGB_COLOR_REGEXP, 'white') }));
  }

  createPixelBoard() {
    this.setState(({ size }) => {
      const sizeNumber = Number(size);
      const pixels = concatHTML(Array(sizeNumber).fill('<div class="pixel"></div>'));
      return { board: concatHTML(Array(sizeNumber).fill(`<div class="display">${pixels}</div>`)) };
    });
  }

  render() {
    const { name, size, board } = this.state;
    INPUT_BOARD_NAME.addEventListener('input', this.inputChange);
    INPUT_BOARD_NAME.value = name;
    INPUT_BOARD_SIZE.addEventListener('input', this.inputChange);
    INPUT_BOARD_SIZE.value = size;
    PIXEL_BOARD.addEventListener('click', this.boardChenge);
    PIXEL_BOARD.innerHTML = board;
    BUTTON_CLEAR.addEventListener('click', this.clearBoard);
    BUTTON_SAVE.addEventListener('click', this.saveCurrentBoard);
    BUTTON_SAVE_AS.addEventListener('click', this.saveBoard);
    BUTTON_SET_BOARD.addEventListener('click', this.createPixelBoard);
  }
}