"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bus = function () {
	function Bus() {
		_classCallCheck(this, Bus);
	}

	_createClass(Bus, null, [{
		key: "publish",
		value: function publish(event) {
			console.log(event);
			if (Bus.subscriptions[event.name]) {
				console.log(Bus.subscriptions[event.name].length + " subscription(s)");
				Bus.subscriptions[event.name].forEach(function (on) {
					return on(event);
				});
			}
		}
	}, {
		key: "when",
		value: function when(eventName) {
			var _this = this;

			return {
				then: function then(on) {
					return _this.subscribe(eventName, on);
				}
			};
		}
	}, {
		key: "subscribe",
		value: function subscribe(name, on) {
			if (!Bus.subscriptions[name]) Bus.subscriptions[name] = [];
			var newCount = Bus.subscriptions[name].push(on);
			var subscriptionIndex = newCount - 1;
			console.log("Subscription made for " + name);
			return {
				unsubscribe: function unsubscribe() {
					return Bus.subscriptions[name][subscriptionIndex] = undefined;
				}
			};
		}
	}]);

	return Bus;
}();

exports.default = Bus;


Bus.subscriptions = {};