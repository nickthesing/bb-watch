import chalk from 'chalk';
import printMessage from 'print-message';
import notifier from 'node-notifier';
import path from 'path';
import config from '../config';
import { parseHrtimeToSeconds } from './helpers';

let _log = console.log;



/**
 * Show welcome message in console
 *
 */
const welcome = () => {
	// clear out console 
	process.stdout.write('\x1Bc'); 

	// print message to console
	printMessage(config.welcome, {borderColor: 'gray'});
}

/**
 * Log message to console
 *
 * @type {string}
 */
const log = (what) => {
	_log(what);
}

const offline = () => {
	welcome();
	log(chalk.red('\n Error: portalserver is not running on localhost:7777.. aborting..\n'));
}

const importStart = () => {
	log(chalk.bold.yellow('\n --- Starting Import:'));
}

const importEnd = (packageTime, importTime) => {
	let packageTimeInSeconds = parseHrtimeToSeconds(process.hrtime(packageTime));
	let importTimeInSeconds = parseHrtimeToSeconds(process.hrtime(importTime));

	let msg = `\u00A0[Package: ${packageTimeInSeconds}s & Import: ${importTimeInSeconds}s]`;
	log(chalk.bold.yellow('--- Done Importing') + chalk.bold.black(msg));
}

/**
 * Logs error message in red
 *
 * @type {string} msg
 */
const error = (msg) => {
	msg = '\n--- Backbase Wachter Error: ' + msg;
	_log(chalk.red(msg));
}

const start = () => {
	_log(chalk.bold.green(config.messages.START));
}	

const changed = (fileName) => {
	_log(chalk.bold.yellow(config.messages.RESTART), chalk.bold.black(`[${fileName.split('/').pop()}]`));
}

const notify = (msg, type = 'success') => {
	notifier.notify({
		title: 'Backbase Watch',
		message: msg,
		icon: path.join(__dirname, '../../icons/' + (type === 'success') ? 'fail.png' : 'pass.png')
	});
}

module.exports = {
	welcome,
	offline,
	importStart,
	importEnd,
	notify,
	log,
	start,
	changed,
	error
};