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
	      var _diffState2 = this._diffState(nextState);

	      var prev = _diffState2.prev;
	      var next = _diffState2.next;
	      var diff = _diffState2.diff;


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
	      var state = this._toSerialState(this.state, models);
	      return JSON.stringify({ state: state, models: models });
	    }
	  }, {
	    key: 'parse',
	    value: function parse(json) {
	      var _JSON$parse = JSON.parse(json);

	      var state = _JSON$parse.state;
	      var models = _JSON$parse.models;

	      var newModels = this._createModelsHash();
	      this.state = this._fromSerialState(state, models, newModels);
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
	      var _id = model._id;
	      var constructor = model.constructor;
	      var state = model.state;

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
	      var _id = model._id;
	      var _constructor = model._constructor;

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


/***/ }
/******/ ])
});
;