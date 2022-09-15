import saveItem, {
  getSavedItem, saveItemSessionStorage, getItemSessionStorage,
} from './storage.js';
import { globalState } from './GlobalState.js';
import Componente from './Componente.js';
import {
  BOARDSAVEDLIST,
  LIBRARY,
  TRASH,
  WARNING_MESSAGE_PARAGRAPH,
} from '../services/constants.js';

export default class SaveBoard extends Componente {
  constructor() {
    super();
    this.binds();
    this.state = {
      currentBoard: {},
      boardNameRepeated: false,
      boardSavedList: [],
      trash: [],
    };
    this.whenTheClassIsReady();
  }

  binds() {
    this.validateName = this.validateName.bind(this);
    this.generateId = this.generateId.bind(this);
    this.addNewBoardToList = this.addNewBoardToList.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.removeSavedBoard = this.removeSavedBoard.bind(this);
    this.removeTrashBoard = this.removeTrashBoard.bind(this);
    this.restoreBoard = this.restoreBoard.bind(this);
    this.saveAndUpdateGlobalState = this.saveAndUpdateGlobalState.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.validateBoardEdit = this.validateBoardEdit.bind(this);
    this.addWarningMessage = this.addWarningMessage.bind(this);
  }

  whenTheClassIsReady() {
    this.setState({
      boardSavedList: getSavedItem(BOARDSAVEDLIST) || [],
      trash: getItemSessionStorage(TRASH) || [],
    }, ({ boardSavedList, trash }) => {
      globalState.pushState({ boardList: boardSavedList, trash }, LIBRARY);
    });
  }

  setUpdate() {
    this.setState({
      boardNameRepeated: globalState.getState(({
        pixelBoard: { boardNameRepeated } }) => boardNameRepeated),
      }, this.addWarningMessage);
  }

  addWarningMessage() {
    const { boardNameRepeated } = this.state;
    if (boardNameRepeated) {
      WARNING_MESSAGE_PARAGRAPH.innerText = `'${boardNameRepeated}' já está sendo usado!`;
    } else WARNING_MESSAGE_PARAGRAPH.innerText = '';
  }

  saveBoardToList(boardInfo) {
    this.setState({ currentBoard: boardInfo }, () => {
      try {
        this.validateName();
        this.addNewBoardToList();
        WARNING_MESSAGE_PARAGRAPH.className = 'warning-message';
      } catch (error) {
        WARNING_MESSAGE_PARAGRAPH.className = 'error-mesage';
        WARNING_MESSAGE_PARAGRAPH.innerText = error.message;
        console.log(error);
      }
    });
  }

  addNewBoardToList() {
    this.setState(({ boardSavedList, currentBoard, currentBoard: { size, name } }) => {
      const boardList = [
        ...boardSavedList,
        { ...currentBoard,
          boardNumber: boardSavedList.length,
          size: `${size}/${size}`,
          id: this.generateId() }];
      return {
        boardNameRepeated: boardList.some(({ name: boardName }) => name === boardName),
        boardSavedList: boardList,
      };
    }, ({ boardSavedList }) => {
      globalState.pushState({ boardList: boardSavedList }, LIBRARY);
      saveItem(BOARDSAVEDLIST, boardSavedList);
    });
  }

  validateName() {
    const { currentBoard: { name }, boardNameRepeated } = this.state;
    if (boardNameRepeated) throw new Error(`'${name}' já está sendo usado!!`);
    if (name === '' || /^(\s+)$/g.test(name)) {
      throw new Error('Digite o nome do quadro para proceguir!');
    }
  }

  generateId() {
    const { currentBoard: { name, boardNumber, size } } = this.state;
    const number = Math.round(Math.random() * 999);
    const string = name.replace(/\s+/g, '').substr(0, 4).toUpperCase();
    return `BOARD${number}${string}S${size}Z${boardNumber}`;
  }

  removeSavedBoard(boardId) {
    this.setState(({ boardSavedList, trash }) => ({
        boardSavedList: boardSavedList.filter(({ id }) => boardId !== id),
        trash: [...trash, boardSavedList.find(({ id }) => id === boardId)],
    }), this.saveAndUpdateGlobalState);
  }

  validateBoardEdit(boardInfo) {
    this.setState({ currentBoard: boardInfo }, () => {
      try {
        this.validateName();
        this.saveEdit();
        WARNING_MESSAGE_PARAGRAPH.className = 'warning-message';
      } catch (error) {
        WARNING_MESSAGE_PARAGRAPH.className = 'error-mesage';
        WARNING_MESSAGE_PARAGRAPH.innerText = error.message;
        console.log(error);
      }
    });
  }

  saveEdit() {
    this.setState(({ boardSavedList, currentBoard, currentBoard: { id, size } }) => {
      const list = boardSavedList;
      const editBoardIndex = list
        .reduce((indexItem, { id: itemId }, ind) => ((itemId === id) ? ind : indexItem), 0);
      list[editBoardIndex] = { ...currentBoard, size: `${size}/${size}` };
      return { boardSavedList: list };
    }, this.saveAndUpdateGlobalState);
  }

  restoreBoard(boardId) {
    this.setState(({ boardSavedList, trash }) => ({
      boardSavedList: [...boardSavedList, trash.find(({ id }) => id === boardId)],
      trash: trash.filter(({ id }) => boardId !== id),
    }), this.saveAndUpdateGlobalState);
  }

  saveAndUpdateGlobalState() {
    const { boardSavedList, trash } = this.state;
    globalState.pushState({ boardList: boardSavedList, trash }, LIBRARY);
    saveItem(BOARDSAVEDLIST, boardSavedList);
    saveItemSessionStorage(TRASH, trash);
  }

  removeTrashBoard(boardId) {
    this.setState(({ trash }) => ({
      trash: trash.filter(({ id }) => boardId !== id),
    }),
    ({ trash }) => {
      globalState.pushState({ trash }, LIBRARY);
      saveItemSessionStorage(TRASH, trash);
    });
  }

  render() {
    return this.state;
  }
}

export const saveBoard = new SaveBoard();
