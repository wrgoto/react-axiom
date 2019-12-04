"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _find = _interopRequireDefault(require("lodash/find"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _map = _interopRequireDefault(require("lodash/map"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _Model2 = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Store =
/*#__PURE__*/
function (_Model) {
  _inherits(Store, _Model);

  _createClass(Store, null, [{
    key: "defaultState",
    //===============
    // CLASS METHODS
    //===============
    value: function defaultState() {
      return {
        entityDefinitions: {}
      };
    } //=============
    // CONSTRUCTOR
    //=============

  }]);

  function Store(state) {
    var _this;

    _classCallCheck(this, Store);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Store).call(this, state));

    _this._createEntityHelpers();

    return _this;
  } //=====================
  // INTERFACING METHODS
  //=====================


  _createClass(Store, [{
    key: "stringify",
    value: function stringify() {
      var models = this._createEmptyModelsHash(); // If keys are identified for a partial stringify pick them
      // from state. Otherwise, use the entire state object with
      // entityDefinitions omitted.


      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      var partialState = keys.length ? (0, _pick["default"])(this.state, keys) : (0, _omit["default"])(this.state, 'entityDefinitions');

      var state = this._toSerialState(partialState, models);

      return JSON.stringify({
        state: state,
        models: models
      });
    }
  }, {
    key: "parse",
    value: function parse(json) {
      var _JSON$parse = JSON.parse(json),
          state = _JSON$parse.state,
          models = _JSON$parse.models;

      var newModels = this._createEmptyModelsHash();

      var entityDefinitions = (0, _pick["default"])(this.state, 'entityDefinitions');

      var restoredState = this._fromSerialState(state, models, newModels); // Parse will completely replace the current store with the
      // provided JSON.


      this.state = Object.assign(entityDefinitions, restoredState);
    }
  }, {
    key: "parseMerge",
    value: function parseMerge(json) {
      var _JSON$parse2 = JSON.parse(json),
          state = _JSON$parse2.state,
          models = _JSON$parse2.models;

      var newModels = this._createEmptyModelsHash();

      var partialState = this._fromSerialState(state, models, newModels); // ParseMerge will merge data provided by the JSON with the
      // existing entities and data from the current store.


      Object.assign(this.state, partialState);
    }
  }, {
    key: "addEntities",
    value: function addEntities(entities) {
      this.setState(this._mergeEntities(entities));

      this._publishUpdateQueue();

      this._clearUpdateQueue();
    } //==================
    // INTERNAL METHODS
    //==================

  }, {
    key: "_createEntityHelpers",
    value: function _createEntityHelpers() {
      var _this2 = this;

      Object.keys(this.state.entityDefinitions).forEach(function (key) {
        return _this2._createEntityHelper(key);
      });
    }
  }, {
    key: "_createEntityHelper",
    value: function _createEntityHelper(key) {
      var cappedKey = key[0].toUpperCase() + key.substring(1);
      var findKey = "find".concat(cappedKey);

      if ((0, _isUndefined["default"])(this.state[key])) {
        this.state[key] = {};
      }

      if ((0, _isPlainObject["default"])(this.state[key])) {
        this.constructor.prototype[findKey] = this[findKey] || function (id) {
          var _this3 = this;

          return id instanceof Array ? id.map(function (_id) {
            return _this3.state[key][_id];
          }) : this.state[key][id];
        };
      }
    }
  }, {
    key: "_createEmptyModelsHash",
    value: function _createEmptyModelsHash() {
      return (0, _map["default"])(this.state.entityDefinitions).reduce(function (hash, Model) {
        hash[Model.name] = {};
        return hash;
      }, {});
    }
  }, {
    key: "_toSerial",
    value: function _toSerial(data, modelsHash) {
      var _this4 = this;

      if (data instanceof _Model2["default"]) {
        return this._toSerialModel(data, modelsHash);
      }

      if ((0, _isPlainObject["default"])(data)) {
        return this._toSerialState(data, modelsHash);
      }

      if (data instanceof Array) {
        return data.map(function (datum) {
          return _this4._toSerial(datum, modelsHash);
        });
      }

      return data;
    }
  }, {
    key: "_toSerialState",
    value: function _toSerialState(state, modelsHash) {
      var _this5 = this;

      var _state = (0, _omit["default"])(state, 'store');

      return (0, _mapValues["default"])(_state, function (value, key) {
        return _this5._toSerial(_state[key], modelsHash);
      });
    }
  }, {
    key: "_toSerialModel",
    value: function _toSerialModel(model, modelsHash) {
      var _id = model._id,
          constructor = model.constructor,
          state = model.state;
      var _constructor = constructor.name;

      if (!modelsHash[_constructor][_id]) {
        modelsHash[_constructor][_id] = this._toSerialState(state, modelsHash);
      }

      return {
        _constructor: _constructor,
        _id: _id
      };
    }
  }, {
    key: "_fromSerial",
    value: function _fromSerial(data, models, newModels) {
      var _this6 = this;

      if ((0, _isPlainObject["default"])(data)) {
        if (data._constructor) {
          return this._fromSerialModel(data, models, newModels);
        }

        return this._fromSerialState(data, models, newModels);
      }

      if (data instanceof Array) {
        return data.map(function (datum) {
          return _this6._fromSerial(datum, models, newModels);
        });
      }

      return data;
    }
  }, {
    key: "_fromSerialState",
    value: function _fromSerialState(state, models, newModels) {
      var _this7 = this;

      return (0, _mapValues["default"])(state, function (value, key) {
        return _this7._fromSerial(value, models, newModels);
      });
    }
  }, {
    key: "_fromSerialModel",
    value: function _fromSerialModel(model, models, newModels) {
      var _id = model._id,
          _constructor = model._constructor;
      var newModelHash = newModels[_constructor];

      if (newModelHash[_id]) {
        return newModelHash[_id];
      }

      var Constructor = (0, _find["default"])(this.state.entityDefinitions, {
        name: _constructor
      });

      var partialState = this._fromSerial(models[_constructor][_id], models, newModels);

      var state = Object.assign({
        store: this
      }, partialState);
      return newModelHash[_id] = new Constructor(state);
    }
  }, {
    key: "_mergeEntities",
    value: function _mergeEntities(entities) {
      var _this8 = this;

      return (0, _mapValues["default"])(entities, function (entity, key) {
        return _this8._mergeEntity(entity, key);
      });
    }
  }, {
    key: "_mergeEntity",
    value: function _mergeEntity(entity, key) {
      return Object.assign({}, this.state[key], this._mergeInstances(entity, key));
    }
  }, {
    key: "_mergeInstances",
    value: function _mergeInstances(entity, key) {
      var _this9 = this;

      return (0, _mapValues["default"])(entity, function (instance, id) {
        return _this9._instanceExists(key, id) ? _this9._updateExistingInstance(key, id, instance) : _this9._createNewInstance(key, instance);
      });
    }
  }, {
    key: "_instanceExists",
    value: function _instanceExists(key, id) {
      return !!this.state[key][id];
    }
  }, {
    key: "_updateExistingInstance",
    value: function _updateExistingInstance(key, id, instance) {
      var existingInstance = this.state[key][id];
      Object.assign(existingInstance.state, instance);

      this._addToUpdateQueue(existingInstance);

      return existingInstance;
    }
  }, {
    key: "_addToUpdateQueue",
    value: function _addToUpdateQueue(model) {
      Store.updateQueue.push(model);
    }
  }, {
    key: "_clearUpdateQueue",
    value: function _clearUpdateQueue() {
      Store.updateQueue.length = 0;
    }
  }, {
    key: "_publishUpdateQueue",
    value: function _publishUpdateQueue() {
      Store.updateQueue.forEach(function (model) {
        return model.publish();
      });
    }
  }, {
    key: "_createNewInstance",
    value: function _createNewInstance(key, instance) {
      var Model = this.getEntityDefinitions()[key];
      return new Model(Object.assign({}, instance, {
        store: this
      }));
    }
  }]);

  return Store;
}(_Model2["default"]); //==================
// CLASS PROPERTIES
//==================


Store.updateQueue = [];
var _default = Store;
exports["default"] = _default;