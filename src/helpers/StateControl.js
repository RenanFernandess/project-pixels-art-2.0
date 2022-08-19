class StateControl {
  constructor() {
    this.state = getItemSessionStorage('state') || {};
  }

  createState(state) {
    this.state = state;
    saveItemSessionStorage('state', this.state);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { StateControl };
}
