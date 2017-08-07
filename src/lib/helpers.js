/**
 * Parse Hrtime instance to miliseconds
 *
 * @type {object} hrtime	
 * @return {string} seconds	
 */
const parseHrtimeToSeconds = (hrtime) => { 
	return (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
}

/**
 * Return extension from string
 *
 * @param {string} fileName
 * @return {string} extention
 */
const getExtension = (fileName) => {
    var i = fileName.lastIndexOf('.');
    return (i < 0) ? '' : fileName.substr(i);
}

/**
 * Filter out certain extentions
 *
 * @param {string} fileName
 * @return {void}
 */
const filterExtentions = (fileName) => {
	if ( Config.excludeExtentions.indexOf(getExtension(fileName)) == -1 ) return fileName;
}

export {
	filterExtentions,
	parseHrtimeToSeconds
}