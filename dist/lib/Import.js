'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bbImport = require('@bb-cli/bb-import');

var _bbImport2 = _interopRequireDefault(_bbImport);

var _config = require('../config');

var _Notify = require('./Notify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Import = function () {
	function Import() {
		_classCallCheck(this, Import);
	}

	_createClass(Import, [{
		key: 'doImport',
		value: function doImport() {
			this.startTime = process.hrtime();
			(0, _Notify.importStart)();
			return (0, _bbImport2.default)(_config.packageName, { port: _config.port });
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			return this.startTime;
		}
	}]);

	return Import;
}();

exports.default = Import;