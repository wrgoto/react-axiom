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
	exports.Publisher = exports.Model = exports.subscribe = exports.provide = exports.connect = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.connect = _connect2.default;
	exports.provide = _provide2.default;
	exports.subscribe = _subscribe2.default;
	exports.Model = _Model2.default;
	exports.Publisher = _Publisher2.default;
	exports.default = {
	  connect: _connect2.default,
	  provide: _provide2.default,
	  subscribe: _subscribe2.default,
	  Model: _Model2.default,
	  Publisher: _Publisher2.default
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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = function (_Publisher) {
	  _inherits(Model, _Publisher);

	  function Model() {
	    _classCallCheck(this, Model);

	    return _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).apply(this, arguments));
	  }

	  _createClass(Model, [{
	    key: 'setState',


	    //================
	    // PUBLIC METHODS
	    //================

	    value: function setState(nextState) {
	      var _this2 = this;

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

	        setTimeout(function () {
	          Object.assign(_this2.state, nextState);
	          _this2.publish();
	        }, 0);
	      }
	    }

	    //=================
	    // PRIVATE METHODS
	    //=================

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

/***/ }
/******/ ])
});
;