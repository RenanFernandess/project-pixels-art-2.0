class CreatePreview {
  constructor({ id, name, size, board }, itsTrash = false) {
    this.itsTrash = itsTrash;
    this.id = id;
    this.name = name;
    this.size = size;
    this.board = board;

    CreatePreview.prototype.toString = function () {
      return this.createPreview();
    };
  }

  createPreview() {
    const preview = (
      `<section id=${this.id} class="preview display">
        <div class="thumbnail">${this.board}</div>
        <p><strong>${this.name}</strong></p>
        <p>Tamanho: ${this.size}</p>
        <div class="display options">
          ${
            this.itsTrash ? this.trashButtons() : this.libraryButtons()
          }
        </div>
      </section>`
    );
    return preview;
  }

  libraryButtons() {
    return (
      `<button class="buttons primary-button" data-id="${this.id}" name="edit-board">
        EDITAR
      </button>
      <button class="buttons danger-button" data-id="${this.id}" name="remove-preview">
        REMOVER
      </button>`
    );
  }

  trashButtons() {
    return (
      `<button class="buttons primary-button" data-id="${this.id}" name="restore-board">
        Restaurar
      </button>
      <button class="buttons danger-button" data-id="${this.id}" name="delete-preview">
        Apagar
      </button>`
    );
  }
}

if (typeof module !== 'undefined') {
  module.exports = { CreatePreview };
}