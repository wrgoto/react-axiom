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