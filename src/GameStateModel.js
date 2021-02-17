class GameStateModel extends EventTarget {
  constructor() {
    super();
    this.currentScreen = null;
  }

  setState = (newState) => {

    let changed = Object.entries(newState).reduce((changed, [key, value]) => {
      if (changed) {
        return true;
      } else {
        if (this.hasOwnProperty(key)) {
          if (this[key] != value) {
            return true;
          }
          return false;
        } else {
          return true;
        }
      }
    }, false);

    if (changed) {
      this.initFromData(newState);
      this.lastChangedProps = Object.keys(newState);
      this.dispatchEvent(new Event("stateUpdated"));
    }
  };

  initFromData = (newState) => {
    Object.entries(newState).forEach(([key, value]) => {
      this[key] = value;
    });
  };
};


export default new GameStateModel();