import { saveBoard } from './SaveBoard.js';
import createButton from './CreateHTMLElementes.js';
import { globalState } from './GlobalState.js';

const inputBoardName = document.getElementById('board-name');
const pixelBoard = document.getElementById('pixel-board');

const removeButton = {
  text: 'Remover',
  className: 'buttons danger-button',
  name: 'remove-preview',
};

const deleteButton = {
  text: 'Apagar',
  className: 'buttons danger-button',
  name: 'delete-preview',
};

const editButton = {
  text: 'Editar',
  className: 'buttons primary-button',
  name: 'edit-board',
};

const restoreButton = {
  text: 'Restaurar',
  className: 'buttons primary-button',
  name: 'restore-board',
};

export default class CreatePreview {
  constructor({ id, name, size, board }, itsTrash = false) {
    this.itsTrash = itsTrash;
    this.id = id;
    this.name = name;
    this.size = size;
    this.board = board;
    this.boardInfo = { id, name, size, board };
  }

  renderPreview() {
    const section = document.createElement('section');
    section.id = this.id;
    section.className = 'preview display';
    section.innerHTML = this.elements();
    section.appendChild(this.createButtonsArea());
    return section;
  }

  elements() {
    return (`
      <div class="thumbnail">${this.board}</div>
      <p><strong>${this.name}</strong></p>
      <p>Tamanho: ${this.size}</p>
    `);
  }

  createButtonsArea() {
    const div = document.createElement('div');
    div.className = 'display options';
    div.appendChild(
      this.itsTrash
      ? createButton(restoreButton, () => { this.restoreBoard(this.id); })
      : createButton(editButton, () => { this.editPixelBoard(this.boardInfo); }),
    );
    div.appendChild(
      this.itsTrash
      ? createButton(deleteButton, () => { this.removeBoard(this.id); })
      : createButton(removeButton, () => { this.removeBoard(this.id); }),
    );
    return div;
  }

  removeBoard(boardId) {
    if (this.itsTrash) saveBoard.removeTrashBoard(boardId);
    else saveBoard.removeSavedBoard(boardId);
    return this.name;
  }

  restoreBoard(boardId) {
    saveBoard.restoreBoard(boardId);
    return this.name;
  }

  editPixelBoard(boardInfo) {
    const { name, board } = boardInfo;
    pixelBoard.innerHTML = board;
    inputBoardName.value = name;
    return this.name;
  }
}