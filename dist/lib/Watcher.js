'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _watch = require('watch');

var _watch2 = _interopRequireDefault(_watch);

var _Verify = require('./Verify');

var _Verify2 = _interopRequireDefault(_Verify);

var _Notify = require('./Notify');

var _Notify2 = _interopRequireDefault(_Notify);

var _helpers = require('./helpers');

var _Package = require('./Package');

var _Package2 = _interopRequireDefault(_Package);

var _Import = require('./Import');

var _Import2 = _interopRequireDefault(_Import);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var monitor = void 0;

var _package = new _Package2.default();
var _import = new _Import2.default();

/**
 * Check requirements and start watcher
 *
 * @return {void}
 */
var Watcher = function Watcher(config) {

	// create global config
	global.Config = config ? Object.assign({}, _config2.default, config) : _config2.default;

	checkRequirements();

	// create watcher
	start();
};

/**
 * Show welcome notification and create watcher
 *
 * @return {void}
 */
var start = function start() {
	_Notify2.default.welcome();

	createWatcher();
};

/**
 * Create options and start watcher monitor
 *
 * @return {void}
 */
var createWatcher = function createWatcher() {
	var options = {
		filter: _helpers.filterExtentions,
		interval: 1, // 1 second
		wait: 2
	};

	// create the actual monitor
	_watch2.default.createMonitor(process.cwd(), options, function (monitor) {
		return watcherCallback(monitor);
	});
};

/**
 * Callback for watcher monitor
 *
 * @return {void}
 */
var watcherCallback = function watcherCallback(_monitor) {
	monitor = _monitor;
	createHandlers();

	// notify that everything is setup.
	_Notify2.default.start();
};

/**
 * Create handlers for monitor
 *
 * @return {void}
 */
var createHandlers = function createHandlers() {
	monitor.on("changed", function (file, curr, prev) {
		_Notify2.default.changed(file);

		runPackageAndImport();
	});
};

/**
 * Run package and import
 *
 * @return {void}
 */
var runPackageAndImport = function runPackageAndImport() {
	_package.createPackage().then(function () {
		return _import.doImport().then(function () {
			return notifySuccess();
		}).catch(function (error) {
			return notifyError(error);
		});
	});
};

/**
 * Notify and log error message
 *
 * @return {void}
 */
var notifyError = function notifyError(error) {
	_Notify2.default.log(error);
	_Notify2.default.notify('ERROR: Importing package failed', 'fail');
};

/**
 * Notify and log success message
 *
 * @return {vois}
 */
var notifySuccess = function notifySuccess() {
	var timing = [_package.getTime(), _import.getTime()];

	_Notify2.default.importEnd.apply(_Notify2.default, timing);
	_Notify2.default.notify('Successfully packaged and imported');
};

/**
 * Check if requirements are met before we start anything
 *
 */
var checkRequirements = function checkRequirements() {
	if (!_Verify2.default.model()) {
		process.exit();
	}

	_Verify2.default.online();
};

exports.default = Watcher;