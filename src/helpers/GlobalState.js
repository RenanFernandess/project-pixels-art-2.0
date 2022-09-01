export default class GlobalState {
  constructor() {
    this.state = {

    };
    this.update = null; 
  }

  createState(state, callback) {
    this.state = state;
    this.updatedState = callback;
  }

  pushState(state, key) {
    const obj = key ? { [key]: state } : state;
    this.state = { ...this.state, ...obj };
    this.updatedState();
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