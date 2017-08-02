import packageImport from '@bb-cli/bb-import';
import { packageName, port } from '../config';
import { importStart } from './Notify';

class Import {
	startTime;

	/**
	 * Import package.zip file to localhost enviroment
	 *
	 * @return {Promise} 
	 */
	doImport() {
		this.startTime = process.hrtime();
		importStart();
		return packageImport(packageName, {port: port});
	}

	/**
	 * Get import startingpage for showing total duration
	 *
	 * @return {array} hrtime
	 */
	getTime() {
		return this.startTime;
	}
}

export default Import;