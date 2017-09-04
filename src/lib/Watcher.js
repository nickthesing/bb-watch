import watch from 'watch';
import Verify from './Verify';
import Notify from './Notify';
import { filterExtentions } from './helpers';
import Package from './Package';
import Import from './Import';
import defaultConfig from '../config';
import path from 'path';
import fs from 'fs';

let monitor;

let _package = new Package();
let _import = new Import();

/**
 * Check requirements and start watcher
 *
 * @return {void}
 */
const Watcher = (config) => {

	// create global config
	global.Config = ( config ) ?  Object.assign({}, defaultConfig, config) : defaultConfig;

	checkRequirements();

	// create watcher
	start();
}

/**
 * Show welcome notification and create watcher
 *
 * @return {void}
 */
const start = () => {
	Notify.welcome();

	createWatcher();
}

/**
 * Create options and start watcher monitor
 *
 * @return {void}
 */
const createWatcher = () => {
	let options = {
		filter: filterExtentions, 
		interval: 1, // 1 second
		wait: 2
	};

	// create the actual monitor
	watch.createMonitor(
		process.cwd(),
		options,
		(monitor) => watcherCallback(monitor)
	);
}

/**
 * Callback for watcher monitor
 *
 * @return {void}
 */
const watcherCallback = (_monitor) => {
		monitor = _monitor;
		createHandlers();

		// notify that everything is setup.
		Notify.start();
}

/**
 * Create handlers for monitor
 *
 * @return {void}
 */
const createHandlers = () => {
	monitor.on("changed", (file, curr, prev) => {
		Notify.changed(file);

		// make sure we pass a widget directory to the package & import command
    const fileDirectory = path.parse(file).dir;
    const widgetDirectory = traverseUntilModelIsFound(fileDirectory);

		runPackageAndImport(widgetDirectory);
	});
}

/**
 * Traverses a directory all the way up until a directory contains a model.xml file
 *
 * @return {string} path for the directory that contains a model.xml file
 */
const traverseUntilModelIsFound = (dir) => {
  const modelFile =
    fs
      .readdirSync(dir) // can be improved upon by making it async
      .find(file => file === 'model.xml');

  return modelFile ? dir : traverseUntilModelIsFound(path.join(dir, '..'));
}

/**
 * Run package and import
 *
 * @return {void}
 */
const runPackageAndImport = widgetDirectory => {
	_package
		.createPackage(widgetDirectory)
		.then(() => _import.doImport())
		.then(sequence => {
			const errors = sequence
				.filter(element => element.status === false)
				.map(element => element.response);
			if (errors.length > 0) {
				return notifyErrors([...new Set(errors)]);
			} else {
				return notifySuccess();
			}
        })
		.catch(error => notifyErrors([error]));
}

/**
 * Notify and log error message
 *
 * @return {void}
 */
const notifyErrors = (errors) => {
	errors.forEach(error => Notify.importError(error));
	Notify.notify('ERROR: Importing package failed', 'fail');
}

/**
 * Notify and log success message
 *
 * @return {void}
 */
const notifySuccess = () => {
	let timing = [
		_package.getTime(),
		_import.getTime()
	];

	Notify.importEnd(...timing);
	Notify.notify('Successfully packaged and imported');
}

/**
 * Check if requirements are met before we start anything
 *
 */
const checkRequirements = () => {
	if ( ! Verify.model() ) {
		process.exit();
	}

	Verify.online();
}

export default Watcher;