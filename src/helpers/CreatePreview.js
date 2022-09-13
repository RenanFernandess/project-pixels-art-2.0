import { saveBoard } from './SaveBoard.js';
import createButton from './CreateHTMLElementes.js';
import { globalState } from './GlobalState.js';

const PIXELBOARD = 'pixelBoard';

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
      ? createButton(restoreButton, () => { saveBoard.restoreBoard(this.id); })
      : createButton(editButton, () => { saveBoard.editBoard(this.id); }),
    );
    div.appendChild(
      this.itsTrash
      ? createButton(deleteButton, () => { saveBoard.removeTrashBoard(this.id); })
      : createButton(removeButton, () => { saveBoard.removeSavedBoard(this.id); }),
    );
    return div;
  }
}