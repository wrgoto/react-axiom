import Publisher from './Publisher';


class Model extends Publisher {

  //===============
  // CLASS METHODS
  //===============

  static defaultState() {
    return {};
  }


  //=============
  // CONSTRUCTOR
  //=============

  constructor(state) {
    super();
    this._initId();
    this.initState(state);
    this.createHelpers();
  }


  //=====================
  // INTERFACING METHODS
  //=====================

  initState(state) {
    this.state = Object.assign(this.constructor.defaultState(), state);
  }

  createHelpers() {
    Object.keys(this.state).forEach(key => {
      const cappedKey = key[0].toUpperCase() + key.substring(1);
      const getKey = `get${cappedKey}`;
      const setKey = `set${cappedKey}`;
      const hasKey = `has${cappedKey}`;
      const isKey = `is${cappedKey}`;

      if (typeof this.state[key] === 'boolean') {
        this.constructor.prototype[isKey] = this[isKey] || function () {
            return this.state[key];
          };

      } else {
        this.constructor.prototype[getKey] = this[getKey] || function () {
            return this.state[key];
          };
      }

      this.constructor.prototype[hasKey] = this[hasKey] || function () {
          if (Array.isArray(this.state[key])) {
            return !!this.state[key].length;
          }

          return !!this.state[key];
        };

      this.constructor.prototype[setKey] = this[setKey] || function (value) {
          return this.setState({ [key]: value });
        };
    });
  }

  setState(nextState) {
    const { prev, next, diff } = this._diffState(nextState);

    if (diff) {
      // FOR LOGGING
      // console.groupCollapsed(this);
      // console.log('%cnext', 'font-weight: bold;', next);
      // console.log('%cprev', 'color: grey; font-weight: bold;', prev);
      // console.groupEnd();

      Object.assign(this.state, nextState);
      this.publish();
    }
  }


  //==================
  // INTERNAL METHODS
  //==================

  _initId() {
    this._id = Model.baseId;
    Model.baseId += 1;
  }

  _diffState(nextState) {
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


//==================
// CLASS PROPERTIES
//==================

Model.baseId = 1;


export default Model;
