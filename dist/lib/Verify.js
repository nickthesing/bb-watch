'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _tcpPing = require('tcp-ping');

var _tcpPing2 = _interopRequireDefault(_tcpPing);

var _Notify = require('./Notify');

var _Notify2 = _interopRequireDefault(_Notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Verify that there is a model.xml present
 *
 */
var model = function model() {
	if (!_fs2.default.existsSync(process.cwd() + '/model.xml')) {
		_Notify2.default.welcome();
		_Notify2.default.error('model.xml not found. Are you running the watcher from the correct folder? \n');
		return false;
	}
	return true;
};

/**
 * Verify is localhost:7777 is running
 *
 */
var online = function online() {
	_tcpPing2.default.probe('127.0.0.1', 7777, function (err, available) {
		if (!available) {
			_Notify2.default.offline();
			process.exit();
		}
	});
};

module.exports = {
	model: model,
	online: online
};