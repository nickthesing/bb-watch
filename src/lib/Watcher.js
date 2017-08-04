import watch from 'watch';
import Verify from './Verify';
import Notify from './Notify';
import { filterExtentions } from './helpers';
import Package from './Package';
import Import from './Import';
import defaultConfig from '../config';

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

		runPackageAndImport();
	});
}

/**
 * Run package and import
 *
 * @return {void}
 */
const runPackageAndImport = () => {
	_package.createPackage()
		.then(() => _import.doImport()
			.then(() => notifySuccess())
			.catch((error) => notifyError(error)));
}

/**
 * Notify and log error message
 *
 * @return {void}
 */
const notifyError = (error) => {
	Notify.log(error);
	Notify.notify('ERROR: Importing package failed', 'fail');
}

/**
 * Notify and log success message
 *
 * @return {vois}
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