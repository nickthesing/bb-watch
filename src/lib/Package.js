import packageProject from '@bb-cli/bb-package/dist/project';
import config from '../config';

class Package {
	startTime;

	constructor() {
		this.sourceFolder = ['.'];
		this.options = {
			output: config.packageName,
			excludeDefault: true,
			buildPlugins: 'sass'
		}
	}

	createPackage() {
		this.startTime = process.hrtime();
		return packageProject(this.sourceFolder, this.options);
	}

	getTime() {
		return this.startTime;
	}

}

export default Package;