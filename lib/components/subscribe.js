'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = subscribe;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

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

  //==================
  // CLASS PROPERTIES
  //==================

  Subscriber.WrappedComponent = Component;
  Subscriber.displayName = 'Subscriber(' + (Component.displayName || Component.name || 'Component') + ')';

  //=====================
  // PASS STATIC METHODS
  //=====================

  return (0, _hoistNonReactStatics2.default)(Subscriber, Component);
};