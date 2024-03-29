import Componente from './Componente.js';
import { globalState } from './GlobalState.js';
import saveItem, { getSavedItem } from './storage.js';
import {
  BOARD,
  BUTTON_CLEAR,
  BUTTON_SAVE,
  BUTTON_SAVE_AS,
  BUTTON_SET_BOARD,
  BUTTON_COME_BACK,
  BUTTON_ADVANCE,
  INPUT_BOARD_NAME,
  INPUT_BOARD_SIZE,
  PIXELBOARD,
  PIXEL_BOARD,
  RGB_COLOR_REGEXP,
} from '../services/constants.js';
import { concatHTML } from './CreateHTMLElementes.js';
import { saveBoard } from './SaveBoard.js';

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
    this.history = { currentItem: null, currentIndex: 0, historic: [] };
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
    this.advanceHistoryItem = this.advanceHistoryItem.bind(this);
    this.backHistoryItem = this.backHistoryItem.bind(this);
  }

  whenTheClassIsReady() {
    this.loadSavedBoard();
    const list = globalState.getState(({ library: { boardList } }) => boardList);
    this.setState({ boardNameList: list.map(({ name }) => name) });
    this.setHistory(PIXEL_BOARD.innerHTML);
  }

  setUpdate({ boardList, editingBoardInfo }) {
    this.setState({ boardNameList: boardList.map(({ name }) => name) });
    if (editingBoardInfo.name) {
      const { size, board } = editingBoardInfo;
      this.history.historic = [];
      this.setHistory(board);
      this.setState({ ...editingBoardInfo, size: size[0], editingBoard: true });
      globalState.pushState({ editingBoardInfo: {} }, PIXELBOARD);
    }
  }

  loadSavedBoard() { this.setState({ ...getSavedItem(BOARD) }); }

  saveCurrentBoard() {
    const {
      author, board, boardNumber, date, favorited, id, name, size, editingBoard,
    } = this.state;
    if (editingBoard) {
      const currentBoard = { author, board, boardNumber, date, favorited, id, name, size };
      saveBoard.validateBoardEdit(currentBoard);
      this.setState({ editingBoard: false });
    } else saveItem(BOARD, this.state);
  }

  saveBoard() {
    const {
      author, board, boardNumber, date, favorited, id, name, size,
    } = this.state;
    const currentBoard = { author, board, boardNumber, date, favorited, id, name, size };
    globalState.pushState({
      boardNameRepeated: this.checkNameIsRepeated(name) }, PIXELBOARD);
    saveBoard.saveBoardToList(currentBoard);
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
      const board = PIXEL_BOARD.innerHTML;
      this.setState({ board });
      this.setHistory(board);
      console.log(this.history);
    }
  }

  clearBoard() {
    this.setState(({ board }) => ({ board: board.replace(RGB_COLOR_REGEXP, 'background-color: white;') }));
  }

  createPixelBoard() {
    this.setState(({ size }) => {
      const sizeNumber = Number(size);
      const pixels = concatHTML(Array(sizeNumber).fill('<div class="pixel"></div>'));
      return { board: concatHTML(Array(sizeNumber).fill(`<div class="display">${pixels}</div>`)) };
    });
  }

  advanceHistoryItem() {
    this.setState({
      board: this.nextHistoricalItem(),
    }, () => { console.log(this.history); });
  }

  backHistoryItem() {
    this.setState({
      board: this.previousHistoricalItem(),
    }, () => { console.log(this.history); });
  }

  render() {
    const { name, size, board, editingBoard } = this.state;
    INPUT_BOARD_NAME.addEventListener('input', this.inputChange);
    INPUT_BOARD_NAME.value = name;
    INPUT_BOARD_SIZE.addEventListener('input', this.inputChange);
    INPUT_BOARD_SIZE.value = size;
    PIXEL_BOARD.addEventListener('click', this.boardChenge);
    if (board) PIXEL_BOARD.innerHTML = board;
    BUTTON_CLEAR.addEventListener('click', this.clearBoard);
    BUTTON_SAVE.addEventListener('click', this.saveCurrentBoard);
    BUTTON_SAVE.innerText = editingBoard ? 'Salvar edição' : 'Salvar';
    BUTTON_SAVE_AS.addEventListener('click', this.saveBoard);
    BUTTON_SET_BOARD.addEventListener('click', this.createPixelBoard);
    BUTTON_ADVANCE.addEventListener('click', this.advanceHistoryItem);
    BUTTON_COME_BACK.addEventListener('click', this.backHistoryItem);
  }
}