'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Publisher2 = require('./Publisher');

var _Publisher3 = _interopRequireDefault(_Publisher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = function (_Publisher) {
  _inherits(Model, _Publisher);

  _createClass(Model, null, [{
    key: 'defaultState',


    //===============
    // CLASS METHODS
    //===============

    value: function defaultState() {
      return {};
    }

    //=============
    // CONSTRUCTOR
    //=============

  }]);

  function Model(state) {
    _classCallCheck(this, Model);

    var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

    _this._initId();
    _this.initState(state);
    _this.createHelpers();
    return _this;
  }

  //=====================
  // INTERFACING METHODS
  //=====================

  _createClass(Model, [{
    key: 'initState',
    value: function initState(state) {
      this.state = Object.assign(this.constructor.defaultState(), state);
    }
  }, {
    key: 'createHelpers',
    value: function createHelpers() {
      var _this2 = this;

      Object.keys(this.state).forEach(function (key) {
        var cappedKey = key[0].toUpperCase() + key.substring(1);
        var getKey = 'get' + cappedKey;
        var setKey = 'set' + cappedKey;
        var hasKey = 'has' + cappedKey;
        var isKey = 'is' + cappedKey;

        if (typeof _this2.state[key] === 'boolean') {
          _this2.constructor.prototype[isKey] = _this2[isKey] || function () {
            return this.state[key];
          };
        } else {
          _this2.constructor.prototype[getKey] = _this2[getKey] || function () {
            return this.state[key];
          };
        }

        _this2.constructor.prototype[hasKey] = _this2[hasKey] || function () {
          if (Array.isArray(this.state[key])) {
            return !!this.state[key].length;
          }

          return !!this.state[key];
        };

        _this2.constructor.prototype[setKey] = _this2[setKey] || function (value) {
          return this.setState(_defineProperty({}, key, value));
        };
      });
    }
  }, {
    key: 'setState',
    value: function setState(nextState) {
      var _diffState2 = this._diffState(nextState),
          prev = _diffState2.prev,
          next = _diffState2.next,
          diff = _diffState2.diff;

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

  }, {
    key: '_initId',
    value: function _initId() {
      this._id = Model.baseId;
      Model.baseId += 1;
    }
  }, {
    key: '_diffState',
    value: function _diffState(nextState) {
      var _this3 = this;

      var prev = {};
      var next = {};
      var diff = false;

      Object.keys(nextState).forEach(function (key) {
        if (_this3.state[key] !== nextState[key]) {
          prev[key] = _this3.state[key];
          next[key] = nextState[key];
          diff = true;
        }
      });

      return { prev: prev, next: next, diff: diff };
    }
  }]);

  return Model;
}(_Publisher3.default);

;

//==================
// CLASS PROPERTIES
//==================

Model.baseId = 1;

exports.default = Model;