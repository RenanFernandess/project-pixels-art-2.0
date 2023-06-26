export default class GlobalState {
  constructor() {
    this.state = {};
    this.changedKey = '';
    this.updatedState = () => {};
  }

  createState(state, callback) {
    if (state) this.state = state;
    if (callback) {
      this.updatedState = callback;
      this.updatedState(this.state, this.changedKey);
    }
    console.log('global: ', this.state);
  }

  async pushState(state, key) {
    const keyObj = this.state[key] ? { [key]: { ...this.state[key], ...state } } : { [key]: state };
    const obj = key ? keyObj : state;
    this.state = { ...this.state, ...obj };
    console.log('pushState: ', this.state);
    this.changedKey = key;
    this.updatedState(this.state, this.changedKey);
  }

  getState(callback) {
    if (callback) {
      const state = callback(this.state);
      return state;
    }
    return this.state;
  }
}

export const globalState = new GlobalState();

const INITIAL_STATE = {
  library: {
    boardList: [],
    currentLocation: 'Biblioteca',
    currentList: 'boardList',
    favorites: false,
    trash: [],
  },
  pixelBoard: {
    boardNameRepeated: '',
    editingBoardInfo: {},
  },
};
globalState.createState(INITIAL_STATE);