import watch from 'watch';
import Verify from './Verify';
import Notify from './Notify';
import { filterExtentions } from './helpers';
import Package from './Package';
import Import from './Import';

let monitor;

let _package = new Package();
let _import = new Import();

const Watcher = () => {

	checkRequirements();

	// create watcher
	start();
}

const start = () => {
	Notify.welcome();

	createWatcher();
}

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

const watcherCallback = (_monitor) => {
		monitor = _monitor;
		createHandlers();

		// notify that everything is setup.
		Notify.start();
}

const createHandlers = () => {
	monitor.on("changed", (file, curr, prev) => {
		Notify.changed(file);

		runPackageAndImport();
	});
}

const runPackageAndImport = () => {
	_package.createPackage()
		.then(() => _import.doImport()
			.then(() => notifySuccess())
			.catch((error) => notifyError(error)));
}

const notifyError = (error) => {
	Notify.log(error);
	Notify.notify('ERROR: Importing package failed', 'fail');
}

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