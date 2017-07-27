import fs from 'fs';
import ping from 'tcp-ping';
import Notify from './Notify';

/**
 * Verify that there is a model.xml present
 *
 * @return {boolean}
 */
const model = () => {
 	if ( ! fs.existsSync(process.cwd() + '/model.xml') ) {
 		Notify.welcome();
		Notify.error('model.xml not found. Are you running the watcher from the correct folder? \n');
		return false;
	}
	return true;
}

/**
 * Verify is localhost:7777 is running
 *
 * @return {void}
 */
const online = () => {
	ping.probe('127.0.0.1', 7777, (err, available) => {
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