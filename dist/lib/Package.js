'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _project = require('@bb-cli/bb-package/dist/project');

var _project2 = _interopRequireDefault(_project);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function () {

	/**
  * Constructor to setup options
  *
  * @return {void}
  */
	function Package() {
		_classCallCheck(this, Package);

		this.sourceFolder = ['.'];
		this.options = {
			output: _config2.default.packageName,
			excludeDefault: true,
			buildPlugins: 'sass-fast'
		};
	}

	/**
  * Handles the packageProject function
  *
  * @return {Promise}
  */


	_createClass(Package, [{
		key: 'createPackage',
		value: function createPackage() {
			this.startTime = process.hrtime();
			return (0, _project2.default)(this.sourceFolder, this.options);
		}

		/**
   * Get package startingpage for showing total duration
   *
   * @return {array} hrtime
   */

	}, {
		key: 'getTime',
		value: function getTime() {
			return this.startTime;
		}
	}]);

	return Package;
}();

exports.default = Package;