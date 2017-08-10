import fs from 'fs';
import path from 'path';
import ping from 'tcp-ping';
import Notify from './Notify';

/**
 * Verify that there is a model.xml present
 *
 * @return {boolean}
 */
const model = () => {
	// only execute model.xml-check if not inside the src or prebuilt directory
	let basename = path.basename(process.cwd());
	if ( basename == 'src' || basename == 'prebuilt' ) {
		return true;
	}

	if ( ! fs.existsSync(process.cwd() + '/model.xml') ) {
		Notify.welcome();
		Notify.error('model.xml not found. Are you running the watcher from the correct folder? \n');
		return false;
	}

	return true;
}

/**
 * Verify is localhost:{Config.port} is running
 *
 * @return {void}
 */
const online = () => {
	ping.probe('127.0.0.1', Config.port, (err, available) => {
		if ( ! available ) { 
			Notify.offline();
			process.exit();
		}
	});
}

module.exports = {
	model,
	online
}