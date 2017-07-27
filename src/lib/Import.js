import packageImport from '@bb-cli/bb-import';
import { packageName, port } from '../config';
import { importStart } from './Notify';

class Import {
	startTime;

	doImport() {
		this.startTime = process.hrtime();
		importStart();
		return packageImport(packageName, {port: port});
	}

	getTime() {
		return this.startTime;
	}
} 

export default Import;