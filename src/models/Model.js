import Publisher from './Publisher';


export default class Model extends Publisher {

  //================
  // PUBLIC METHODS
  //================

  setState(nextState) {
    const { prev, next, diff } = this.diffState(nextState);

    if (diff) {
      // FOR LOGGING
      // console.groupCollapsed(this);
      // console.log('%cnext', 'font-weight: bold;', next);
      // console.log('%cprev', 'color: grey; font-weight: bold;', prev);
      // console.groupEnd();

      setTimeout(() => {
        Object.assign(this.state, nextState);
        this.publish();
      }, 0);
    }
  }


  //=================
  // PRIVATE METHODS
  //=================

  diffState(nextState) {
    const prev = {};
    const next = {};
    let diff = false;

    Object.keys(nextState).forEach(key => {
      if (this.state[key] !== nextState[key]) {
        prev[key] = this.state[key];
        next[key] = nextState[key];
        diff = true;
      }
    });

    return { prev, next, diff };
  }

};
