'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _printMessage = require('print-message');

var _printMessage2 = _interopRequireDefault(_printMessage);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _log = console.log;

/**
 * Show welcome message in console
 *
 */
var welcome = function welcome() {
	// clear out console 
	process.stdout.write('\x1Bc');

	// print message to console
	(0, _printMessage2.default)(_config2.default.welcome, { borderColor: 'gray' });
};

/**
 * Log message to console
 *
 * @type {string}
 */
var log = function log(what) {
	_log(what);
};

var offline = function offline() {
	welcome();
	log(_chalk2.default.red('\n Error: portalserver is not running on localhost:7777.. aborting..\n'));
};

var importStart = function importStart() {
	log(_chalk2.default.bold.yellow('\n --- Starting Import:'));
};

var importEnd = function importEnd(packageTime, importTime) {
	var packageTimeInSeconds = (0, _helpers.parseHrtimeToSeconds)(process.hrtime(packageTime));
	var importTimeInSeconds = (0, _helpers.parseHrtimeToSeconds)(process.hrtime(importTime));

	var msg = '\xA0[Package: ' + packageTimeInSeconds + 's & Import: ' + importTimeInSeconds + 's]';
	log(_chalk2.default.bold.yellow('--- Done Importing') + _chalk2.default.bold.black(msg));
};

/**
 * Logs error message in red
 *
 * @type {string} msg
 */
var error = function error(msg) {
	msg = '\n--- Backbase Wachter Error: ' + msg;
	_log(_chalk2.default.red(msg));
};

var start = function start() {
	_log(_chalk2.default.bold.green(_config2.default.messages.START));
};

var changed = function changed(fileName) {
	_log(_chalk2.default.bold.yellow(_config2.default.messages.RESTART), _chalk2.default.bold.black('[' + fileName.split('/').pop() + ']'));
};

var notify = function notify(msg) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

	_nodeNotifier2.default.notify({
		title: 'Backbase Watch',
		message: msg,
		icon: _path2.default.join(__dirname, '../../icons/' + (type === 'success') ? 'fail.png' : 'pass.png')
	});
};

module.exports = {
	welcome: welcome,
	offline: offline,
	importStart: importStart,
	importEnd: importEnd,
	notify: notify,
	log: log,
	start: start,
	changed: changed,
	error: error
};