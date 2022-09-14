import saveItem, {
  getSavedItem, saveItemSessionStorage, getItemSessionStorage,
} from './storage.js';
import { globalState } from './GlobalState.js';
import Componente from './Componente.js';
import {
  BOARDSAVEDLIST,
  LIBRARY,
  PIXELBOARD,
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
    this.addNewBoard = this.addNewBoard.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.removeSavedBoard = this.removeSavedBoard.bind(this);
    this.removeTrashBoard = this.removeTrashBoard.bind(this);
    this.restoreBoard = this.restoreBoard.bind(this);
    this.saveAndUpdateGlobalState = this.saveAndUpdateGlobalState.bind(this);
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
    const state = globalState.getState(({ pixelBoard }) => pixelBoard);
    const { currentBoard, saveBoard, boardNameRepeated } = state;
    this.setState({ currentBoard, boardNameRepeated }, () => {
      this.addWarningMessage();
      if (saveBoard) {
        globalState.pushState({ saveBoard: false }, PIXELBOARD);
        this.saveBoard();
      }
    });
  }

  addWarningMessage() {
    const { boardNameRepeated } = this.state;
    if (boardNameRepeated) {
      WARNING_MESSAGE_PARAGRAPH.innerText = `'${boardNameRepeated}' já está sendo usado!`;
    } else WARNING_MESSAGE_PARAGRAPH.innerText = '';
  }

  saveBoard() {
    try {
      this.validateName();
      this.addNewBoard();
      WARNING_MESSAGE_PARAGRAPH.className = 'warning-message';
    } catch (error) {
      WARNING_MESSAGE_PARAGRAPH.className = 'error-mesage';
      WARNING_MESSAGE_PARAGRAPH.innerText = error.message;
      console.log(error);
    }
  }

  addNewBoard() {
      const { currentBoard, currentBoard: { size, name }, boardSavedList } = this.state;
      const boardNumber = boardSavedList.length;
      const id = this.generateId();
      const newList = [
        ...boardSavedList,
        { ...currentBoard, boardNumber, id, size: `${size}/${size}` },
      ];
      this.setState({
        boardNameRepeated: newList.some(({ name: boardName }) => name === boardName),
        boardSavedList: newList,
      });
      globalState.pushState({ boardList: newList }, LIBRARY);
      saveItem(BOARDSAVEDLIST, newList);
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

  // editBoard(boardInfo) {
  //   this.setState(({ boardSavedList }) => {
  //     const editBoardIndex = boardSavedList
  //     .reduce((indexItem, item, ind) => ((item.id === boardInfo.id) ? ind : indexItem), 0);
  //     console.log(editBoardIndex);
  //   });
  // }

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
