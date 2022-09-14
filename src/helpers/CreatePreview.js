import { saveBoard } from './SaveBoard.js';
import createButton from './CreateHTMLElementes.js';
import { globalState } from './GlobalState.js';
import { PIXELBOARD } from '../services/constants.js';

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
  constructor(board, itsTrash = false) {
    this.itsTrash = itsTrash;
    this.board = {
      ...board,
    };
  }

  renderPreview() {
    const { id } = this.board;
    const section = document.createElement('section');
    section.id = id;
    section.className = 'preview display';
    section.innerHTML = this.elements();
    section.appendChild(this.createButtonsArea());
    return section;
  }

  elements() {
    const { name, size, board } = this.board;
    return (`
      <div class="thumbnail">${board}</div>
      <p><strong>${name}</strong></p>
      <p>Tamanho: ${size}</p>
    `);
  }

  createButtonsArea() {
    const { id } = this.board;
    const div = document.createElement('div');
    div.className = 'display options';
    div.appendChild(
      this.itsTrash
      ? createButton(restoreButton, () => { saveBoard.restoreBoard(id); })
      : createButton(editButton, () => { this.editBoard(); }),
    );
    div.appendChild(
      this.itsTrash
      ? createButton(deleteButton, () => { saveBoard.removeTrashBoard(id); })
      : createButton(removeButton, () => { saveBoard.removeSavedBoard(id); }),
    );
    return div;
  }

  editBoard() {
    globalState.pushState({ editingBoard: this.board }, PIXELBOARD);
  }
}