class CreatePreview {
  constructor(
    { id, name, size, board },
    callbackPrinary,
    callbackDanger,
    itsTrash = false,
    ) {
    this.itsTrash = itsTrash;
    this.id = id;
    this.name = name;
    this.size = size;
    this.board = board;
    this.dangerButtonClass = 'buttons danger-button';
    this.primaryButtonClass = 'buttons primary-button';
    this.callbackDanger = callbackDanger;
    this.callbackPrinary = callbackPrinary;
  }

  renderPreview() {
    const section = document.createElement('section');
    section.id = this.id;
    section.className = 'preview display';
    section.innerHTML = this.elements();
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
    div.appendChild(this.primaryButtons());
    div.appendChild(this.dangerButtons());
    return div;
  }

  dangerButtons() {
    const button = document.createElement('button');
    button.className = this.dangerButtonClass;
    button.name = this.itsTrash ? 'delete-preview' : 'remove-preview';
    button.innerText = this.itsTrash ? 'Apagar' : 'REMOVER';
    button.addEventListener('click', () => { this.callbackDanger(this.id); });
    return button;
  }

  primaryButtons() {
    const button = document.createElement('button');
    button.className = this.primaryButtonClass;
    button.name = this.itsTrash ? 'restore-board' : 'edit-board';
    button.innerText = this.itsTrash ? 'Restaurar' : 'EDITAR';
    button.addEventListener('click', this.filterParameter());
    return button;
  }

  filterParameter() {
      const boardInfo = {
        id: this.id,
        name: this.name,
        board: this.board,
      };
    return this.itsTrash
      ? () => { this.callbackDanger(this.id); }
      : () => { this.callbackDanger(boardInfo); };
  }
}

if (typeof module !== 'undefined') {
  module.exports = { CreatePreview };
}