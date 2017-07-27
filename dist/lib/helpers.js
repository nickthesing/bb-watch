'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseHrtimeToSeconds = exports.filterExtentions = undefined;

var _config = require('../config');

/**
 * Parse Hrtime instance to miliseconds
 *
 * @type {object} hrtime	
 */
var parseHrtimeToSeconds = function parseHrtimeToSeconds(hrtime) {
  return (hrtime[0] + hrtime[1] / 1e9).toFixed(3);
};

/**
 * Return extension from string
 *
 * @param {string} fileName
 * @return {string} extention
 */
var getExtension = function getExtension(fileName) {
  var i = fileName.lastIndexOf('.');
  return i < 0 ? '' : fileName.substr(i);
};

/**
 * Filter out certain extentions
 *
 * @param {string} fileName
 */
var filterExtentions = function filterExtentions(fileName) {
  if (_config.excludeExtentions.indexOf(getExtension(fileName)) == -1) return fileName;
};

exports.filterExtentions = filterExtentions;
exports.parseHrtimeToSeconds = parseHrtimeToSeconds;
exports['default'] = module.exports;
exports.default = module.exports;