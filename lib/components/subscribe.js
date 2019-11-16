"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = subscribe;

var _react = _interopRequireDefault(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PUBLISHABLE_FUNCTION_NAMES = ['subscribe', 'unsubscribe', 'publish'];

function subscribe(Component) {
  //===================
  // WRAPPER COMPONENT
  //===================
  var Subscriber =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Subscriber, _React$Component);

    //=============
    // CONSTRUCTOR
    //=============
    function Subscriber(props) {
      var _this;

      _classCallCheck(this, Subscriber);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Subscriber).call(this, props));
      _this.forceUpdate = _this.forceUpdate.bind(_assertThisInitialized(_this));
      _this._subscribe = _this._subscribe.bind(_assertThisInitialized(_this));
      _this._unsubscribe = _this._unsubscribe.bind(_assertThisInitialized(_this));
      return _this;
    } //===============
    // REACT METHODS
    //===============


    _createClass(Subscriber, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._getPublishables().forEach(this._subscribe);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

        Object.keys(this.props).forEach(function (key) {
          if (_this2.props[key] === prevProps[key]) return;

          if (_this2._isPublishable(_this2.props[key])) {
            _this2._subscribe(_this2.props[key]);
          }

          if (_this2._isPublishable(prevProps[key])) {
            _this2._unsubscribe(prevProps[key]);
          }
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this._getPublishables().forEach(this._unsubscribe);
      }
    }, {
      key: "render",
      value: function render() {
        return _react["default"].createElement(Component, this.props);
      } //==================
      // INTERNAL METHODS
      //==================

    }, {
      key: "_getPublishables",
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
      key: "_isPublishable",
      value: function _isPublishable(prop) {
        return PUBLISHABLE_FUNCTION_NAMES.every(function (name) {
          return prop && prop[name] && prop[name] instanceof Function;
        });
      }
    }, {
      key: "_subscribe",
      value: function _subscribe(publishable) {
        publishable.subscribe(this.forceUpdate);
      }
    }, {
      key: "_unsubscribe",
      value: function _unsubscribe(publishable) {
        publishable.unsubscribe(this.forceUpdate);
      }
    }]);

    return Subscriber;
  }(_react["default"].Component); //==================
  // CLASS PROPERTIES
  //==================


  Subscriber.WrappedComponent = Component;
  Subscriber.displayName = "Subscriber(".concat(Component.displayName || Component.name || 'Component', ")"); //=====================
  // PASS STATIC METHODS
  //=====================

  return (0, _hoistNonReactStatics["default"])(Subscriber, Component);
}

;