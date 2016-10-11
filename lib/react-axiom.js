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
	exports.Store = exports.Publisher = exports.Model = exports.subscribe = exports.provide = exports.connect = undefined;

	var _connect = __webpack_require__(1);

	var _connect2 = _interopRequireDefault(_connect);

	var _provide = __webpack_require__(3);

	var _provide2 = _interopRequireDefault(_provide);

	var _subscribe = __webpack_require__(4);

	var _subscribe2 = _interopRequireDefault(_subscribe);

	var _Model = __webpack_require__(5);

	var _Model2 = _interopRequireDefault(_Model);

	var _Publisher = __webpack_require__(6);

	var _Publisher2 = _interopRequireDefault(_Publisher);

	var _Store = __webpack_require__(7);

	var _Store2 = _interopRequireDefault(_Store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.connect = _connect2.default;
	exports.provide = _provide2.default;
	exports.subscribe = _subscribe2.default;
	exports.Model = _Model2.default;
	exports.Publisher = _Publisher2.default;
	exports.Store = _Store2.default;
	exports.default = {
	  connect: _connect2.default,
	  provide: _provide2.default,
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

	exports.default = connect;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function connect(_ref) {
	  var component = _ref.component;
	  var contextTypes = _ref.contextTypes;

	  //===================
	  // WRAPPER COMPONENT
	  //===================

	  var Connector = function (_React$Component) {
	    _inherits(Connector, _React$Component);

	    function Connector() {
	      _classCallCheck(this, Connector);

	      return _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).apply(this, arguments));
	    }

	    _createClass(Connector, [{
	      key: 'render',


	      //===============
	      // REACT METHODS
	      //===============

	      value: function render() {
	        return _react2.default.createElement(component, this.getChildProps());
	      }

	      //=================
	      // PRIVATE METHODS
	      //=================

	    }, {
	      key: 'getChildProps',
	      value: function getChildProps() {
	        return Object.assign(this.pickContext(), this.props);
	      }
	    }, {
	      key: 'pickContext',
	      value: function pickContext() {
	        var _this2 = this;

	        return Object.keys(contextTypes).reduce(function (context, key) {
	          context[key] = _this2.context[key];
	          return context;
	        }, {});
	      }
	    }]);

	    return Connector;
	  }(_react2.default.Component);

	  Connector.contextTypes = contextTypes;

	  return Connector;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = provide;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function provide(_ref) {
	  var component = _ref.component;
	  var childContextTypes = _ref.childContextTypes;

	  //===================
	  // WRAPPER COMPONENT
	  //===================

	  var Provider = function (_React$Component) {
	    _inherits(Provider, _React$Component);

	    function Provider() {
	      _classCallCheck(this, Provider);

	      return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
	    }

	    _createClass(Provider, [{
	      key: 'render',


	      //===============
	      // REACT METHODS
	      //===============

	      value: function render() {
	        return _react2.default.createElement(component, this.props);
	      }

	      //=================
	      // PRIVATE METHODS
	      //=================

	    }, {
	      key: 'getChildContext',
	      value: function getChildContext() {
	        return this.pickProps();
	      }
	    }, {
	      key: 'pickProps',
	      value: function pickProps() {
	        var _this2 = this;

	        return Object.keys(this.props).reduce(function (props, key) {
	          if (key !== 'children') props[key] = _this2.props[key];
	          return props;
	        }, {});
	      }
	    }]);

	    return Provider;
	  }(_react2.default.Component);

	  Provider.childContextTypes = childContextTypes;

	  return Provider;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = subscribe;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PUBLISHABLE_FUNCTION_NAMES = ['subscribe', 'unsubscribe', 'publish'];

	function subscribe(_ref) {
	  var component = _ref.component;


	  //===================
	  // WRAPPER COMPONENT
	  //===================

	  return function (_React$Component) {
	    _inherits(Subscriber, _React$Component);

	    function Subscriber(props) {
	      _classCallCheck(this, Subscriber);

	      var _this = _possibleConstructorReturn(this, (Subscriber.__proto__ || Object.getPrototypeOf(Subscriber)).call(this, props));

	      _this.forceUpdate = _this.forceUpdate.bind(_this);
	      _this.subscribe = _this.subscribe.bind(_this);
	      _this.unsubscribe = _this.unsubscribe.bind(_this);
	      return _this;
	    }

	    //===============
	    // REACT METHODS
	    //===============

	    _createClass(Subscriber, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        this.getPublishables().forEach(this.subscribe);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.getPublishables().forEach(this.unsubscribe);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(component, this.props);
	      }

	      //=================
	      // PRIVATE METHODS
	      //=================

	    }, {
	      key: 'getPublishables',
	      value: function getPublishables() {
	        var _this2 = this;

	        return Object.keys(this.props).reduce(function (publishables, key) {
	          if (_this2.isPublishable(_this2.props[key])) {
	            publishables.push(_this2.props[key]);
	          }
	          return publishables;
	        }, []);
	      }
	    }, {
	      key: 'isPublishable',
	      value: function isPublishable(prop) {
	        return PUBLISHABLE_FUNCTION_NAMES.every(function (name) {
	          return prop[name] && prop[name] instanceof Function;
	        });
	      }
	    }, {
	      key: 'subscribe',
	      value: function subscribe(publishable) {
	        publishable.subscribe(this.forceUpdate);
	      }
	    }, {
	      key: 'unsubscribe',
	      value: function unsubscribe(publishable) {
	        publishable.unsubscribe(this.forceUpdate);
	      }
	    }]);

	    return Subscriber;
	  }(_react2.default.Component);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Publisher2 = __webpack_require__(6);

	var _Publisher3 = _interopRequireDefault(_Publisher2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = function (_Publisher) {
	  _inherits(Model, _Publisher);

	  function Model(state) {
	    _classCallCheck(this, Model);

	    var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

	    _this.initState(state);
	    _this.createHelpers();
	    return _this;
	  }

	  //================
	  // PUBLIC METHODS
	  //================

	  _createClass(Model, [{
	    key: 'setState',
	    value: function setState(nextState) {
	      var _diffState = this.diffState(nextState);

	      var prev = _diffState.prev;
	      var next = _diffState.next;
	      var diff = _diffState.diff;


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

	    //=================
	    // PRIVATE METHODS
	    //=================

	  }, {
	    key: 'initState',
	    value: function initState(state) {
	      this.state = this.constructor.defaultState ? this.constructor.defaultState() : {};
	      Object.assign(this.state, state);
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
	          return !!this.state[key];
	        };

	        _this2.constructor.prototype[setKey] = _this2[setKey] || function (value) {
	          return this.setState(_defineProperty({}, key, value));
	        };
	      });
	    }
	  }, {
	    key: 'diffState',
	    value: function diffState(nextState) {
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

	exports.default = Model;
	;

/***/ },
/* 6 */
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

	  //================
	  // PUBLIC METHODS
	  //================

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isPlainObject = __webpack_require__(8);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _Model2 = __webpack_require__(5);

	var _Model3 = _interopRequireDefault(_Model2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Store = function (_Model) {
	  _inherits(Store, _Model);

	  function Store(_ref) {
	    var _ref$models = _ref.models;
	    var models = _ref$models === undefined ? [] : _ref$models;
	    var _ref$state = _ref.state;
	    var state = _ref$state === undefined ? {} : _ref$state;

	    _classCallCheck(this, Store);

	    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, state));

	    _this.initModelNamesHash(models);
	    return _this;
	  }

	  //================
	  // PUBLIC METHODS
	  //================

	  _createClass(Store, [{
	    key: 'stringify',
	    value: function stringify() {
	      var models = this.createModelsHash();
	      var state = this.toSerializableState(this.state, models);
	      return JSON.stringify({ state: state, models: models });
	    }
	  }, {
	    key: 'parse',
	    value: function parse(json) {
	      var _JSON$parse = JSON.parse(json);

	      var state = _JSON$parse.state;
	      var models = _JSON$parse.models;

	      var newModels = this.createModelsHash();
	      this.state = this.fromSerializableState(state, models, newModels);
	    }

	    //=================
	    // PRIVATE METHODS
	    //=================

	  }, {
	    key: 'initModelNamesHash',
	    value: function initModelNamesHash(models) {
	      this.modelsHash = models.reduce(function (hash, model) {
	        hash[model.name] = model;
	        return hash;
	      }, {});
	    }
	  }, {
	    key: 'createModelsHash',
	    value: function createModelsHash() {
	      return Object.keys(this.modelsHash).reduce(function (hash, key) {
	        hash[key] = {};
	        return hash;
	      }, {});
	    }
	  }, {
	    key: 'toSerializableState',
	    value: function toSerializableState(state, store) {
	      var _this2 = this;

	      return Object.keys(state).reduce(function (serializableState, key) {
	        serializableState[key] = _this2.toSerializable(state[key], store);
	        return serializableState;
	      }, {});
	    }
	  }, {
	    key: 'fromSerializableState',
	    value: function fromSerializableState(state, models, newModels) {
	      var _this3 = this;

	      return Object.keys(state).reduce(function (finalState, key) {
	        finalState[key] = _this3.fromSerializable(state[key], models, newModels);
	        return finalState;
	      }, {});
	    }
	  }, {
	    key: 'toSerializable',
	    value: function toSerializable(data, store) {
	      var _this4 = this;

	      if (data instanceof _Model3.default) {
	        var _constructor = data.constructor;
	        var state = data.state;


	        if (!store[_constructor.name][state.id]) {
	          store[_constructor.name][state.id] = this.toSerializableState(state, store);
	        }

	        return {
	          _constructor: _constructor.name,
	          id: state.id
	        };
	      }

	      if ((0, _isPlainObject2.default)(data)) {
	        return this.toSerializableState(data, store);
	      }

	      if (data instanceof Array) {
	        return data.map(function (datum) {
	          return _this4.toSerializable(datum, store);
	        });
	      }

	      return data;
	    }
	  }, {
	    key: 'fromSerializable',
	    value: function fromSerializable(data, models, newModels) {
	      var _this5 = this;

	      if ((0, _isPlainObject2.default)(data)) {
	        if (data._constructor) {
	          var name = data._constructor;

	          if (newModels[name][data.id]) {
	            return newModels[name][data.id];
	          }

	          delete data._constructor;
	          var state = this.fromSerializable(models[name][data.id], models, newModels);
	          var newModel = new this.modelsHash[name](state);
	          newModels[name][data.id] = newModel;
	          return newModel;
	        }

	        return this.fromSerializableState(data, models, newModels);
	      }

	      if (data instanceof Array) {
	        return data.map(function (datum) {
	          return _this5.fromSerializable(datum, models, newModels);
	        });
	      }

	      return data;
	    }
	  }]);

	  return Store;
	}(_Model3.default);

	exports.default = Store;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(9),
	    isObjectLike = __webpack_require__(11);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(10);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 10 */
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
/* 11 */
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