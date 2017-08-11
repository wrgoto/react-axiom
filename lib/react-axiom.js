(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("react-axiom", ["react"], factory);
	else if(typeof exports === 'object')
		exports["react-axiom"] = factory(require("react"));
	else
		root["react-axiom"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Store = exports.Publisher = exports.Model = exports.subscribe = undefined;

	var _subscribe = __webpack_require__(1);

	var _subscribe2 = _interopRequireDefault(_subscribe);

	var _Model = __webpack_require__(4);

	var _Model2 = _interopRequireDefault(_Model);

	var _Publisher = __webpack_require__(5);

	var _Publisher2 = _interopRequireDefault(_Publisher);

	var _Store = __webpack_require__(6);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.subscribe = _subscribe2.default;
	exports.Model = _Model2.default;
	exports.Publisher = _Publisher2.default;
	exports.Store = _Store2.default;
	exports.default = {
	  subscribe: _subscribe2.default,
	  Model: _Model2.default,
	  Publisher: _Publisher2.default,
	  Store: _Store2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = subscribe;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(3);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PUBLISHABLE_FUNCTION_NAMES = ['subscribe', 'unsubscribe', 'publish'];

	function subscribe(Component) {

	  //===================
	  // WRAPPER COMPONENT
	  //===================

	  var Subscriber = function (_React$Component) {
	    _inherits(Subscriber, _React$Component);

	    //=============
	    // CONSTRUCTOR
	    //=============

	    function Subscriber(props) {
	      _classCallCheck(this, Subscriber);

	      var _this = _possibleConstructorReturn(this, (Subscriber.__proto__ || Object.getPrototypeOf(Subscriber)).call(this, props));

	      _this.forceUpdate = _this.forceUpdate.bind(_this);
	      _this._subscribe = _this._subscribe.bind(_this);
	      _this._unsubscribe = _this._unsubscribe.bind(_this);
	      return _this;
	    }

	    //===============
	    // REACT METHODS
	    //===============

	    //==================
	    // CLASS PROPERTIES
	    //==================

	    _createClass(Subscriber, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        this._getPublishables().forEach(this._subscribe);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        var _this2 = this;

	        Object.keys(nextProps).forEach(function (key) {
	          if (nextProps[key] === _this2.props[key]) return;

	          if (_this2._isPublishable(nextProps[key])) {
	            _this2._subscribe(nextProps[key]);
	          }

	          if (_this2._isPublishable(_this2.props[key])) {
	            _this2._unsubscribe(_this2.props[key]);
	          }
	        });
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this._getPublishables().forEach(this._unsubscribe);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(Component, this.props);
	      }

	      //==================
	      // INTERNAL METHODS
	      //==================

	    }, {
	      key: '_getPublishables',
	      value: function _getPublishables() {
	        var _this3 = this;

	        return Object.keys(this.props).reduce(function (publishables, key) {
	          if (_this3._isPublishable(_this3.props[key])) {
	            publishables.push(_this3.props[key]);
	          }
	          return publishables;
	        }, []);
	      }
	    }, {
	      key: '_isPublishable',
	      value: function _isPublishable(prop) {
	        return PUBLISHABLE_FUNCTION_NAMES.every(function (name) {
	          return prop && prop[name] && prop[name] instanceof Function;
	        });
	      }
	    }, {
	      key: '_subscribe',
	      value: function _subscribe(publishable) {
	        publishable.subscribe(this.forceUpdate);
	      }
	    }, {
	      key: '_unsubscribe',
	      value: function _unsubscribe(publishable) {
	        publishable.unsubscribe(this.forceUpdate);
	      }
	    }]);

	    return Subscriber;
	  }(_react2.default.Component);

	  //=====================
	  // PASS STATIC METHODS
	  //=====================

	  Subscriber.WrappedComponent = Component;
	  return (0, _hoistNonReactStatics2.default)(Subscriber, Component);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Publisher2 = __webpack_require__(5);

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

	    //==================
	    // CLASS PROPERTIES
	    //==================

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

	Model.baseId = 1;
	exports.default = Model;
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Publisher = function () {
	  function Publisher() {
	    _classCallCheck(this, Publisher);

	    this._subscriptions = [];
	  }

	  //=====================
	  // INTERFACING METHODS
	  //=====================

	  _createClass(Publisher, [{
	    key: "subscribe",
	    value: function subscribe(callback) {
	      this._subscriptions.push(callback);
	    }
	  }, {
	    key: "unsubscribe",
	    value: function unsubscribe(callback) {
	      this._subscriptions.splice(this._subscriptions.indexOf(callback), 1);
	    }
	  }, {
	    key: "publish",
	    value: function publish() {
	      this._subscriptions.forEach(function (callback) {
	        return callback();
	      });
	    }
	  }]);

	  return Publisher;
	}();

	exports.default = Publisher;
	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isPlainObject = __webpack_require__(7);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _pick = __webpack_require__(11);

	var _pick2 = _interopRequireDefault(_pick);

	var _Model2 = __webpack_require__(4);

	var _Model3 = _interopRequireDefault(_Model2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Store = function (_Model) {
	  _inherits(Store, _Model);

	  function Store() {
	    _classCallCheck(this, Store);

	    return _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).apply(this, arguments));
	  }

	  _createClass(Store, [{
	    key: 'stringify',


	    //=====================
	    // INTERFACING METHODS
	    //=====================

	    value: function stringify() {
	      var models = this._createModelsHash();

	      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	      }

	      var _state = keys.length ? (0, _pick2.default)(this.state, keys) : this.state;
	      var state = this._toSerialState(_state, models);
	      return JSON.stringify({ state: state, models: models });
	    }
	  }, {
	    key: 'parse',
	    value: function parse(json) {
	      var _JSON$parse = JSON.parse(json),
	          state = _JSON$parse.state,
	          models = _JSON$parse.models;

	      var newModels = this._createModelsHash();
	      this.state = this._fromSerialState(state, models, newModels);
	    }
	  }, {
	    key: 'parseMerge',
	    value: function parseMerge(json) {
	      var _JSON$parse2 = JSON.parse(json),
	          state = _JSON$parse2.state,
	          models = _JSON$parse2.models;

	      var newModels = this._createModelsHash();
	      Object.assign(this.state, this._fromSerialState(state, models, newModels));
	    }

	    //==================
	    // INTERNAL METHODS
	    //==================

	  }, {
	    key: '_createModelsHash',
	    value: function _createModelsHash() {
	      return Object.keys(Store.modelsHash).reduce(function (hash, key) {
	        hash[key] = {};
	        return hash;
	      }, {});
	    }
	  }, {
	    key: '_toSerial',
	    value: function _toSerial(data, store) {
	      var _this2 = this;

	      if (data instanceof _Model3.default) {
	        return this._toSerialModel(data, store);
	      }

	      if ((0, _isPlainObject2.default)(data)) {
	        return this._toSerialState(data, store);
	      }

	      if (data instanceof Array) {
	        return data.map(function (datum) {
	          return _this2._toSerial(datum, store);
	        });
	      }

	      return data;
	    }
	  }, {
	    key: '_toSerialState',
	    value: function _toSerialState(state, store) {
	      var _this3 = this;

	      return Object.keys(state).reduce(function (serializableState, key) {
	        serializableState[key] = _this3._toSerial(state[key], store);
	        return serializableState;
	      }, {});
	    }
	  }, {
	    key: '_toSerialModel',
	    value: function _toSerialModel(model, store) {
	      var _id = model._id,
	          constructor = model.constructor,
	          state = model.state;

	      var _constructor = constructor.name;

	      if (!store[_constructor][_id]) {
	        store[_constructor][_id] = this._toSerialState(state, store);
	      }

	      return { _constructor: _constructor, _id: _id };
	    }
	  }, {
	    key: '_fromSerial',
	    value: function _fromSerial(data, models, newModels) {
	      var _this4 = this;

	      if ((0, _isPlainObject2.default)(data)) {
	        if (data._constructor) {
	          return this._fromSerialModel(data, models, newModels);
	        }

	        return this._fromSerialState(data, models, newModels);
	      }

	      if (data instanceof Array) {
	        return data.map(function (datum) {
	          return _this4._fromSerial(datum, models, newModels);
	        });
	      }

	      return data;
	    }
	  }, {
	    key: '_fromSerialState',
	    value: function _fromSerialState(state, models, newModels) {
	      var _this5 = this;

	      return Object.keys(state).reduce(function (finalState, key) {
	        finalState[key] = _this5._fromSerial(state[key], models, newModels);
	        return finalState;
	      }, {});
	    }
	  }, {
	    key: '_fromSerialModel',
	    value: function _fromSerialModel(model, models, newModels) {
	      var _id = model._id,
	          _constructor = model._constructor;

	      var newModelHash = newModels[_constructor];

	      if (newModelHash[_id]) {
	        return newModelHash[_id];
	      }

	      var newModel = new Store.modelsHash[_constructor](this._fromSerial(models[_constructor][_id], models, newModels));

	      return newModelHash[_id] = newModel;
	    }
	  }], [{
	    key: 'setModelRefs',


	    //===============
	    // CLASS METHODS
	    //===============

	    //==================
	    // CLASS PROPERTIES
	    //==================

	    value: function setModelRefs(models) {
	      Store.models = models;
	      Store.modelsHash = models.reduce(function (hash, model) {
	        hash[model.name] = model;
	        return hash;
	      }, {});
	    }
	  }]);

	  return Store;
	}(_Model3.default);

	Store.models = [];
	Store.modelsHash = {};
	exports.default = Store;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(8),
	    isObjectLike = __webpack_require__(10);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(9);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(12),
	    basePick = __webpack_require__(13),
	    flatRest = __webpack_require__(27),
	    toKey = __webpack_require__(43);

	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = flatRest(function(object, props) {
	  return object == null ? {} : basePick(object, arrayMap(props, toKey));
	});

	module.exports = pick;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(14);

	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}

	module.exports = basePick;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(15);

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index],
	        value = object[key];

	    if (predicate(value, key)) {
	      baseAssignValue(result, key, value);
	    }
	  }
	  return result;
	}

	module.exports = basePickBy;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(16);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(18),
	    getValue = __webpack_require__(26);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isMasked = __webpack_require__(21),
	    isObject = __webpack_require__(20),
	    toSource = __webpack_require__(25);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(22);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(23);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(24);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(28),
	    overRest = __webpack_require__(36),
	    setToString = __webpack_require__(38);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(29);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(30),
	    isFlattenable = __webpack_require__(31);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(32),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(35);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(23);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(34),
	    isObjectLike = __webpack_require__(10);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(10);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && objectToString.call(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(37);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(39),
	    shortOut = __webpack_require__(42);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(40),
	    defineProperty = __webpack_require__(16),
	    identity = __webpack_require__(41);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 500,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(44);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(10);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ }
/******/ ])
});
;